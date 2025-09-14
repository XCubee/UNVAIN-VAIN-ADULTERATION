import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables")
    throw new Error(
      "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
    )
  }

  try {
    const client = createBrowserClient(supabaseUrl, supabaseAnonKey)
    return client
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    throw new Error("Failed to initialize Supabase client. Please check your configuration.")
  }
}
