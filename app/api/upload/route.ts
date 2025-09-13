import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const category = formData.get("category") as string
    const itemName = formData.get("itemName") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!category || !itemName) {
      return NextResponse.json({ error: "Category and item name are required" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, and WebP images are allowed" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error("[v0] Upload auth error:", authError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("food-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("[v0] Storage upload error:", uploadError)

      if (uploadError.message.includes("Bucket not found")) {
        return NextResponse.json({ error: "Storage bucket not configured. Please run database setup" }, { status: 500 })
      }

      if (uploadError.message.includes("The resource already exists")) {
        return NextResponse.json({ error: "File already exists" }, { status: 409 })
      }

      if (uploadError.message.includes("File size limit")) {
        return NextResponse.json({ error: "File too large" }, { status: 413 })
      }

      if (uploadError.message.includes("permission denied")) {
        return NextResponse.json({ error: "Upload permission denied" }, { status: 403 })
      }

      return NextResponse.json({ error: "Failed to upload file" }, { status: 400 })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("food-images").getPublicUrl(fileName)

    if (!publicUrl) {
      console.error("[v0] Failed to generate public URL")
      return NextResponse.json({ error: "Failed to generate file URL" }, { status: 500 })
    }

    return NextResponse.json({
      imageUrl: publicUrl,
      fileName: fileName,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)

    if (error instanceof Error && error.message.includes("FormData")) {
      return NextResponse.json({ error: "Invalid file upload format" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
