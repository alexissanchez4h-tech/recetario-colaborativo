// src/lib/supabaseClient.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Para mantener compatibilidad con el código existente
// Si usas 'supabase' directamente en componentes client
export const supabase = createClient()