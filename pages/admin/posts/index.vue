<template>
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Posts</h1>
        <NuxtLink 
          to="/admin/posts/new" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Post
        </NuxtLink>
      </div>
  
      <!-- Posts List -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="post in posts" :key="post.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ post.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ post.published ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(post.created_at).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <NuxtLink 
                    :to="`/admin/posts/${post.id}`"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </NuxtLink>
                  <button 
                    @click="deletePost(post.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useSupabase } from '~/composables/useSupabase'
  
  const { supabase } = useSupabase()
  const posts = ref([])
  
  // Fetch posts
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
  
    if (error) {
      console.error('Error fetching posts:', error)
      return
    }
  
    posts.value = data
  }
  
  // Delete post
  async function deletePost(id) {
    if (!confirm('Are you sure you want to delete this post?')) return
  
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
  
    if (error) {
      console.error('Error deleting post:', error)
      return
    }
  
    await fetchPosts()
  }
  
  onMounted(() => {
    fetchPosts()
  })
  
  definePageMeta({
    layout: 'admin'
  })
  </script>