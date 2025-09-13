import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Profile auth error:", authError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) {
      console.error("[v0] Profile fetch error:", error)

      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 })
      }

      if (error.message.includes("permission denied")) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 400 })
    }

    return NextResponse.json({ profile, user })
  } catch (error) {
    console.error("[v0] Profile GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, phone } = body

    if (!fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Profile update auth error:", authError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        phone: phone?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Profile update error:", error)

      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 })
      }

      if (error.message.includes("permission denied")) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      if (error.message.includes("duplicate key")) {
        return NextResponse.json({ error: "Profile data conflicts with existing record" }, { status: 409 })
      }

      return NextResponse.json({ error: "Failed to update profile" }, { status: 400 })
    }

    return NextResponse.json({ profile: data })
  } catch (error) {
    console.error("[v0] Profile PUT error:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
