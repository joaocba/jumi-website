<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-xl font-bold">JUMI</NuxtLink>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
            <NuxtLink to="/about" class="hover:text-blue-600">About</NuxtLink>
            <NuxtLink to="/activities" class="hover:text-blue-600">Activities</NuxtLink>
            <NuxtLink to="/news" class="hover:text-blue-600">News</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-blue-600">Contact</NuxtLink>
            <div class="border-l border-gray-300 h-6 mx-2"></div>
            <NuxtLink to="/admin/login" class="text-blue-600 hover:text-blue-800">
              Admin Login
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-gray-100">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-gray-600">© {{ new Date().getFullYear() }} JUMI - Jovens Unidos por Manique do Intendente</p>
      </div>
    </footer>
  </div>
</template>