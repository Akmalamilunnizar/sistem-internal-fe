<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav>
      <div class="container">
        <div class="flex">
          <h1>Sistem Internal</h1>
          <div class="nav-links">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/users">Users</NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'Sistem Internal',
  meta: [
    { name: 'description', content: 'Internal system management application' }
  ]
})
</script>

<style>
/* Global styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
