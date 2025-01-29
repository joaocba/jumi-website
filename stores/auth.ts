import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { useSupabase } from '~/composables/useSupabase'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),
  
  actions: {
    async login(email: string, password: string) {
      const { supabase } = useSupabase()
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        this.user = data.user
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      const { supabase } = useSupabase()
      await supabase.auth.signOut()
      this.user = null
    },
    
    async checkUser() {
      const { supabase } = useSupabase()
      const { data: { user } } = await supabase.auth.getUser()
      this.user = user
    }
  }
})