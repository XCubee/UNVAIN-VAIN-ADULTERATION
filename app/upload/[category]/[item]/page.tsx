"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Camera, Upload, RotateCcw, Save, Share, CheckCircle, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"

const itemNames = {
  "milk-dairy": {
    milk: "Milk",
    cheese: "Cheese",
    yogurt: "Yogurt",
    butter: "Butter",
  },
  pulses: {
    "toor-dal": "Toor Dal",
    "masoor-dal": "Masoor Dal",
    "chana-dal": "Chana Dal",
    "moong-dal": "Moong Dal",
  },
  spices: {
    turmeric: "Turmeric Powder",
    "chili-powder": "Chili Powder",
    cumin: "Cumin Powder",
    coriander: "Coriander Powder",
  },
  honey: {
    "raw-honey": "Raw Honey",
    "processed-honey": "Processed Honey",
    "organic-honey": "Organic Honey",
  },
  vegetables: {
    apples: "Apples",
    tomatoes: "Tomatoes",
    "leafy-greens": "Leafy Greens",
    berries: "Berries",
  },
  meat: {
    chicken: "Chicken",
    fish: "Fish",
    mutton: "Mutton",
    prawns: "Prawns",
  },
}

export default function PhotoUploadPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.category as string
  const itemId = params.item as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const itemName =
    itemNames[categoryId as keyof typeof itemNames]?.[itemId as keyof (typeof itemNames)[keyof typeof itemNames]] ||
    "Unknown Item"

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    fileInputRef.current?.click()
  }

  const startAnalysis = async () => {
    if (!selectedImage || !selectedFile) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setShowResult(false)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("category", categoryId)
      formData.append("itemName", itemName)

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image")
      }

      const { imageUrl } = await uploadResponse.json()
      setIsUploading(false)

      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 10
        })
      }, 300)

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          category: categoryId,
          itemName,
          testType: "visual_analysis",
        }),
      })

      if (!analysisResponse.ok) {
        throw new Error("Failed to analyze image")
      }

      const result = await analysisResponse.json()

      clearInterval(progressInterval)
      setAnalysisProgress(100)
      setIsAnalyzing(false)
      setAnalysisResult(result)
      setShowResult(true)
    } catch (error) {
      console.error("Analysis failed:", error)
      setIsAnalyzing(false)
      setIsUploading(false)
      alert("Analysis failed. Please try again.")
    }
  }

  const retakePhoto = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    setAnalysisResult(null)
    setShowResult(false)
    setAnalysisProgress(0)
  }

  const saveReport = async () => {
    router.push("/history")
  }

  const shareReport = () => {
    alert("Share functionality would open here")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href={`/test/${categoryId}/${itemId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Analysis</h1>
              <p className="text-sm text-muted-foreground">Testing: {itemName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {!selectedImage && (
          <>
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Photo Guidelines:</strong> Ensure good lighting, clean background, and the sample is clearly
                visible. The AI analysis accuracy depends on image quality.
              </AlertDescription>
            </Alert>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upload Photo</CardTitle>
                <CardDescription>
                  Take a photo or upload an image of your {itemName.toLowerCase()} sample
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Add Your Photo</h3>
                  <p className="text-muted-foreground mb-6">
                    Take a clear photo of your sample or upload from your device
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={handleCameraCapture} className="bg-primary hover:bg-primary/90">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedImage && !showResult && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Photo Preview
                  <Button variant="outline" size="sm" onClick={retakePhoto} className="bg-transparent">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full max-w-md mx-auto">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Sample for analysis"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg border border-border"
                  />
                </div>
              </CardContent>
            </Card>

            {!isAnalyzing && !isUploading && (
              <Card className="mb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ready for Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI will analyze your {itemName.toLowerCase()} sample for purity and adulteration.
                  </p>
                  <Button onClick={startAnalysis} size="lg" className="bg-primary hover:bg-primary/90">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Start AI Analysis
                  </Button>
                </CardContent>
              </Card>
            )}

            {isUploading && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
                    Uploading Image...
                  </CardTitle>
                  <CardDescription>Preparing your image for analysis</CardDescription>
                </CardHeader>
              </Card>
            )}

            {isAnalyzing && !isUploading && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
                    Analyzing Sample...
                  </CardTitle>
                  <CardDescription>Our AI is processing your image to detect any adulteration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={analysisProgress} className="w-full" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {analysisProgress < 30
                          ? "Processing image..."
                          : analysisProgress < 60
                            ? "Analyzing composition..."
                            : analysisProgress < 90
                              ? "Detecting adulterants..."
                              : "Finalizing results..."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {showResult && analysisResult && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Analysis Results
                  <Badge
                    variant={
                      analysisResult.status === "pure"
                        ? "default"
                        : analysisResult.status === "adulterated"
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      analysisResult.status === "pure"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : analysisResult.status === "adulterated"
                          ? ""
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {analysisResult.status === "pure"
                      ? "Pure"
                      : analysisResult.status === "adulterated"
                        ? "Adulterated"
                        : "Inconclusive"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Image
                      src={selectedImage! || "/placeholder.svg"}
                      alt="Analyzed sample"
                      width={300}
                      height={200}
                      className="w-full h-auto rounded-lg border border-border"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Confidence Score</h4>
                      <div className="flex items-center space-x-3">
                        <Progress value={analysisResult.confidence} className="flex-1" />
                        <span className="text-sm font-medium">{analysisResult.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Analysis Summary</h4>
                      <p className="text-sm text-muted-foreground">{analysisResult.details}</p>
                    </div>
                    {analysisResult.adulterants && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Detected Adulterants</h4>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.adulterants.map((adulterant: string) => (
                            <Badge key={adulterant} variant="destructive" className="text-xs">
                              {adulterant}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {analysisResult.status === "pure" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                  )}
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="outline" onClick={retakePhoto} className="bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retest
              </Button>
              <Button onClick={saveReport} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Report
              </Button>
              <Button variant="outline" onClick={shareReport} className="bg-transparent">
                <Share className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
