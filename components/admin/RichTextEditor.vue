<template>
  <div class="prose-editor">
    <menu class="flex gap-2 p-2 bg-gray-50 border rounded-t-lg">
      <button
        class="p-2 hover:bg-gray-200 rounded"
        :class="{ 'bg-gray-200': editor?.isActive('bold') }"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        Bold
      </button>
      <button
        class="p-2 hover:bg-gray-200 rounded"
        :class="{ 'bg-gray-200': editor?.isActive('italic') }"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        Italic
      </button>
      <button
        class="p-2 hover:bg-gray-200 rounded"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'bg-gray-200': editor?.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        class="p-2 hover:bg-gray-200 rounded"
        @click="editor?.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-gray-200': editor?.isActive('bulletList') }"
      >
        Bullet List
      </button>
    </menu>
    <editor-content 
      :editor="editor" 
      class="border border-t-0 rounded-b-lg p-4 min-h-[200px]"
    />
  </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Image
    ],
    content: props.modelValue,
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    }
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
.prose-editor :deep(.ProseMirror) {
  outline: none;
  min-height: 100px;
}

.prose-editor :deep(.ProseMirror p) {
  margin: 1em 0;
}
</style>