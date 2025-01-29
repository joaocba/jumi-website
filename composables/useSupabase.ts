import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabaseKey

  // Type checking
  if (!supabaseUrl || !supabaseKey || typeof supabaseUrl !== 'string' || typeof supabaseKey !== 'string') {
    throw new Error('Supabase URL and Key must be defined in environment variables')
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  return { supabase }
}

// supabase bd pw: Vo0*b*qCYna2HegP7Q&0ABBStf