<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="card">
      <div class="card-body">
        <h2>Welcome to Sistem Internal</h2>
        <p>
          This is an internal system management application built with Nuxt.js and Go.
        </p>
        <div class="flex space-x-4">
          <NuxtLink to="/users" class="btn btn-primary">
            View Users
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
              <dt>API Version</dt>
              <dd>v1.0.0</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'Home - Sistem Internal'
})

// Reactive data
const apiStatus = ref('checking')
const userCount = ref(0)
const systemStatus = ref('Online')

// Get runtime config
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Check API status
const checkApiStatus = async () => {
  try {
    const response = await $fetch('http://localhost:8080/api/health')
    apiStatus.value = 'connected'
    systemStatus.value = 'Online'
  } catch (error) {
    apiStatus.value = 'disconnected'
    systemStatus.value = 'Offline'
    console.error('API connection failed:', error)
  }
}

// Load initial data
onMounted(async () => {
  await checkApiStatus()
  
  // Try to fetch user count
  try {
    const response = await $fetch('http://localhost:8080/api/users')
    userCount.value = response.users?.length || 0
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
})
</script>
