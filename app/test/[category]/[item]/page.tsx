"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, Clock, Lightbulb, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "@/lib/i18n/client"

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
    yogurt: {
      name: "Yogurt Authenticity Test",
      description: "Verify the quality and purity of yogurt",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Examination",
          description: "Check for consistent texture and natural appearance",
          icon: "👁️",
        },
        {
          title: "Smell Assessment",
          description: "Pure yogurt has a fresh, tangy aroma without chemical smells",
          icon: "👃",
        },
        {
          title: "Consistency Test",
          description: "Tilt spoon - natural yogurt should be thick and creamy",
          icon: "🥄",
        },
        {
          title: "Water Separation Test",
          description: "Minimal whey separation indicates quality yogurt",
          icon: "💧",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of yogurt texture and consistency tests",
          icon: "📸",
        },
      ],
      tips: [
        "Fresh yogurt should have a pleasant tangy taste",
        "Check ingredient list for artificial thickeners",
        "Quality yogurt contains live cultures",
      ],
      adulterants: ["Artificial thickeners", "Excessive preservatives", "Synthetic flavors", "Starch"],
    },
    butter: {
      name: "Butter Purity Test",
      description: "Test butter for quality and adulterants",
      duration: "8-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Visual Inspection",
          description: "Check for uniform color and smooth texture",
          icon: "👁️",
        },
        {
          title: "Melt Test",
          description: "Pure butter melts completely and becomes transparent",
          icon: "🔥",
        },
        {
          title: "Water Test",
          description: "Add to hot water - pure butter forms clear oil layer on top",
          icon: "💧",
        },
        {
          title: "Flame Test",
          description: "Pure butter burns with yellow flame without sputtering",
          icon: "🔥",
        },
        {
          title: "Photo Documentation",
          description: "Take photos of butter before and after melting tests",
          icon: "📸",
        },
      ],
      tips: [
        "Pure butter should have a rich, creamy taste",
        "Check for uniform melting without separation",
        "Real butter solidifies when refrigerated",
      ],
      adulterants: ["Vegetable oils", "Margarine", "Hydrogenated fats", "Artificial colors"],
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
    "chana-dal": {
      name: "Chana Dal Purity Test",
      description: "Test split chickpeas for common adulterants",
      duration: "10-15 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Visual Examination",
          description: "Check for uniform yellow color and split texture",
          icon: "👁️",
        },
        {
          title: "Float Test",
          description: "Place in water - pure dal sinks, adulterants may float",
          icon: "💧",
        },
        {
          title: "Color Release Test",
          description: "Soak in warm water for 10 minutes to check for artificial colors",
          icon: "🌡️",
        },
        {
          title: "Texture Test",
          description: "Rub between fingers to check for artificial coating",
          icon: "✋",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos before and after soaking tests",
          icon: "📸",
        },
      ],
      tips: [
        "Pure chana dal has a natural yellow color",
        "Should not release bright colors in water",
        "Check for uniform size and minimal broken pieces",
      ],
      adulterants: ["Metanil yellow", "Artificial colors", "Kesari dal", "Coating agents"],
    },
    "moong-dal": {
      name: "Moong Dal Purity Test",
      description: "Test split mung beans for adulterants",
      duration: "8-10 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Check",
          description: "Examine for consistent pale yellow color and size",
          icon: "👁️",
        },
        {
          title: "Water Immersion",
          description: "Soak in clear water for 5 minutes to check for color release",
          icon: "💧",
        },
        {
          title: "Spread Test",
          description: "Spread on white paper to check for foreign particles",
          icon: "📄",
        },
        {
          title: "Rubbing Test",
          description: "Rub between palms to detect artificial coating",
          icon: "✋",
        },
        {
          title: "Photo Evidence",
          description: "Take photos of dry dal and after water immersion",
          icon: "📸",
        },
      ],
      tips: [
        "Pure moong dal has a natural pale yellow color",
        "Should not release bright colors in water",
        "Check for uniform texture and minimal broken pieces",
      ],
      adulterants: ["Artificial colors", "Metanil yellow", "Coating agents", "Foreign seeds"],
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
    "chili-powder": {
      name: "Chili Powder Authenticity Test",
      description: "Detect artificial colors and fillers in chili powder",
      duration: "5-10 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Inspection",
          description: "Check for natural red color with slight variations",
          icon: "👁️",
        },
        {
          title: "Water Test",
          description: "Mix with water - pure chili creates natural red solution",
          icon: "💧",
        },
        {
          title: "Oil Float Test",
          description: "Sprinkle on water surface - artificial colors will dissolve quickly",
          icon: "🛢️",
        },
        {
          title: "Aroma Test",
          description: "Pure chili has distinctive spicy smell, not chemical",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of powder and water test results",
          icon: "📸",
        },
      ],
      tips: [
        "Pure chili powder has natural color variations",
        "Artificial colors create unnaturally bright solutions",
        "Check for uniform texture without visible fillers",
      ],
      adulterants: ["Sudan red dyes", "Brick powder", "Artificial colors", "Sawdust"],
    },
    cumin: {
      name: "Cumin Seed Purity Test",
      description: "Test cumin seeds and powder for adulterants",
      duration: "8-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Visual Check",
          description: "Examine for uniform brownish color and characteristic shape",
          icon: "👁️",
        },
        {
          title: "Float Test",
          description: "Place in water - pure cumin floats initially then sinks",
          icon: "💧",
        },
        {
          title: "Aroma Test",
          description: "Rub between fingers - should release distinctive cumin aroma",
          icon: "👃",
        },
        {
          title: "Paper Test",
          description: "Rub on white paper - should not leave colored marks",
          icon: "📄",
        },
        {
          title: "Photo Evidence",
          description: "Take clear photos of seeds/powder and test results",
          icon: "📸",
        },
      ],
      tips: [
        "Pure cumin has a distinctive earthy aroma",
        "Seeds should be uniform in size and shape",
        "Powder should have consistent color without bright spots",
      ],
      adulterants: ["Grass seeds", "Charcoal powder", "Artificial colors", "Dirt"],
    },
    coriander: {
      name: "Coriander Powder Test",
      description: "Verify the purity of coriander powder",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Color Examination",
          description: "Check for natural light brown to yellowish-green color",
          icon: "🎨",
        },
        {
          title: "Aroma Check",
          description: "Pure coriander has distinctive citrusy, earthy smell",
          icon: "👃",
        },
        {
          title: "Water Test",
          description: "Mix with water - should form natural colored solution",
          icon: "💧",
        },
        {
          title: "Texture Test",
          description: "Rub between fingers - should feel slightly oily, not gritty",
          icon: "✋",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of powder and water test",
          icon: "📸",
        },
      ],
      tips: [
        "Pure coriander powder has a pleasant aroma",
        "Should not have excessive dust or fillers",
        "Natural color variations are normal",
      ],
      adulterants: ["Sawdust", "Starch", "Horse dung", "Artificial colors"],
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
    "organic-honey": {
      name: "Organic Honey Test",
      description: "Verify the authenticity of organic honey",
      duration: "8-12 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Visual Inspection",
          description: "Check for natural cloudiness and color variations typical of unprocessed honey",
          icon: "👁️",
        },
        {
          title: "Viscosity Test",
          description: "Tilt container - organic honey flows slowly with natural resistance",
          icon: "⏱️",
        },
        {
          title: "Aroma Assessment",
          description: "Organic honey has complex floral notes without artificial sweetness",
          icon: "👃",
        },
        {
          title: "Taste Test (Optional)",
          description: "Should have complex flavor profile with natural aftertaste",
          icon: "👅",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos showing color, clarity, and flow characteristics",
          icon: "📸",
        },
      ],
      tips: [
        "Organic honey often contains pollen and propolis particles",
        "Natural crystallization varies by flower source and season",
        "Check for certification marks on original packaging",
      ],
      adulterants: ["Conventional honey", "Sugar syrup", "Filtered honey", "Heat-treated honey"],
    },
    "processed-honey": {
      name: "Processed Honey Test",
      description: "Detect adulteration in commercial honey",
      duration: "8-12 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "String Test",
          description: "Dip finger and pull up - pure honey forms continuous string",
          icon: "🧵",
        },
        {
          title: "Flame Test",
          description: "Apply to cotton wick - pure honey burns, adulterated may not",
          icon: "🔥",
        },
        {
          title: "Dissolution Test",
          description: "Mix with water - pure honey dissolves slowly and evenly",
          icon: "💧",
        },
        {
          title: "Texture Assessment",
          description: "Rub between fingers - should feel smooth, not grainy",
          icon: "✋",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of all test results",
          icon: "📸",
        },
      ],
      tips: [
        "Pure honey doesn't dissolve immediately in cold water",
        "Adulterated honey may have overly sweet smell",
        "Check for uniform texture throughout",
      ],
      adulterants: ["High fructose corn syrup", "Inverted sugar", "Rice syrup", "Jaggery"],
    },
    "comb-honey": {
      name: "Honeycomb Authenticity Test",
      description: "Verify the purity of honeycomb",
      duration: "5-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Visual Inspection",
          description: "Check for uniform cell structure and natural color variations",
          icon: "👁️",
        },
        {
          title: "Wax Test",
          description: "Pure beeswax is pliable when warmed, not brittle",
          icon: "🔥",
        },
        {
          title: "Honey Extraction",
          description: "Press gently - pure honey flows easily from cells",
          icon: "💧",
        },
        {
          title: "Aroma Check",
          description: "Should have natural honey and beeswax smell",
          icon: "👃",
        },
        {
          title: "Photo Evidence",
          description: "Take detailed photos of comb structure and honey flow",
          icon: "📸",
        },
      ],
      tips: [
        "Natural honeycomb has slight color variations",
        "Cells should be consistently sized but not perfectly uniform",
        "Pure comb has distinctive beeswax aroma",
      ],
      adulterants: ["Artificial wax", "Sugar-fed honey", "Synthetic foundations"],
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
    berries: {
      name: "Berry Freshness Test",
      description: "Test for artificial coloring and preservatives in berries",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Examination",
          description: "Check for uniform size, unnaturally bright colors, or perfect appearance",
          icon: "👁️",
        },
        {
          title: "Water Test",
          description: "Place in water - artificial colors will leach out quickly",
          icon: "💧",
        },
        {
          title: "Texture Assessment",
          description: "Natural berries have varied firmness; artificially preserved ones feel uniform",
          icon: "✋",
        },
        {
          title: "Crush Test",
          description: "Gently crush a berry - should stain naturally without unusual colors",
          icon: "👆",
        },
        {
          title: "Photo Documentation",
          description: "Take photos before and after water and crush tests",
          icon: "📸",
        },
      ],
      tips: [
        "Natural berries have slight variations in color and size",
        "Berries with perfect appearance year-round may be treated",
        "Fresh berries should have natural aroma when crushed",
      ],
      adulterants: ["Artificial colors", "Preservatives", "Fungicides", "Wax coatings"],
    },
    tomatoes: {
      name: "Tomato Freshness Test",
      description: "Test for artificial ripening agents in tomatoes",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Check",
          description: "Look for uniform color and texture throughout the tomato",
          icon: "👁️",
        },
        {
          title: "Cut Test",
          description: "Slice open - natural tomatoes have consistent color inside",
          icon: "🔪",
        },
        {
          title: "Float Test",
          description: "Place in water - artificially ripened tomatoes often float",
          icon: "💧",
        },
        {
          title: "Texture Assessment",
          description: "Should feel firm but slightly soft, not hard or mushy",
          icon: "✋",
        },
        {
          title: "Photo Documentation",
          description: "Take photos of whole and cut tomato for analysis",
          icon: "📸",
        },
      ],
      tips: [
        "Naturally ripened tomatoes have consistent color throughout",
        "Check for unusual patches or color variations",
        "Artificially ripened tomatoes may have harder texture",
      ],
      adulterants: ["Calcium carbide", "Ethylene gas", "Artificial colors"],
    },
    greens: {
      name: "Leafy Greens Test",
      description: "Check for artificial coloring and preservatives",
      duration: "5-10 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Color Inspection",
          description: "Look for unnaturally bright or uniform green color",
          icon: "👁️",
        },
        {
          title: "Water Test",
          description: "Soak in warm water - artificial colors will leach out",
          icon: "💧",
        },
        {
          title: "Texture Check",
          description: "Natural greens have varied texture, not uniformly waxy",
          icon: "✋",
        },
        {
          title: "Wilting Test",
          description: "Leave at room temperature - treated greens wilt differently",
          icon: "🕒",
        },
        {
          title: "Photo Documentation",
          description: "Take photos before and after water test",
          icon: "📸",
        },
      ],
      tips: [
        "Natural greens have color variations between leaves",
        "Check for unusual smell when soaking in warm water",
        "Treated vegetables may not wilt normally",
      ],
      adulterants: ["Malachite green", "Copper compounds", "Chemical preservatives"],
    },
    "leafy-greens": {
      name: "Leafy Green Vegetables Test",
      description: "Detect chemical treatments and preservatives in leafy greens",
      duration: "6-10 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Assessment",
          description: "Check for overly perfect appearance and unnaturally vibrant color",
          icon: "👁️",
        },
        {
          title: "Vinegar Test",
          description: "Soak a leaf in vinegar solution - artificial colors will separate",
          icon: "🧪",
        },
        {
          title: "Stem Inspection",
          description: "Examine stems - should be naturally firm without unusual coating",
          icon: "🔍",
        },
        {
          title: "Freshness Test",
          description: "Bend a leaf - natural greens snap crisply when fresh",
          icon: "💪",
        },
        {
          title: "Photo Evidence",
          description: "Take photos before and after vinegar test for analysis",
          icon: "📸",
        },
      ],
      tips: [
        "Organic leafy greens may have small holes from insects",
        "Natural variations in color and leaf size are normal",
        "Excessive uniformity often indicates treatment",
      ],
      adulterants: ["Oxalic acid", "Copper sulfate", "Formaldehyde", "Artificial dyes"],
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
    fish: {
      name: "Fish Freshness Test",
      description: "Detect preservatives and verify freshness of fish",
      duration: "5-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Eye Examination",
          description: "Fresh fish has clear, bulging eyes, not sunken or cloudy",
          icon: "👁️",
        },
        {
          title: "Gill Check",
          description: "Gills should be bright red/pink, not brown or grayish",
          icon: "🔍",
        },
        {
          title: "Texture Test",
          description: "Press flesh - should be firm and spring back, not soft",
          icon: "✋",
        },
        {
          title: "Smell Test",
          description: "Fresh fish has mild ocean smell, not strong or ammonia-like",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of eyes, gills, and overall appearance",
          icon: "📸",
        },
      ],
      tips: [
        "Check for shiny, metallic skin with tight scales",
        "Avoid fish with excessive slime or dryness",
        "Fresh fish should not have strong fishy odor",
      ],
      adulterants: ["Formalin", "Ammonia compounds", "Sodium benzoate", "Artificial colors"],
    },
    mutton: {
      name: "Mutton Quality Test",
      description: "Verify freshness and detect preservatives in mutton",
      duration: "8-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Color Inspection",
          description: "Fresh mutton should be bright red, not brown or dark",
          icon: "🎨",
        },
        {
          title: "Texture Assessment",
          description: "Should be firm and slightly moist, not sticky or slimy",
          icon: "✋",
        },
        {
          title: "Marbling Check",
          description: "Look for natural fat distribution, not excessive fat",
          icon: "🔍",
        },
        {
          title: "Odor Test",
          description: "Fresh mutton has mild smell, not strong or sour",
          icon: "👃",
        },
        {
          title: "Photo Evidence",
          description: "Take clear photos showing color, texture, and marbling",
          icon: "📸",
        },
      ],
      tips: [
        "Fresh mutton should spring back when pressed",
        "Fat should be white or cream-colored, not yellow",
        "Keep refrigerated during testing",
      ],
      adulterants: ["Formalin", "Artificial colors", "Preservatives", "Meat glue"],
    },
    prawns: {
      name: "Prawn Freshness Test",
      description: "Detect preservatives and verify freshness of prawns",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Inspection",
          description: "Fresh prawns have translucent flesh with pinkish tint",
          icon: "👁️",
        },
        {
          title: "Shell Check",
          description: "Shells should be firm and attached, not loose or soft",
          icon: "🦐",
        },
        {
          title: "Smell Test",
          description: "Should have mild ocean smell, not ammonia or chemical",
          icon: "👃",
        },
        {
          title: "Texture Test",
          description: "Flesh should be firm and springy, not mushy or slimy",
          icon: "✋",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos showing color, texture, and shell condition",
          icon: "📸",
        },
      ],
      tips: [
        "Fresh prawns have bright, clear eyes",
        "Avoid prawns with black spots on shell or flesh",
        "Heads should be firmly attached to bodies",
      ],
      adulterants: ["Formalin", "Sodium benzoate", "Borax", "Artificial colors"],
    },
  },
}

export default function TestPage() {
  const { t } = useTranslation()
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
          <h1 className="text-2xl font-bold text-foreground mb-2">{t('test.not_found', 'Test Not Found')}</h1>
          <p className="text-muted-foreground mb-4">{t('test.does_not_exist', 'The requested test instructions do not exist.')}</p>
          <Link href="/home">
            <Button>{t('nav.back_to_home', 'Back to Home')}</Button>
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
              {t('test.overview', 'Test Overview')}
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
                  {t(`test.difficulty.${testData.difficulty.toLowerCase()}`, testData.difficulty)}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{t('test.common_adulterants', 'Common Adulterants')}:</h4>
                <div className="flex flex-wrap gap-1">
                  {testData.adulterants.map((adulterant) => (
                    <Badge key={adulterant} variant="outline" className="text-xs">
                      {t(`adulterants.${adulterant.toLowerCase().replace(/ /g, '_')}`, adulterant)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">{t('test.what_you_need', 'What You\'ll Need')}:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('test.sample_item', 'Sample of the food item')}</li>
                  <li>• {t('test.clean_water', 'Clean water')}</li>
                  <li>• {t('test.good_lighting', 'Good lighting')}</li>
                  <li>• {t('test.smartphone_camera', 'Your smartphone camera')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>{t('test.important', 'Important')}:</strong> {t('test.lighting_notice', 'Ensure good lighting when taking photos. The AI analysis depends on clear, well-lit images for accurate results.')}
          </AlertDescription>
        </Alert>

        {/* Test Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('test.step_instructions', 'Step-by-Step Instructions')}</CardTitle>
            <CardDescription>{t('test.follow_steps', 'Follow these steps carefully for accurate testing results')}</CardDescription>
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
                    <h4 className="font-medium text-foreground mb-1">{t(`test.steps.${categoryId}.${itemId}.${index}.title`, step.title)}</h4>
                    <p className="text-sm text-muted-foreground">{t(`test.steps.${categoryId}.${itemId}.${index}.description`, step.description)}</p>
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
              {t('test.pro_tips', 'Pro Tips')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {testData.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-blue-700">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                  <span>{t(`test.tips.${categoryId}.${itemId}.${index}`, tip)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('test.ready', 'Ready to Test?')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('test.completed_steps', 'Once you\'ve completed all the steps above, take a clear photo for AI analysis.')}
            </p>
            <Link href={`/upload/${categoryId}/${itemId}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Camera className="w-5 h-5 mr-2" />
                {t('test.take_photo', 'Take Photo & Analyze')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
