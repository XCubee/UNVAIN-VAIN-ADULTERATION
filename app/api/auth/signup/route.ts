import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, phone } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/home`,
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    })

    if (error) {
      console.error("[v0] Signup error:", error)

      if (error.message.includes("already registered")) {
        return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
      }

      if (error.message.includes("invalid email")) {
        return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
      }

      if (error.message.includes("weak password")) {
        return NextResponse.json({ error: "Password is too weak. Please choose a stronger password" }, { status: 400 })
      }

      return NextResponse.json({ error: error.message || "Failed to create account" }, { status: 400 })
    }

    return NextResponse.json({
      message: "User created successfully",
      user: data.user,
    })
  } catch (error) {
    console.error("[v0] Signup route error:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
