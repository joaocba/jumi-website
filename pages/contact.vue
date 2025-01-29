<template>
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">Contacte-nos</h1>
  
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold mb-6">Envie-nos uma mensagem</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700">Assunto</label>
              <input
                v-model="form.subject"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
  
            <button
              type="submit"
              class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              :disabled="submitting"
            >
              {{ submitting ? 'A enviar...' : 'Enviar Mensagem' }}
            </button>
          </form>
        </div>
  
        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">Informações de Contacto</h2>
            <div class="space-y-4">
              <p class="flex items-center">
                <span class="font-medium mr-2">Email:</span>
                <a href="mailto:contact@jumi.pt" class="text-blue-600 hover:text-blue-800">
                  contact@jumi.pt
                </a>
              </p>
              <p class="flex items-center">
                <span class="font-medium mr-2">Telefone:</span>
                <a href="tel:+351999999999" class="text-blue-600 hover:text-blue-800">
                  +351 999 999 999
                </a>
              </p>
              <p class="flex items-center">
                <span class="font-medium mr-2">Morada:</span>
                <span>Rua Principal, Manique do Intendente</span>
              </p>
            </div>
          </div>
  
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">Redes Sociais</h2>
            <div class="flex space-x-4">
              <a href="#" class="text-blue-600 hover:text-blue-800">Facebook</a>
              <a href="#" class="text-blue-600 hover:text-blue-800">Instagram</a>
              <a href="#" class="text-blue-600 hover:text-blue-800">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const submitting = ref(false)
  
  async function handleSubmit() {
    submitting.value = true
    // Add your form submission logic here
    // You might want to send this to your backend or an email service
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    submitting.value = false
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    alert('Mensagem enviada com sucesso!')
  }
  </script>