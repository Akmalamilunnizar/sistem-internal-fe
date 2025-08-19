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
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
              <p class="text-gray-600 mt-2">Manage staff members and their roles</p>
            </div>
            <button
              @click="showCreateModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <UIcon name="i-heroicons-plus" class="w-5 h-5" />
              Add Staff
            </button>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="mb-6">
          <div class="flex gap-4">
            <div class="flex-1">
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Search staff by name or email..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              v-model="selectedLimit"
              @change="handleLimitChange"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        <!-- Staff Table -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="staff in staffMembers" :key="staff.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <UAvatar 
                          :src="staff.avatar || 'https://avatars.githubusercontent.com/u/739984?v=4'" 
                          alt="Avatar" 
                          size="sm"
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ staff.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ staff.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-purple-100 text-purple-800': staff.role === 'owner',
                      'bg-blue-100 text-blue-800': staff.role === 'customer_service',
                      'bg-green-100 text-green-800': staff.role === 'technician'
                    }">
                      {{ staff.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-green-100 text-green-800': staff.status === 'active',
                      'bg-red-100 text-red-800': staff.status === 'inactive'
                    }">
                      {{ staff.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex gap-2">
                      <button
                        @click="editStaff(staff)"
                        class="text-green-600 hover:text-green-900"
                      >
                        <UIcon name="i-heroicons-pencil" class="w-5 h-5" />
                      </button>
                      <button
                        @click="deleteStaff(staff.id)"
                        class="text-red-600 hover:text-red-900"
                      >
                        <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ (currentPage - 1) * limit + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(currentPage * limit, totalItems) }}</span>
                  of
                  <span class="font-medium">{{ totalItems }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    @click="previousPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage >= totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Overlay -->
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-2 text-gray-600">Loading staff members...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Staff Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold mb-4">
          {{ showEditModal ? 'Edit Staff Member' : 'Add New Staff Member' }}
        </h3>
        
        <form @submit.prevent="showEditModal ? updateStaffData() : createStaffData()">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                v-model="staffForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="staffForm.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                v-model="staffForm.role"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a role</option>
                <option value="customer_service">Customer Service</option>
                <option value="technician">Technician</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            
            <div v-if="showCreateModal">
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                v-model="staffForm.password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {{ showEditModal ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/composables/useAuthStore'
import { userManagementApi } from '@/api/admin/users'

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

// Staff data
const staffMembers = ref<any[]>([])
const isLoading = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const limit = ref(10)
const totalItems = ref(0)
const totalPages = ref(0)

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingStaff = ref<any>(null)

// Staff form
const staffForm = ref({
  name: '',
  email: '',
  role: '',
  password: ''
})

// Computed properties
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const loadStaffMembers = async () => {
  try {
    isLoading.value = true
    const response = await userManagementApi().getAllStaff({
      page: currentPage.value,
      search: searchQuery.value,
      limit: limit.value
    })
    
    staffMembers.value = response.data
    totalItems.value = response.total || 0
    totalPages.value = Math.ceil(totalItems.value / limit.value)
  } catch (error) {
    console.error('Failed to load staff members:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  loadStaffMembers()
}

const handleLimitChange = () => {
  currentPage.value = 1
  loadStaffMembers()
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    loadStaffMembers()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    loadStaffMembers()
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
  loadStaffMembers()
}

const editStaff = (staff: any) => {
  editingStaff.value = staff
  staffForm.value = { 
    name: staff.name,
    email: staff.email,
    role: staff.role,
    password: ''
  }
  showEditModal.value = true
}

const deleteStaff = async (id: number) => {
  if (confirm('Are you sure you want to delete this staff member?')) {
    try {
      await userManagementApi().deleteStaff(id)
      loadStaffMembers()
    } catch (error) {
      console.error('Failed to delete staff member:', error)
    }
  }
}

const createStaffData = async () => {
  try {
    await userManagementApi().createStaff(staffForm.value)
    closeModal()
    loadStaffMembers()
  } catch (error) {
    console.error('Failed to create staff member:', error)
  }
}

const updateStaffData = async () => {
  try {
    const updateData = { ...staffForm.value }
    if (!updateData.password) {
      delete updateData.password
    }
    await userManagementApi().updateStaff(editingStaff.value.id, updateData)
    closeModal()
    loadStaffMembers()
  } catch (error) {
    console.error('Failed to update staff member:', error)
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingStaff.value = null
  staffForm.value = {
    name: '',
    email: '',
    role: '',
    password: ''
  }
}

onMounted(() => {
  loadStaffMembers()
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
