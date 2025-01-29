<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="loading" class="text-center py-8">
      <div class="mt-2 animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-8 text-red-600">
      Error: {{ error }}
    </div>

    <article v-else-if="post" class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Featured Image -->
      <img 
        v-if="post.image_url" 
        :src="post.image_url" 
        :alt="post.title"
        class="w-full h-64 object-cover"
      />
      
      <!-- Content -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
        <div class="text-gray-600 mb-8">
          {{ new Date(post.created_at).toLocaleDateString() }}
        </div>
        <!-- Use prose class for better content styling -->
        <div 
          class="prose prose-lg max-w-none"
          v-html="post.content"
        ></div>
      </div>
    </article>

    <div v-else class="text-center py-8">
      Post not found
    </div>

    <!-- Back button -->
    <NuxtLink 
      to="/news"
      class="inline-block mt-8 text-blue-600 hover:text-blue-800"
    >
      ← Back to News
    </NuxtLink>
  </div>
</template>

<script setup>
import { useSupabase } from '~/composables/useSupabase'

const route = useRoute()
const { supabase } = useSupabase()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

async function fetchPost() {
  try {
    loading.value = true
    error.value = null
    
    console.log('Fetching post with slug:', route.params.slug)
    
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', route.params.slug)
      .single()
    
    console.log('Supabase response:', { data, error: supabaseError })

    if (supabaseError) {
      throw supabaseError
    }

    if (!data) {
      throw new Error('Post not found')
    }

    post.value = data
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = err.message || 'Error loading post'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost()
})

function getExcerpt(content) {
  if (!content) return ''
  // Remove HTML tags and get first 200 characters
  const text = content.replace(/<[^>]*>/g, '')
  return text.length > 200 ? text.slice(0, 200) + '...' : text
}

  // Add meta tags
useHead(() => ({
  title: post.value?.title ? `${post.value.title} - JUMI News` : 'JUMI News',
  meta: [
    {
      name: 'description',
      content: post.value ? getExcerpt(post.value.content) : 'JUMI News and Updates'
    }
  ]
}))
  </script>

<style>
/* Add some basic styling for the content */
.prose {
  color: #374151;
}

.prose p {
  margin-bottom: 1.25em;
}

.prose strong {
  font-weight: 600;
  color: #111827;
}

.prose h2 {
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  color: #111827;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.625em;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>