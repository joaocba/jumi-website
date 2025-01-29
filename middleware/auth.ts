import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  // Don't redirect if we're already on the login page
  if (to.path === '/admin/login') {
    return
  }

  const authStore = useAuthStore()
  
  // Check user status
  if (!authStore.user) {
    await authStore.checkUser()
  }
  
  // If still no user and trying to access admin pages, redirect to login
  if (!authStore.user && to.path.startsWith('/admin')) {
    return navigateTo('/admin/login')
  }

  // If user is logged in and trying to access login page, redirect to admin
  if (authStore.user && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})