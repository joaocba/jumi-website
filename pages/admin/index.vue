<template>
    <div>
      <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Posts Overview Card -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-2">Posts</h2>
          <div class="flex justify-between items-center">
            <span class="text-3xl font-bold">{{ postsCount }}</span>
            <NuxtLink 
              to="/admin/posts" 
              class="text-blue-600 hover:text-blue-800"
            >
              Manage Posts
            </NuxtLink>
          </div>
        </div>
  
        <!-- Media Overview Card -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-2">Media Files</h2>
          <div class="flex justify-between items-center">
            <span class="text-3xl font-bold">{{ mediaCount }}</span>
            <NuxtLink 
              to="/admin/media" 
              class="text-blue-600 hover:text-blue-800"
            >
              Manage Media
            </NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- Recent Posts -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Recent Posts</h2>
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div v-if="recentPosts.length" class="divide-y">
            <div v-for="post in recentPosts" :key="post.id" class="p-4">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-medium">{{ post.title }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ new Date(post.created_at).toLocaleDateString() }}
                  </p>
                </div>
                <NuxtLink 
                  :to="`/admin/posts/${post.id}`"
                  class="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="p-4 text-center text-gray-500">
            No posts yet
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useSupabase } from '~/composables/useSupabase'
  
  const { supabase } = useSupabase()
  
  const postsCount = ref(0)
  const mediaCount = ref(0)
  const recentPosts = ref([])
  
  // Fetch dashboard data
  async function fetchDashboardData() {
    try {
      // Get posts count
      const { count: posts } = await supabase
        .from('posts')
        .select('id', { count: 'exact' })
      
      postsCount.value = posts || 0
  
      // Get recent posts
      const { data: recent } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
      recentPosts.value = recent || []
  
      // Get media count (we'll implement this later)
      mediaCount.value = 0
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }
  
  // Fetch data when component mounts
  onMounted(() => {
    fetchDashboardData()
  })
  
  definePageMeta({
    layout: 'admin'
  })
  </script>