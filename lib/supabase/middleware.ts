import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Create a response object that we can modify
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, skip auth checks
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase environment variables not found, skipping auth middleware")
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          
          // Create a new response with the updated cookies
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          // Set cookies in the response
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      if (authError.message.includes("Auth session missing")) {
        // This is expected when user hasn't signed in, continue without error logging
      } else {
        console.error("[v0] Auth error in middleware:", authError.message)
      }
      // Continue without redirecting on auth errors
      return supabaseResponse
    }

    // Redirect unauthenticated users to login, except for auth pages and home
    if (
      !user &&
      !request.nextUrl.pathname.startsWith("/auth") &&
      request.nextUrl.pathname !== "/" &&
      request.nextUrl.pathname !== "/home"
    ) {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    // Continue without auth check if there's an error
  }

  return supabaseResponse
}
