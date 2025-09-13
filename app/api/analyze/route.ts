import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Simulated AI analysis - In production, this would call an actual AI service
const analyzeImage = async (imageUrl: string, category: string, itemName: string) => {
  try {
    // Validate inputs
    if (!imageUrl || !category || !itemName) {
      throw new Error("Missing required parameters for analysis")
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate different results based on category/item
    const hash = (category + itemName + imageUrl).length % 10

    const results = [
      {
        status: "pure",
        confidence: 94,
        message: "No adulteration detected",
        details: "The sample shows characteristics consistent with pure, unadulterated food.",
        recommendations: ["Safe for consumption", "Store properly to maintain quality"],
        adulterants: [],
      },
      {
        status: "adulterated",
        confidence: 87,
        message: "Potential adulteration detected",
        details: "The analysis indicates possible presence of artificial additives or adulterants.",
        recommendations: [
          "Avoid consumption",
          "Consider purchasing from a different source",
          "Report to local authorities",
        ],
        adulterants: ["Artificial coloring", "Chemical preservatives"],
      },
      {
        status: "adulterated",
        confidence: 91,
        message: "Adulteration confirmed",
        details: "Multiple adulterants detected in the sample.",
        recommendations: ["Do not consume", "Dispose of the product safely", "Report to food safety authorities"],
        adulterants: ["Starch", "Chalk powder", "Artificial sweeteners"],
      },
      {
        status: "pure",
        confidence: 96,
        message: "High purity confirmed",
        details: "Excellent quality sample with no detectable adulterants.",
        recommendations: ["Safe for consumption", "Good quality product"],
        adulterants: [],
      },
      {
        status: "inconclusive",
        confidence: 65,
        message: "Analysis inconclusive",
        details: "The image quality or sample condition makes it difficult to provide a definitive result.",
        recommendations: [
          "Retake photo with better lighting",
          "Ensure sample is properly prepared",
          "Try again with a fresh sample",
        ],
        adulterants: [],
      },
    ]

    return results[hash % results.length]
  } catch (error) {
    console.error("[v0] AI analysis simulation error:", error)
    throw new Error("Analysis failed")
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, category, itemName, testType } = body

    if (!imageUrl || !category || !itemName || !testType) {
      return NextResponse.json(
        { error: "Missing required fields: imageUrl, category, itemName, testType" },
        { status: 400 },
      )
    }

    // Validate URL format
    try {
      new URL(imageUrl)
    } catch {
      return NextResponse.json({ error: "Invalid image URL format" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Analysis auth error:", authError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    let analysisResult
    try {
      analysisResult = await analyzeImage(imageUrl, category, itemName)
    } catch (error) {
      console.error("[v0] AI analysis failed:", error)
      return NextResponse.json({ error: "Image analysis failed. Please try again" }, { status: 500 })
    }

    const { data: testData, error: testError } = await supabase
      .from("food_tests")
      .insert({
        user_id: user.id,
        category: category.trim(),
        item_name: itemName.trim(),
        test_type: testType.trim(),
        image_url: imageUrl.trim(),
        result_status: analysisResult.status,
        confidence_score: analysisResult.confidence,
        adulterants_detected: analysisResult.adulterants,
        recommendations: analysisResult.recommendations.join("; "),
      })
      .select()
      .single()

    if (testError) {
      console.error("[v0] Test save error:", testError)

      if (testError.message.includes("permission denied")) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 })
      }

      if (testError.message.includes("foreign key")) {
        return NextResponse.json({ error: "Invalid user reference" }, { status: 400 })
      }

      if (testError.message.includes("relation") && testError.message.includes("does not exist")) {
        return NextResponse.json({ error: "Database table not found. Please run database setup" }, { status: 500 })
      }

      // Return analysis result even if save fails
      console.warn("[v0] Analysis completed but failed to save to database")
      return NextResponse.json({
        ...analysisResult,
        testId: null,
        warning: "Analysis completed but could not be saved to history",
      })
    }

    return NextResponse.json({
      ...analysisResult,
      testId: testData.id,
    })
  } catch (error) {
    console.error("[v0] Analysis error:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
