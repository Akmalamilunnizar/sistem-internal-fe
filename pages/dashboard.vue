<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
  roles: ['owner', 'customer_service', 'noc', 'technician']
})

useHead({ title: 'Dashboard - Sistem Internal' })

const auth = useAuthStore()

const apiStatus = ref<'checking' | 'connected' | 'disconnected'>('checking')
const userCount = ref(0)
const systemStatus = ref('Online')

const checkApiStatus = async () => {
  try {
    await $fetch('http://localhost:8080/api/health')
    apiStatus.value = 'connected'
    systemStatus.value = 'Online'
  } catch (error) {
    apiStatus.value = 'disconnected'
    systemStatus.value = 'Offline'
  }
}

onMounted(async () => {
  await checkApiStatus()
  try {
    const response = await $fetch('http://localhost:8080/api/users')
    userCount.value = response.users?.length || 0
  } catch {}
})

const logout = () => {
  auth.logout()
  navigateTo('/login')
}
</script>


<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
              <p class="text-gray-600">Welcome back, {{ user?.name || 'Employee' }}</p>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="logout"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="space-y-6">
          <!-- Welcome Section -->
          <div class="card">
            <div class="card-body">
              <h2>Welcome to Sistem Internal</h2>
              <p>
                This is the employee dashboard for internal system management.
              </p>
              <div class="flex space-x-4 mt-4">
                <NuxtLink to="/users" class="btn btn-primary">
                  Manage Users
                </NuxtLink>
                <NuxtLink to="/about" class="btn btn-secondary">
                  Learn More
                </NuxtLink>
              </div>
            </div>
          </div>
  
          <!-- API Status -->
          <div class="card">
            <div class="card-body">
              <h3>API Status</h3>
              <div class="flex items-center">
                <div
                  :class="[
                    'status-indicator',
                    apiStatus === 'connected' ? 'status-connected' : 'status-disconnected'
                  ]"
                ></div>
                <span>
                  {{ apiStatus === 'connected' ? 'Backend API Connected' : 'Backend API Disconnected' }}
                </span>
              </div>
              <button
                @click="checkApiStatus"
                class="btn btn-secondary mt-3"
              >
                Check Status
              </button>
            </div>
          </div>
  
          <!-- Quick Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="card">
              <div class="stats-card">
                <div class="stats-icon blue">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <div class="stats-content">
                  <dl>
                    <dt>Total Users</dt>
                    <dd>{{ userCount }}</dd>
                  </dl>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="stats-card">
                <div class="stats-icon green">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="stats-content">
                  <dl>
                    <dt>System Status</dt>
                    <dd>{{ systemStatus }}</dd>
                  </dl>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="stats-card">
                <div class="stats-icon purple">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div class="stats-content">
                  <dl>
                    <dt>User Role</dt>
                    <dd>{{ role }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  