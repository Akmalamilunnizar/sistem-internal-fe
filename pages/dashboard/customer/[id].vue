<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <button @click="router.back()" class="text-gray-600 hover:text-gray-900">
            <UIcon name="i-heroicons-arrow-left" class="w-6 h-6" />
          </button>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Customer Details</h1>
            <p class="text-gray-600 mt-2">View customer information and ticket history</p>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="customer" class="space-y-8">
        <!-- Customer Information -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p class="text-lg text-gray-900">{{ customer.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p class="text-lg text-gray-900">{{ customer.phone_number }}</p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <p class="text-lg text-gray-900">{{ customer.address }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">GPS Coordinates</label>
              <p class="text-lg text-gray-900">{{ customer.gps_lat }}, {{ customer.gps_long }}</p>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Location</h2>
          <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">Map will be displayed here</p>
          </div>
        </div>

        <!-- Trouble Tickets -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Trouble Ticket History</h2>
          <div v-if="tickets.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">#{{ ticket.id }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ ticket.type }}</td>
                  <td class="px-6 py-4">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-green-100 text-green-800': ticket.status === 'resolved',
                      'bg-yellow-100 text-yellow-800': ticket.status === 'in_progress',
                      'bg-red-100 text-red-800': ticket.status === 'open'
                    }">
                      {{ ticket.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ formatDateToYMD(ticket.created_at) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            No trouble tickets found for this customer
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8 text-gray-500">
        Customer not found
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { customerAdminApi } from '@/api/admin/customer'
import { formatDateToYMD } from '@/helper/date'

const router = useRouter()
const route = useRoute()

const customer = ref<any>(null)
const tickets = ref<any[]>([])
const isLoading = ref(false)

const loadCustomerData = async () => {
  try {
    isLoading.value = true
    const customerId = parseInt(route.params.id as string)
    
    const [customerResponse, ticketsResponse] = await Promise.all([
      customerAdminApi().getCustomerById(customerId),
      customerAdminApi().getCustomerTickets(customerId)
    ])
    
    customer.value = customerResponse.data
    tickets.value = ticketsResponse.data || []
  } catch (error) {
    console.error('Failed to load customer data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCustomerData()
})
</script>
