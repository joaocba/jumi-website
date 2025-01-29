<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">{{ isNewPost ? 'New Post' : 'Edit Post' }}</h1>
      <div class="flex gap-4">
        <button
          @click="savePost(false)"
          class="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Save Draft
        </button>
        <button
          @click="savePost(true)"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Publish
        </button>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Title Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="post.title"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Post title"
        />
      </div>

      <!-- Slug Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Slug</label>
        <input
          v-model="post.slug"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="post-url-slug"
        />
      </div>

      <!-- Featured Image -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Featured Image</label>
        <div class="mt-1 flex items-center space-x-4">
          <img
            v-if="post.image_url"
            :src="post.image_url"
            alt="Featured image"
            class="h-32 w-32 object-cover rounded-md"
          />
          <div v-else class="h-32 w-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
            No image
          </div>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <!-- Content Editor -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <RichTextEditor v-model="post.content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSupabase } from '~/composables/useSupabase'
import RichTextEditor from '~/components/admin/RichTextEditor.vue'

const route = useRoute()
const router = useRouter()
const { supabase } = useSupabase()

// Define isNewPost
const isNewPost = computed(() => route.params.id === 'new')

const post = ref({
  title: '',
  slug: '',
  content: '',
  image_url: '',
  published: false
})

// Auto-generate slug from title
watch(() => post.value.title, (newTitle) => {
  if (!post.value.slug || isNewPost.value) {
    post.value.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
})

// Handle image upload
async function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${fileName}`

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    post.value.image_url = publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Error uploading image: ' + error.message)
  }
}

// Fetch post if editing
async function fetchPost() {
  if (isNewPost.value) return

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return
  }

  post.value = data
}

// Save post function
async function savePost(publish = false) {
  try {
    if (!post.value.title) {
      alert('Please enter a title')
      return
    }

    const postData = {
      ...post.value,
      published: publish,
      updated_at: new Date().toISOString()
    }

    console.log('Saving post:', postData)

    const { data, error } = isNewPost.value
      ? await supabase.from('posts').insert(postData).select().single()
      : await supabase.from('posts').update(postData).eq('id', route.params.id).select().single()

    if (error) {
      console.error('Error saving post:', error)
      alert('Error saving post: ' + error.message)
      return
    }

    console.log('Post saved successfully:', data)
    alert(publish ? 'Post published successfully!' : 'Draft saved successfully!')
    router.push('/admin/posts')
  } catch (err) {
    console.error('Error:', err)
    alert('An error occurred while saving the post')
  }
}

onMounted(() => {
  fetchPost()
})

definePageMeta({
  layout: 'admin'
})
</script>