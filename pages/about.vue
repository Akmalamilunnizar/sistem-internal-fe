<template>
  <div class="space-y-6">
    <!-- About Section -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">About Sistem Internal</h2>
        <p class="text-gray-600 mb-4">
          Sistem Internal is a modern web application built with cutting-edge technologies to provide
          efficient internal system management capabilities.
        </p>
        <p class="text-gray-600">
          This application demonstrates the integration of a Vue.js frontend with a Go backend,
          showcasing best practices in modern web development.
        </p>
      </div>
    </div>

    <!-- Technology Stack -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Technology Stack</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Frontend -->
          <div>
            <h4 class="text-md font-medium text-gray-900 mb-3">Frontend</h4>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Nuxt.js 4.0</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Vue.js 3</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span class="text-sm text-gray-600">TypeScript</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Tailwind CSS</span>
              </div>
            </div>
          </div>

          <!-- Backend -->
          <div>
            <h4 class="text-md font-medium text-gray-900 mb-3">Backend</h4>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Go 1.21+</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <span class="text-sm text-gray-600">Gin Framework</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span class="text-sm text-gray-600">RESTful API</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span class="text-sm text-gray-600">CORS Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900">User Management</h4>
              <p class="text-sm text-gray-500">View and manage system users</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900">Real-time Status</h4>
              <p class="text-sm text-gray-500">Monitor API and system status</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900">Responsive Design</h4>
              <p class="text-sm text-gray-500">Works on all device sizes</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900">Modern UI</h4>
              <p class="text-sm text-gray-500">Clean and intuitive interface</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Development Info -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Development</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Getting Started</h4>
          <div class="space-y-2 text-sm text-gray-600">
            <p><strong>Frontend:</strong> <code class="bg-gray-200 px-1 rounded">cd frontend && npm run dev</code></p>
            <p><strong>Backend:</strong> <code class="bg-gray-200 px-1 rounded">cd backend && go run main.go</code></p>
            <p><strong>Frontend URL:</strong> <code class="bg-gray-200 px-1 rounded">http://localhost:3000</code></p>
            <p><strong>Backend URL:</strong> <code class="bg-gray-200 px-1 rounded">http://localhost:8080</code></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
useHead({
  title: 'About - Sistem Internal'
})
</script>
