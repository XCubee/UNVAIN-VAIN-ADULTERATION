import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")

    if (limit < 1 || limit > 100) {
      return NextResponse.json({ error: "Limit must be between 1 and 100" }, { status: 400 })
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Tests auth error:", authError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    let query = supabase
      .from("food_tests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (category) {
      query = query.eq("category", category)
    }

    const { data: tests, error } = await query

    if (error) {
      console.error("[v0] Tests fetch error:", error)

      if (error.message.includes("permission denied")) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        return NextResponse.json({ error: "Database table not found. Please run database setup" }, { status: 500 })
      }

      return NextResponse.json({ error: "Failed to fetch tests" }, { status: 400 })
    }

    return NextResponse.json({ tests: tests || [] })
  } catch (error) {
    console.error("[v0] Tests GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      category,
      itemName,
      testType,
      imageUrl,
      resultStatus,
      confidenceScore,
      adulterantsDetected,
      recommendations,
    } = body

    if (!category || !itemName || !testType || !imageUrl || !resultStatus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["pure", "adulterated", "inconclusive"].includes(resultStatus)) {
      return NextResponse.json({ error: "Invalid result status" }, { status: 400 })
    }

    if (confidenceScore && (confidenceScore < 0 || confidenceScore > 100)) {
      return NextResponse.json({ error: "Confidence score must be between 0 and 100" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Test creation auth error:", authError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("food_tests")
      .insert({
        user_id: user.id,
        category: category.trim(),
        item_name: itemName.trim(),
        test_type: testType.trim(),
        image_url: imageUrl.trim(),
        result_status: resultStatus,
        confidence_score: confidenceScore || null,
        adulterants_detected: adulterantsDetected || [],
        recommendations: recommendations || "",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Test creation error:", error)

      if (error.message.includes("permission denied")) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      if (error.message.includes("foreign key")) {
        return NextResponse.json({ error: "Invalid user reference" }, { status: 400 })
      }

      if (error.message.includes("check constraint")) {
        return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
      }

      return NextResponse.json({ error: "Failed to create test record" }, { status: 400 })
    }

    return NextResponse.json({ test: data })
  } catch (error) {
    console.error("[v0] Test POST error:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
