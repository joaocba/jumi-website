<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">News & Updates</h1>

    <!-- Posts Grid -->
    <div class="grid gap-8">
      <article v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Featured Image -->
          <div v-if="post.image_url" class="md:w-1/3">
            <img 
              :src="post.image_url" 
              :alt="post.title"
              class="h-48 w-full object-cover"
            />
          </div>
          
          <!-- Content -->
          <div class="p-6 md:w-2/3">
            <h2 class="text-xl font-bold mb-2">
              <NuxtLink 
                :to="`/news/${post.slug}`"
                class="hover:text-blue-600"
              >
                {{ post.title }}
              </NuxtLink>
            </h2>
            <div class="text-gray-600 mb-4">
              {{ new Date(post.created_at).toLocaleDateString() }}
            </div>
            <div class="prose max-w-none" v-html="getExcerpt(post.content)"></div>
            <NuxtLink 
              :to="`/news/${post.slug}`"
              class="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
              Read more →
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="currentPage = page"
        class="px-4 py-2 rounded"
        :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSupabase } from '~/composables/useSupabase'

const { supabase } = useSupabase()
const posts = ref([])
const currentPage = ref(1)
const postsPerPage = 10
const totalPages = ref(1)

// Get excerpt from content
function getExcerpt(content) {
  if (!content) return ''
  // Remove HTML tags and get first 200 characters
  const text = content.replace(/<[^>]*>/g, '')
  return text.length > 200 ? text.slice(0, 200) + '...' : text
}

// Fetch posts
async function fetchPosts() {
  const from = (currentPage.value - 1) * postsPerPage
  const to = from + postsPerPage - 1

  // Get total count
  const { count } = await supabase
    .from('posts')
    .select('id', { count: 'exact' })
    .eq('published', true)

  totalPages.value = Math.ceil(count / postsPerPage)

  // Get posts for current page
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching posts:', error)
    return
  }

  posts.value = data
}

// Watch for page changes
watch(currentPage, () => {
  fetchPosts()
})

onMounted(() => {
  fetchPosts()
})
</script>