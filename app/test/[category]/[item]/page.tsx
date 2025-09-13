"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, Clock, Lightbulb, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const testInstructions = {
  "milk-dairy": {
    milk: {
      name: "Milk Purity Test",
      description: "Test fresh milk for common adulterants",
      duration: "5-10 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Prepare the Sample",
          description: "Take 50ml of milk in a clean, transparent glass",
          icon: "🥛",
        },
        {
          title: "Visual Inspection",
          description: "Check for unusual color, consistency, or floating particles",
          icon: "👁️",
        },
        {
          title: "Smell Test",
          description: "Fresh milk should have a mild, pleasant smell",
          icon: "👃",
        },
        {
          title: "Water Test",
          description: "Add a drop of milk to water - pure milk will dissolve slowly",
          icon: "💧",
        },
        {
          title: "Take Photo",
          description: "Capture a clear photo of the milk sample in good lighting",
          icon: "📸",
        },
      ],
      tips: [
        "Use room temperature milk for best results",
        "Ensure the glass is completely clean",
        "Test within 2 hours of purchase for accuracy",
      ],
      adulterants: ["Water", "Starch", "Urea", "Detergent", "Chalk powder"],
    },
    cheese: {
      name: "Cheese Quality Test",
      description: "Verify cheese authenticity and quality",
      duration: "3-5 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Check",
          description: "Look for uniform color and texture without artificial spots",
          icon: "👁️",
        },
        {
          title: "Texture Test",
          description: "Press gently - should feel firm but not rubbery",
          icon: "✋",
        },
        {
          title: "Smell Assessment",
          description: "Should have a natural dairy aroma, not chemical",
          icon: "👃",
        },
        {
          title: "Photo Capture",
          description: "Take a clear photo showing the cheese surface and cut edge",
          icon: "📸",
        },
      ],
      tips: ["Test at room temperature", "Check expiry dates before testing", "Look for natural aging patterns"],
      adulterants: ["Artificial colors", "Preservatives", "Fillers", "Vegetable oils"],
    },
  },
  pulses: {
    "toor-dal": {
      name: "Toor Dal Purity Test",
      description: "Detect adulteration in yellow split pigeon peas",
      duration: "10-15 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Sample Preparation",
          description: "Take 2 tablespoons of toor dal in a clean bowl",
          icon: "🥄",
        },
        {
          title: "Visual Inspection",
          description: "Check for uniform yellow color and consistent size",
          icon: "👁️",
        },
        {
          title: "Water Soak Test",
          description: "Soak dal in water for 10 minutes and observe color change",
          icon: "💧",
        },
        {
          title: "Rub Test",
          description: "Rub a few pieces between fingers to check for artificial coating",
          icon: "✋",
        },
        {
          title: "Photo Documentation",
          description: "Take photos of dry dal and after soaking",
          icon: "📸",
        },
      ],
      tips: [
        "Use clean, filtered water for soaking",
        "Natural toor dal may release slight color but not bright yellow",
        "Artificial colors will create unnatural bright water",
      ],
      adulterants: ["Artificial colors", "Kesari dal", "Starch", "Metanil yellow"],
    },
    "masoor-dal": {
      name: "Masoor Dal Purity Test",
      description: "Test red lentils for common adulterants",
      duration: "8-12 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Sample Selection",
          description: "Take a handful of masoor dal in a white plate",
          icon: "🍽️",
        },
        {
          title: "Color Check",
          description: "Look for consistent orange-red color without bright spots",
          icon: "🔍",
        },
        {
          title: "Water Test",
          description: "Soak in water for 8 minutes and check water color",
          icon: "💧",
        },
        {
          title: "Physical Inspection",
          description: "Check for foreign particles like sand or brick powder",
          icon: "🔍",
        },
        {
          title: "Capture Images",
          description: "Photograph the dal before and after water test",
          icon: "📸",
        },
      ],
      tips: [
        "Pure masoor dal has a natural orange-red color",
        "Avoid dal with too bright or artificial-looking color",
        "Check for uniform size and shape",
      ],
      adulterants: ["Artificial colors", "Brick powder", "Sand", "Lead chromate"],
    },
  },
  spices: {
    turmeric: {
      name: "Turmeric Powder Test",
      description: "Detect harmful adulterants in turmeric powder",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Sample Preparation",
          description: "Take 1 teaspoon of turmeric powder on a white plate",
          icon: "🥄",
        },
        {
          title: "Color Analysis",
          description: "Check for natural golden-yellow color, not too bright",
          icon: "🌟",
        },
        {
          title: "Water Test",
          description: "Mix with water - pure turmeric creates golden solution",
          icon: "💧",
        },
        {
          title: "Acid Test",
          description: "Add a drop of lemon juice - should turn red if pure",
          icon: "🍋",
        },
        {
          title: "Photo Evidence",
          description: "Take clear photos of all test stages",
          icon: "📸",
        },
      ],
      tips: [
        "Pure turmeric has an earthy aroma",
        "Avoid powder that's too bright yellow",
        "Test should be done in good natural light",
      ],
      adulterants: ["Lead chromate", "Metanil yellow", "Chalk powder", "Starch"],
    },
  },
  honey: {
    "raw-honey": {
      name: "Raw Honey Purity Test",
      description: "Verify the authenticity of raw honey",
      duration: "10-15 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Thumb Test",
          description: "Put a drop on thumb - pure honey won't spread easily",
          icon: "👍",
        },
        {
          title: "Water Test",
          description: "Drop honey in water - pure honey settles at bottom",
          icon: "💧",
        },
        {
          title: "Paper Test",
          description: "Drop on paper - pure honey won't be absorbed quickly",
          icon: "📄",
        },
        {
          title: "Crystallization Check",
          description: "Pure honey crystallizes over time naturally",
          icon: "💎",
        },
        {
          title: "Document Results",
          description: "Photograph all test stages for analysis",
          icon: "📸",
        },
      ],
      tips: [
        "Pure honey has a thick consistency",
        "Should have natural floral aroma",
        "May contain small particles of pollen or wax",
      ],
      adulterants: ["Sugar syrup", "Corn syrup", "Artificial flavors", "Water"],
    },
  },
  vegetables: {
    apples: {
      name: "Apple Quality Test",
      description: "Check for wax coating and chemical residues",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Inspection",
          description: "Look for natural skin texture and color variations",
          icon: "👁️",
        },
        {
          title: "Wax Test",
          description: "Scrape surface gently - excessive wax will come off",
          icon: "🔪",
        },
        {
          title: "Water Rinse",
          description: "Rinse with warm water and observe any coating removal",
          icon: "💧",
        },
        {
          title: "Smell Check",
          description: "Should have natural apple aroma, not chemical smell",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Capture before and after cleaning images",
          icon: "📸",
        },
      ],
      tips: [
        "Natural apples may have slight imperfections",
        "Excessive shine may indicate wax coating",
        "Organic apples typically have more natural appearance",
      ],
      adulterants: ["Wax coating", "Pesticide residues", "Artificial colors"],
    },
  },
  meat: {
    chicken: {
      name: "Chicken Freshness Test",
      description: "Verify chicken quality and detect harmful preservatives",
      duration: "8-12 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Color Check",
          description: "Fresh chicken should be pale pink, not too white or yellow",
          icon: "🎨",
        },
        {
          title: "Texture Test",
          description: "Should feel firm but not rubbery or slimy",
          icon: "✋",
        },
        {
          title: "Smell Assessment",
          description: "Fresh chicken has minimal odor, not strong or chemical",
          icon: "👃",
        },
        {
          title: "Water Test",
          description: "Rinse with water - excessive foam may indicate chemicals",
          icon: "💧",
        },
        {
          title: "Document Findings",
          description: "Take photos showing color, texture, and any abnormalities",
          icon: "📸",
        },
      ],
      tips: [
        "Test immediately after purchase",
        "Keep refrigerated during testing",
        "Look for natural marbling and texture",
      ],
      adulterants: ["Formalin", "Artificial colors", "Growth hormones", "Preservatives"],
    },
  },
}

export default function TestInstructionPage() {
  const params = useParams()
  const categoryId = params.category as string
  const itemId = params.item as string

  const testData =
    testInstructions[categoryId as keyof typeof testInstructions]?.[
      itemId as keyof (typeof testInstructions)[keyof typeof testInstructions]
    ]

  if (!testData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Test Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested test instructions do not exist.</p>
          <Link href="/home">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href={`/category/${categoryId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">{testData.name}</h1>
              <p className="text-sm text-muted-foreground">{testData.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Test Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test Overview
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {testData.duration}
                </Badge>
                <Badge
                  variant={
                    testData.difficulty === "Easy"
                      ? "default"
                      : testData.difficulty === "Medium"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {testData.difficulty}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Common Adulterants:</h4>
                <div className="flex flex-wrap gap-1">
                  {testData.adulterants.map((adulterant) => (
                    <Badge key={adulterant} variant="outline" className="text-xs">
                      {adulterant}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What You'll Need:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sample of the food item</li>
                  <li>• Clean water</li>
                  <li>• Good lighting</li>
                  <li>• Your smartphone camera</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Important:</strong> Ensure good lighting when taking photos. The AI analysis depends on clear,
            well-lit images for accurate results.
          </AlertDescription>
        </Alert>

        {/* Test Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step-by-Step Instructions</CardTitle>
            <CardDescription>Follow these steps carefully for accurate testing results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testData.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="text-2xl">{step.icon}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Lightbulb className="w-5 h-5 mr-2" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {testData.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-blue-700">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Test?</h3>
            <p className="text-muted-foreground mb-4">
              Once you've completed all the steps above, take a clear photo for AI analysis.
            </p>
            <Link href={`/upload/${categoryId}/${itemId}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Camera className="w-5 h-5 mr-2" />
                Take Photo & Analyze
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
