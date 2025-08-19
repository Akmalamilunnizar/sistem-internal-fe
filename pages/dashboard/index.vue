<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/composables/useAuthStore'
import { dashboardAdminApi } from "@/api/admin/dashboard";
import { invoiceAdminApi } from "@/api/admin/invoice";
import { transactionAdminApi } from "@/api/admin/transaction";
import { formatIDR } from "@/helper/currency";
import { formatDateToYMD } from "@/helper/date";

// Sidebar functionality
const router = useRouter()
const showSidebar = ref(true)
const showMobileMenu = ref(false)
const authStore = useAuthStore()

// Type definitions
interface MenuItem {
  label: string
  icon: string
  link: string
}

interface ProfileDropdownItem {
  label: string
  click: () => Promise<void> | void
}

// Menu items
const items: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    link: '/dashboard',
  },
  {
    label: 'Customer',
    icon: 'i-heroicons-user-circle-16-solid',
    link: '/dashboard/customer',
  },
  {
    label: 'Report',
    icon: 'i-heroicons-book-open-solid',
    link: '/dashboard/report',
  },
  {
    label: 'User Management',
    icon: 'i-heroicons-user-circle-16-solid',
    link: '/dashboard/user-management',
  },
]

// Profile dropdown
const ProfileDropdown: ProfileDropdownItem[][] = [
  [
    {
      label: 'Logout',
      click: async () => {
        try {
          await authStore.logout()
          router.push('/login')
        } catch (error) {
          console.error('Logout failed:', error)
        }
      },
    },
  ],
]

// Computed menu based on user role
const filterMenu = computed(() => {
  if (!authStore.roleName) return items // Fallback if user is not defined
  if (authStore.roleName === 'owner') {
    const hideMenu = [''] // No items hidden for owner
    return items.filter(item => !hideMenu.includes(item.label))
  }
  if (authStore.roleName === 'technician') {
    const hideMenu = ['User Management', 'Report', 'Invoice', 'Transaction', 'Company', 'Area']
    return items.filter(item => !hideMenu.includes(item.label))
  }
  if (authStore.roleName === 'customer_service') {
    const hideMenu = ['User Management','Company', 'Assets', 'Internet Package', 'Area']
    return items.filter(item => !hideMenu.includes(item.label))
  }
  return items
})

// Sidebar methods
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const navigateTo = (link: string) => {
  router.push(link)
}

// Dashboard data
let invoices = ref<any[]>([]);
const latestDeposites = ref<any[]>([]);
const latestExpenses = ref<any[]>([]);
let totalIncome = ref<any>(0);
let totalExpenses = ref<any>(0);
let totalNetWorth = ref<any>(0);
let totalSales = ref<any>(0);
const isLoading = ref(false)

async function getData() {
  try {
    // Load invoices
    const invoiceResponse = await invoiceAdminApi().getAllInvoices();
    invoiceResponse.data.forEach((customer: any) => {
      customer.number = invoiceResponse.data.indexOf(customer) + 1;
    });
    invoices.value = [...invoiceResponse.data];

    // Load transactions
    const transactionResponse = await transactionAdminApi().getAllTransactions(null);
    
    latestDeposites.value = transactionResponse.data
      .filter((item: any) => item.type_in_out == "debit")
      .map((transaction: any, index: number) => {
        return {
          number: index + 1,
          type_cash: transaction.type_cash.split("_")[0] + " " + (transaction.type_cash.split("_")[1] ? transaction.type_cash.split("_")[1] : ""),
          amount: transaction.amount,
          description: transaction.description
        }
      })
      .slice((1 - 1) * 5, (1) * 5);

    latestExpenses.value = transactionResponse.data
      .filter((item: any) => item.type_in_out == "credit")
      .map((transaction: any, index: number) => {
        return {
          number: index + 1,
          type_cash: transaction.type_cash.split("_")[0] + " " + (transaction.type_cash.split("_")[1] ? transaction.type_cash.split("_")[1] : ""),
          amount: transaction.amount,
          description: transaction.description
        }
      })
      .slice((1 - 1) * 5, (1) * 5);

    // Load dashboard statistics
    const [incomeResponse, expensesResponse, netWorthResponse, salesResponse] = await Promise.all([
      dashboardAdminApi().totalIncomeDashboard(),
      dashboardAdminApi().totalExpensesDashboard(),
      dashboardAdminApi().totalNetWorthDashboard(),
      dashboardAdminApi().totalSalesDashboard()
    ]);

    totalIncome.value = incomeResponse.data.total_income;
    totalExpenses.value = expensesResponse.data.total_expenses;
    totalNetWorth.value = netWorthResponse.data.total_net_worth;
    totalSales.value = salesResponse.data.total_sales;

  } catch (err: any) {
    console.error(err.message || "Failed to load data");
  }
}

onMounted(async () => {
  isLoading.value = true;
  await getData();
  isLoading.value = false;
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <div class="sticky top-0 z-20 flex justify-between items-center w-full h-16 px-4 md:px-6 bg-white border-b shadow-sm">
      <div class="flex items-center gap-4">
        <!-- Mobile menu toggle button -->
        <button 
          class="md:hidden p-2 focus:outline-none"
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
        >
          <UIcon 
            :name="showMobileMenu ? 'i-line-md-close' : 'i-line-md-menu'" 
            class="w-6 h-8"
          />
        </button>
        <p class="text-lg md:text-xl font-bold">
          Lilly <span class="text-red-500">ISP</span>
        </p>
      </div>
      <!-- Profile dropdown for desktop -->
      <div class="hidden md:block">
        <UDropdown 
          :items="ProfileDropdown" 
          mode="hover" 
          :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar 
            src="https://avatars.githubusercontent.com/u/739984?v=4" 
            alt="Avatar" 
            chip-color="blue" 
            chip-text=""
            chip-position="top-right"
            size="md"
          />
        </UDropdown>
      </div>
      <!-- Profile avatar for mobile -->
      <div class="md:hidden">
        <UAvatar 
          src="https://avatars.githubusercontent.com/u/739984?v=4" 
          alt="Avatar" 
          size="sm"
          @click="toggleMobileMenu"
        />
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Mobile Menu -->
      <div 
        v-if="showMobileMenu"
        class="md:hidden fixed inset-0 bg-black/30 z-10 transition-opacity duration-300"
        @click="toggleMobileMenu"
      >
        <div 
          class="w-64 bg-white h-full p-4 overflow-auto transform transition-transform duration-300"
          :class="[showMobileMenu ? 'translate-x-0' : '-translate-x-full']"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">
              Lilly <span class="text-red-500">ISP</span>
            </p>
            <button 
              class="p-2"
              @click="toggleMobileMenu"
              aria-label="Close mobile menu"
            >
              <UIcon name="i-line-md-close" class="w-6 h-6" />
            </button>
          </div>
          <ul class="space-y-2">
            <li 
              v-for="(item, index) in filterMenu" 
              :key="index"
              class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100"
              @click="navigateTo(item.link); toggleMobileMenu()"
            >
              <UIcon :name="item.icon" class="w-6 h-6" />
              <span class="font-medium">{{ item.label }}</span>
            </li>
            <!-- Profile dropdown items in mobile menu -->
            <li 
              v-for="(item, index) in ProfileDropdown[0]" 
              :key="'profile-' + index"
              class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100"
              @click="item.click(); toggleMobileMenu()"
            >
              <UIcon name="i-line-md-account" class="w-6 h-6" />
              <span class="font-medium">{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Desktop Sidebar -->
      <div 
        class="hidden md:flex md:flex-col border-r transition-all duration-300 bg-white"
        :class="[
          showSidebar ? 'w-16' : 'w-64',
        ]"
      >
        <!-- Sidebar toggle button -->
        <div 
          class="flex justify-center p-4 border-b cursor-pointer hover:bg-gray-100"
          @click="toggleSidebar"
          role="button"
          aria-label="Toggle sidebar"
        >
          <UIcon 
            :name="showSidebar ? 'i-line-md-arrow-open-right' : 'i-line-md-arrow-close-left'" 
            class="w-5 h-5"
          />
        </div>
        <div class="flex-1 p-2 overflow-auto no-scrollbar">
          <ul class="space-y-2">
            <li 
              v-for="(item, index) in filterMenu" 
              :key="index"
              class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100"
              :class="[showSidebar ? 'justify-center' : '']"
              @click="navigateTo(item.link)"
            >
              <UIcon :name="item.icon" class="w-6 h-6" />
              <span v-if="!showSidebar" class="font-medium">{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-auto bg-gray-50">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-gray-600 mt-2">Welcome to your admin dashboard</p>
        </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="w-full p-6 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Total Income</h1>
          <span class="text-lg font-semibold">$</span>
        </div>
        <div class="text-center">
          <h1 class="text-3xl font-bold">{{ formatIDR(totalIncome) }}</h1>
        </div>
      </div>

      <div class="w-full p-6 bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Total Expenses</h1>
          <span class="text-lg font-semibold">$</span>
        </div>
        <div class="text-center">
          <h1 class="text-3xl font-bold">{{ formatIDR(totalExpenses) }}</h1>
        </div>
      </div>

      <div class="w-full p-6 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Net Worth</h1>
          <span class="text-lg font-semibold">$</span>
        </div>
        <div class="text-center">
          <h1 class="text-3xl font-bold">{{ formatIDR(totalNetWorth) }}</h1>
        </div>
      </div>

      <div class="w-full p-6 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white rounded-2xl shadow-xl transition-transform hover:scale-[1.03] duration-300">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-base font-medium uppercase tracking-wider opacity-90">Sales</h1>
          <span class="text-lg font-semibold">📈</span>
        </div>
        <div class="text-center">
          <h1 class="text-3xl font-bold">{{ totalSales }}</h1>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid gap-6 md:grid-cols-2 sm:grid-cols-1 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Customer Chart</h3>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Packet Popular Chart</h3>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Area Chart</h3>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Report Cash Chart</h3>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
    </div>

    <!-- Transactions Tables -->
    <div class="grid gap-6 md:grid-cols-2 sm:grid-cols-1 mb-8">
      <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-lg">
        <h1 class="text-xl font-semibold text-slate-800 mb-4">Latest Deposits</h1>
        <div v-if="latestDeposites.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in latestDeposites" :key="item.number">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.number }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.type_cash }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{{ formatIDR(item.amount) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          No deposit data available
        </div>
      </div>
      
      <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-lg">
        <h1 class="text-xl font-semibold text-slate-800 mb-4">Latest Expenses</h1>
        <div v-if="latestExpenses.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in latestExpenses" :key="item.number">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.number }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.type_cash }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{{ formatIDR(item.amount) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          No expense data available
        </div>
      </div>
    </div>

    <!-- Recent Invoices Table -->
    <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-lg">
      <h1 class="text-xl font-semibold text-slate-800 mb-4">Recent Invoices</h1>
      <div v-if="invoices.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in invoices" :key="invoice.number">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ invoice.number }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ invoice.customer?.name || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ formatDateToYMD(invoice.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ formatIDR(invoice.amount) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 rounded-full text-xs font-medium': true,
                  'bg-green-100 text-green-800': invoice.status === 'paid',
                  'bg-yellow-100 text-yellow-800': invoice.status === 'pending',
                  'bg-red-100 text-red-800': invoice.status === 'cancelled'
                }">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ invoice.customer?.product?.name || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        No invoice data available
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-2 text-gray-600">Loading dashboard data...</p>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
