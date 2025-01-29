<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Top Navigation -->
      <nav class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between items-center">
            <div class="font-bold text-xl">JUMI Admin</div>
            <div class="flex items-center gap-4">
              <button @click="authStore.logout()" class="text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <div class="flex">
        <!-- Sidebar -->
        <aside class="w-64 min-h-screen bg-white shadow">
          <nav class="p-4 space-y-2">
            <NuxtLink 
              to="/admin" 
              class="block px-4 py-2 rounded-md hover:bg-gray-100"
              :class="{ 'bg-gray-100': route.path === '/admin' }"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink 
              to="/admin/posts" 
              class="block px-4 py-2 rounded-md hover:bg-gray-100"
              :class="{ 'bg-gray-100': route.path.includes('/admin/posts') }"
            >
              Posts
            </NuxtLink>
            <NuxtLink 
              to="/admin/media" 
              class="block px-4 py-2 rounded-md hover:bg-gray-100"
              :class="{ 'bg-gray-100': route.path.includes('/admin/media') }"
            >
              Media
            </NuxtLink>
          </nav>
        </aside>
  
        <!-- Main Content -->
        <main class="flex-1 p-8">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '~/stores/auth'
  
  const authStore = useAuthStore()
  const route = useRoute()
  
  definePageMeta({
    middleware: ['auth']
  })
  </script>