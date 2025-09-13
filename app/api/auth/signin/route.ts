import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[v0] Signin error:", error)

      if (error.message.includes("Invalid login credentials")) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      if (error.message.includes("Email not confirmed")) {
        return NextResponse.json({ error: "Please check your email and confirm your account" }, { status: 401 })
      }

      if (error.message.includes("Too many requests")) {
        return NextResponse.json({ error: "Too many login attempts. Please try again later" }, { status: 429 })
      }

      return NextResponse.json({ error: error.message || "Failed to sign in" }, { status: 400 })
    }

    return NextResponse.json({
      message: "Signed in successfully",
      user: data.user,
    })
  } catch (error) {
    console.error("[v0] Signin route error:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
