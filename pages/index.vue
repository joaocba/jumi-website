<template>
  <div>
    <section class="relative h-96 bg-gray-900 text-white">
      <!-- Hero Section -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <!-- You can add a background image here -->
      </div>
      <div class="relative container mx-auto px-4 h-full flex items-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            JUMI - Jovens Unidos por Manique do Intendente
          </h1>
          <p class="text-xl mb-8">
            Unidos pela juventude, cultura e comunidade
          </p>
          <NuxtLink
            to="/about"
            class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Conhecer mais
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">Últimas Notícias</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="post in latestPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
            <img v-if="post.image_url" :src="post.image_url" :alt="post.title" class="w-full h-48 object-cover"/>
            <div class="p-6">
              <h3 class="font-bold mb-2">{{ post.title }}</h3>
              <p class="text-gray-600 mb-4">{{ getExcerpt(post.content) }}</p>
              <NuxtLink :to="`/news/${post.slug}`" class="text-blue-600 hover:text-blue-800">
                Ler mais →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Preview -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">Nossas Atividades</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Add your activities previews here -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold mb-4">Eventos Culturais</h3>
            <p class="text-gray-600">Descubra os nossos eventos culturais e participe na vida da comunidade.</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold mb-4">Workshops</h3>
            <p class="text-gray-600">Aprenda e desenvolva novas competências com os nossos workshops.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSupabase } from '~/composables/useSupabase'

const { supabase } = useSupabase()
const latestPosts = ref([])

function getExcerpt(content) {
  if (!content) return ''
  const text = content.replace(/<[^>]*>/g, '')
  return text.length > 100 ? text.slice(0, 100) + '...' : text
}

async function fetchLatestPosts() {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  latestPosts.value = data || []
}

onMounted(() => {
  fetchLatestPosts()
})
</script>