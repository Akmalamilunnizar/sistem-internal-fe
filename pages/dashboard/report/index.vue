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
          <h1 class="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p class="text-gray-600 mt-2">Trouble ticket analysis and insights</p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <UIcon name="i-heroicons-ticket" class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Tickets</p>
                <p class="text-2xl font-bold text-gray-900">{{ summary.totalTickets }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Resolved</p>
                <p class="text-2xl font-bold text-gray-900">{{ summary.resolvedTickets }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <UIcon name="i-heroicons-clock" class="w-6 h-6 text-yellow-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">In Progress</p>
                <p class="text-2xl font-bold text-gray-900">{{ summary.inProgressTickets }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Open</p>
                <p class="text-2xl font-bold text-gray-900">{{ summary.openTickets }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid gap-6 md:grid-cols-2 mb-8">
          <!-- Trouble Type Chart -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-lg font-semibold mb-4">Trouble Types Distribution</h3>
            <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Pie chart will be displayed here</p>
            </div>
            <div class="mt-4 space-y-2">
              <div v-for="type in troubleTypes" :key="type.name" class="flex justify-between items-center">
                <span class="text-sm text-gray-600">{{ type.name }}</span>
                <span class="text-sm font-medium text-gray-900">{{ type.count }} ({{ type.percentage }}%)</span>
              </div>
            </div>
          </div>

          <!-- Geographic Heatmap -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-lg font-semibold mb-4">Geographic Trouble Distribution</h3>
            <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Heatmap will be displayed here</p>
            </div>
            <div class="mt-4">
              <p class="text-sm text-gray-600">Most affected area: <span class="font-medium">{{ mostAffectedArea }}</span></p>
            </div>
          </div>
        </div>

        <!-- All Tickets Table -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">All Trouble Tickets</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ ticket.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ticket.customer?.name || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ ticket.type }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-green-100 text-green-800': ticket.status === 'resolved',
                      'bg-yellow-100 text-yellow-800': ticket.status === 'in_progress',
                      'bg-red-100 text-red-800': ticket.status === 'open'
                    }">
                      {{ ticket.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ ticket.customer?.gps_lat }}, {{ ticket.customer?.gps_long }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDateToYMD(ticket.created_at) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Loading Overlay -->
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-2 text-gray-600">Loading reports...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/composables/useAuthStore'
import { reportsAdminApi } from '@/api/admin/reports'
import { formatDateToYMD } from '@/helper/date'

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
    label: 'Area',
    icon: 'i-heroicons-map',
    link: '/dashboard/area',
  },
  {
    label: 'Report',
    icon: 'i-heroicons-book-open-solid',
    link: '/dashboard/report',
  },
  {
    label: 'Internet Package',
    icon: 'i-heroicons-wifi-16-solid',
    link: '/dashboard/internet-package',
  },
  {
    label: 'Assets',
    icon: 'i-heroicons-arrow-down-on-square-stack',
    link: '/dashboard/asset',
  },
  {
    label: 'Company',
    icon: 'i-heroicons-building-office-16-solid',
    link: '/dashboard/companies',
  },
  {
    label: 'Invoice',
    icon: 'i-heroicons-document-currency-dollar-16-solid',
    link: '/dashboard/invoice',
  },
  {
    label: 'Transaction',
    icon: 'i-heroicons-document-currency-dollar-16-solid',
    link: '/dashboard/transaction',
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
  if (!authStore.roleName) return items
  if (authStore.roleName === 'owner') {
    const hideMenu = ['']
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

// Reports data
const tickets = ref<any[]>([])
const troubleTypes = ref<any[]>([])
const summary = ref({
  totalTickets: 0,
  resolvedTickets: 0,
  inProgressTickets: 0,
  openTickets: 0
})
const mostAffectedArea = ref('')
const isLoading = ref(false)

// Methods
const loadReportsData = async () => {
  try {
    isLoading.value = true
    
    const [ticketsResponse, troubleTypesResponse, summaryResponse, geographicResponse] = await Promise.all([
      reportsAdminApi().getAllTickets(),
      reportsAdminApi().getTroubleTypeStats(),
      reportsAdminApi().getTroubleSummary(),
      reportsAdminApi().getGeographicTroubleData()
    ])
    
    tickets.value = ticketsResponse.data || []
    troubleTypes.value = troubleTypesResponse.data || []
    summary.value = summaryResponse.data || {
      totalTickets: 0,
      resolvedTickets: 0,
      inProgressTickets: 0,
      openTickets: 0
    }
    mostAffectedArea.value = geographicResponse.data?.mostAffectedArea || 'N/A'
  } catch (error) {
    console.error('Failed to load reports data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadReportsData()
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
