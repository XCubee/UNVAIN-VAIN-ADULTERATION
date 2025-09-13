import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Stats auth error:", authError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    // Get total tests count
    const { count: totalTests, error: totalError } = await supabase
      .from("food_tests")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    if (totalError) {
      console.error("[v0] Total tests count error:", totalError)
      if (totalError.message.includes("relation") && totalError.message.includes("does not exist")) {
        return NextResponse.json({ error: "Database table not found. Please run database setup" }, { status: 500 })
      }
      return NextResponse.json({ error: "Failed to fetch test statistics" }, { status: 400 })
    }

    // Get recent tests (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { count: recentTests, error: recentError } = await supabase
      .from("food_tests")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", sevenDaysAgo.toISOString())

    if (recentError) {
      console.error("[v0] Recent tests count error:", recentError)
      return NextResponse.json({ error: "Failed to fetch recent test statistics" }, { status: 400 })
    }

    // Get pure vs adulterated counts
    const { data: statusCounts, error: statusError } = await supabase
      .from("food_tests")
      .select("result_status")
      .eq("user_id", user.id)

    if (statusError) {
      console.error("[v0] Status counts error:", statusError)
      return NextResponse.json({ error: "Failed to fetch test result statistics" }, { status: 400 })
    }

    const pureCount = statusCounts?.filter((test) => test.result_status === "pure").length || 0
    const adulteratedCount = statusCounts?.filter((test) => test.result_status === "adulterated").length || 0

    return NextResponse.json({
      totalTests: totalTests || 0,
      recentTests: recentTests || 0,
      pureCount,
      adulteratedCount,
    })
  } catch (error) {
    console.error("[v0] Stats GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
