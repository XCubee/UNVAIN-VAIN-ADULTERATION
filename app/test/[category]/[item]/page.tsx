"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, Clock, Lightbulb, AlertTriangle, Upload, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useRef } from "react"
import Image from "next/image"

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
      description: "Check yogurt for additives and artificial ingredients",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Examination",
          description: "Check for smooth, consistent texture without separation",
          icon: "👁️",
        },
        {
          title: "Consistency Test",
          description: "Tilt spoon - natural yogurt should be thick and not watery",
          icon: "🥄",
        },
        {
          title: "Smell Check",
          description: "Should have mild sour aroma without chemical smell",
          icon: "👃",
        },
        {
          title: "Taste Test (Optional)",
          description: "Natural yogurt has balanced sourness, not overly sweet",
          icon: "👅",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of yogurt texture and consistency",
          icon: "📸",
        },
      ],
      tips: [
        "Test at refrigerated temperature",
        "Check for ingredient list - fewer ingredients is better",
        "Natural yogurt may have whey separation which is normal",
      ],
      adulterants: ["Artificial thickeners", "Excessive preservatives", "Synthetic flavors", "Artificial sweeteners"],
    },
    butter: {
      name: "Butter Purity Test",
      description: "Verify butter authenticity and detect substitutes",
      duration: "3-7 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Inspection",
          description: "Check for uniform color and smooth texture",
          icon: "👁️",
        },
        {
          title: "Melt Test",
          description: "Pure butter melts evenly without separation or foaming",
          icon: "🔥",
        },
        {
          title: "Water Droplet Test",
          description: "Drop water on butter - should not mix easily if pure",
          icon: "💧",
        },
        {
          title: "Aroma Check",
          description: "Should have natural dairy smell, not chemical or rancid",
          icon: "👃",
        },
        {
          title: "Photo Capture",
          description: "Take photos of butter sample before and after melt test",
          icon: "📸",
        },
      ],
      tips: [
        "Test at room temperature for best results",
        "Pure butter has a rich yellow color from natural carotene",
        "Avoid testing near strong odors that may affect smell test",
      ],
      adulterants: ["Margarine", "Vegetable oils", "Artificial colors", "Hydrogenated fats"],
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
    "moong-dal": {
      name: "Moong Dal Purity Test",
      description: "Verify the quality of green gram split",
      duration: "8-10 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Sample Collection",
          description: "Take 2-3 tablespoons of moong dal in a clean white bowl",
          icon: "🥄",
        },
        {
          title: "Visual Examination",
          description: "Check for uniform pale yellow color and consistent size",
          icon: "👁️",
        },
        {
          title: "Float Test",
          description: "Put a few grains in water - pure moong dal will sink",
          icon: "💧",
        },
        {
          title: "Color Leaching Test",
          description: "Soak in warm water for 5 minutes - water should remain clear",
          icon: "🌡️",
        },
        {
          title: "Photo Capture",
          description: "Take clear photos of dry dal and after soaking test",
          icon: "📸",
        },
      ],
      tips: [
        "Pure moong dal has a natural pale yellow color",
        "Artificially colored dal will release color in water quickly",
        "Check for uniform texture and no foreign particles",
      ],
      adulterants: ["Artificial colors", "Metanil yellow", "Malachite green", "Lead chromate"],
    },
    "chana-dal": {
      name: "Chana Dal Purity Test",
      description: "Verify chana dal for quality and artificial additives",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Inspection",
          description: "Check for uniform golden-yellow color without excessive shine",
          icon: "👁️",
        },
        {
          title: "Water Soak Test",
          description: "Soak in water - artificial colors will leach out, coloring the water",
          icon: "💧",
        },
        {
          title: "Texture Test",
          description: "Feel between fingers - should be firm and not powdery on surface",
          icon: "✋",
        },
        {
          title: "Size Uniformity",
          description: "Check for consistent size and split pattern",
          icon: "🔍",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of dal sample before and after water test",
          icon: "📸",
        },
      ],
      tips: [
        "Natural chana dal has a mild nutty aroma",
        "Use white plate for better color assessment",
        "Good quality chana dal absorbs water slowly",
      ],
      adulterants: ["Metanil yellow", "Lead chromate", "Coating powder", "Artificial colors"],
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
    "chili-powder": {
      name: "Chili Powder Authenticity Test",
      description: "Check chili powder for artificial colors and additives",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Examination",
          description: "Check for consistent deep red color without bright artificial tones",
          icon: "👁️",
        },
        {
          title: "Water Test",
          description: "Add to water - artificial colors will quickly create bright red streaks",
          icon: "💧",
        },
        {
          title: "Oil Float Test",
          description: "Sprinkle on water surface - pure powder sinks, sawdust floats",
          icon: "🛢️",
        },
        {
          title: "Aroma Check",
          description: "Should have pungent, spicy smell without chemical odors",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of powder and water test results",
          icon: "📸",
        },
      ],
      tips: [
        "Use white plate or paper for visual inspection",
        "Pure chili powder burns the nose slightly when smelled",
        "Store in cool, dark place to maintain quality",
      ],
      adulterants: ["Sudan red dye", "Brick powder", "Artificial colors", "Sawdust", "Starch"],
    },
    cumin: {
      name: "Cumin Seed Purity Test",
      description: "Verify authenticity of cumin seeds or powder",
      duration: "4-6 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Check",
          description: "Seeds should be uniform brownish color with ridges; powder should be tan",
          icon: "👁️",
        },
        {
          title: "Float Test",
          description: "Place in water - pure cumin sinks while adulterants often float",
          icon: "💧",
        },
        {
          title: "Aroma Test",
          description: "Should have strong, distinctive earthy-sweet aroma",
          icon: "👃",
        },
        {
          title: "Hand Rub Test",
          description: "Rub between palms - should release aromatic oils and fragrance",
          icon: "✋",
        },
        {
          title: "Photo Capture",
          description: "Take clear photos of cumin sample and test results",
          icon: "📸",
        },
      ],
      tips: [
        "Examine in natural light for best color assessment",
        "Pure cumin has a slightly bitter aftertaste",
        "Store in airtight container to preserve aroma",
      ],
      adulterants: ["Grass seeds", "Charcoal powder", "Dirt", "Stone powder", "Papaya seeds"],
    },
    coriander: {
      name: "Coriander Seed Quality Test",
      description: "Test coriander seeds or powder for purity",
      duration: "4-7 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Inspection",
          description: "Seeds should be round, yellowish-brown; powder should be light brown",
          icon: "👁️",
        },
        {
          title: "Water Test",
          description: "Add to water - pure coriander sinks, adulterants may float",
          icon: "💧",
        },
        {
          title: "Aroma Check",
          description: "Should have citrusy, slightly sweet aroma without musty smell",
          icon: "👃",
        },
        {
          title: "Crush Test",
          description: "Crush seeds - should release fragrant aroma and oils",
          icon: "👊",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of coriander sample and test results",
          icon: "📸",
        },
      ],
      tips: [
        "Check for uniform size and shape in seeds",
        "Pure coriander powder has a pale tan color, not dark brown",
        "Store in cool, dry place to maintain freshness",
      ],
      adulterants: ["Sand", "Dirt", "Sawdust", "Starch", "Dung powder"],
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
    "processed-honey": {
      name: "Processed Honey Quality Test",
      description: "Test commercial processed honey for adulterants",
      duration: "5-8 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Check",
          description: "Look for uniform color and consistency without separation",
          icon: "👁️",
        },
        {
          title: "Paper Test",
          description: "Drop on paper - pure honey doesn't get absorbed quickly",
          icon: "📄",
        },
        {
          title: "Thumb Test",
          description: "Press between fingers - pure honey doesn't spread easily",
          icon: "👍",
        },
        {
          title: "Dissolution Test",
          description: "Mix with water - pure honey forms lumps before dissolving",
          icon: "💧",
        },
        {
          title: "Photo Capture",
          description: "Take clear photos of honey sample and test results",
          icon: "📸",
        },
      ],
      tips: [
        "Processed honey may be lighter in color than raw honey",
        "Check label for added ingredients like glucose or fructose",
        "Store away from direct sunlight for testing",
      ],
      adulterants: ["High fructose corn syrup", "Invert sugar", "Rice syrup", "Excessive water"],
    },
    "organic-honey": {
      name: "Organic Honey Verification Test",
      description: "Verify the authenticity of organic honey claims",
      duration: "6-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Label Inspection",
          description: "Check for proper organic certification logos and details",
          icon: "🏷️",
        },
        {
          title: "Viscosity Test",
          description: "Tilt container - organic honey flows slowly with high viscosity",
          icon: "⏱️",
        },
        {
          title: "Aroma Check",
          description: "Should have natural floral or herbal aroma without chemical smell",
          icon: "👃",
        },
        {
          title: "Crystallization Pattern",
          description: "Natural crystallization starts from bottom, not throughout",
          icon: "❄️",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of honey, label, and test results",
          icon: "📸",
        },
      ],
      tips: [
        "Organic honey varies in color based on flower source",
        "Real organic honey may contain small amounts of pollen or wax",
        "Taste should be complex with distinct floral notes",
      ],
      adulterants: ["Non-organic honey", "Sugar syrup", "Corn syrup", "Artificial sweeteners"],
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
    tomatoes: {
      name: "Tomato Ripening Agent Test",
      description: "Check tomatoes for artificial ripening agents and chemicals",
      duration: "4-7 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Check",
          description: "Look for uniform red color without green patches near stem",
          icon: "👁️",
        },
        {
          title: "Firmness Test",
          description: "Naturally ripened tomatoes have consistent firmness",
          icon: "✋",
        },
        {
          title: "Float Test",
          description: "Place in water - artificially ripened often float",
          icon: "💧",
        },
        {
          title: "Cut Test",
          description: "Cut open - artificially ripened may be hollow or pale inside",
          icon: "✂️",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of tomato exterior and interior",
          icon: "📸",
        },
      ],
      tips: [
        "Naturally ripened tomatoes have slight variations in color",
        "Check for unusual white powder residue on skin",
        "Naturally ripened tomatoes have stronger aroma",
      ],
      adulterants: ["Calcium carbide", "Ethylene gas", "Oxytocin", "Artificial colors"],
    },
    "leafy-greens": {
      name: "Leafy Greens Pesticide Test",
      description: "Check leafy vegetables for pesticide residue and freshness",
      duration: "5-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Visual Inspection",
          description: "Check for unnaturally bright color or waxy coating",
          icon: "👁️",
        },
        {
          title: "Water Soak Test",
          description: "Soak in salt water - pesticides may create foam or residue",
          icon: "💧",
        },
        {
          title: "Stem Check",
          description: "Examine stems - should be crisp and not artificially colored",
          icon: "🌱",
        },
        {
          title: "Texture Test",
          description: "Leaves should be crisp, not limp or artificially stiff",
          icon: "✋",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos before and after water test",
          icon: "📸",
        },
      ],
      tips: [
        "Organic greens may have small holes from insects",
        "Use lukewarm water with salt for soaking test",
        "Check for unusual chemical smell",
      ],
      adulterants: ["Pesticide residue", "Chemical preservatives", "Artificial colors", "Growth hormones"],
    },
    berries: {
      name: "Berry Freshness and Additive Test",
      description: "Test berries for artificial preservatives and freshness",
      duration: "4-6 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Examination",
          description: "Check for uniform color without white powdery residue",
          icon: "👁️",
        },
        {
          title: "Water Rinse Test",
          description: "Rinse in water - preservatives may create unusual foam",
          icon: "💧",
        },
        {
          title: "Crush Test",
          description: "Crush a berry - should have natural juice and seeds",
          icon: "👊",
        },
        {
          title: "Smell Check",
          description: "Should have natural fruity aroma without chemical smell",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of berries before and after tests",
          icon: "📸",
        },
      ],
      tips: [
        "Fresh berries have slight variations in size and color",
        "Naturally grown berries may have small imperfections",
        "Check for mold especially in container bottoms",
      ],
      adulterants: ["Preservatives", "Fungicides", "Artificial colors", "Wax coatings"],
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
      name: "Fish Freshness and Preservative Test",
      description: "Check fish for freshness and chemical preservatives",
      duration: "5-10 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Eye Examination",
          description: "Fresh fish has clear, bulging eyes; old fish has sunken, cloudy eyes",
          icon: "👁️",
        },
        {
          title: "Gill Check",
          description: "Fresh fish has bright red gills; treated fish may have artificial red",
          icon: "🔍",
        },
        {
          title: "Texture Test",
          description: "Press flesh - should spring back, not leave indentation",
          icon: "✋",
        },
        {
          title: "Smell Assessment",
          description: "Fresh fish has mild ocean smell; chemical smell indicates preservatives",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of fish eyes, gills, and flesh",
          icon: "📸",
        },
      ],
      tips: [
        "Fresh fish should have firm, shiny skin",
        "Scales should be intact and firmly attached",
        "Avoid fish with excessive slime or sticky residue",
      ],
      adulterants: ["Formalin", "Ammonia compounds", "Sodium benzoate", "Artificial colors"],
    },
    mutton: {
      name: "Mutton Quality and Freshness Test",
      description: "Verify freshness and detect adulterants in mutton",
      duration: "5-8 minutes",
      difficulty: "Medium",
      steps: [
        {
          title: "Visual Check",
          description: "Fresh mutton is bright red; old meat is dark or brown",
          icon: "👁️",
        },
        {
          title: "Finger Press Test",
          description: "Press meat - fresh mutton regains shape quickly",
          icon: "✋",
        },
        {
          title: "Fat Examination",
          description: "Mutton fat should be firm, white; not yellow or soft",
          icon: "🔍",
        },
        {
          title: "Smell Test",
          description: "Fresh mutton has mild smell; strong odor indicates spoilage",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of meat color, texture, and fat",
          icon: "📸",
        },
      ],
      tips: [
        "Fresh mutton should not be excessively wet or dry",
        "Check for unusual bright red color which may indicate treatment",
        "Meat should not have slimy texture or sticky residue",
      ],
      adulterants: ["Meat glue (transglutaminase)", "Formalin", "Artificial colors", "Nitrates"],
    },
    prawns: {
      name: "Prawn Freshness and Chemical Test",
      description: "Test prawns for freshness and chemical preservatives",
      duration: "4-7 minutes",
      difficulty: "Easy",
      steps: [
        {
          title: "Visual Inspection",
          description: "Fresh prawns have translucent appearance; not opaque or yellow",
          icon: "👁️",
        },
        {
          title: "Shell Check",
          description: "Shells should be firmly attached; not loose or slipping off",
          icon: "🦐",
        },
        {
          title: "Head-Body Connection",
          description: "Head should be firmly attached to body in fresh prawns",
          icon: "🔍",
        },
        {
          title: "Smell Assessment",
          description: "Fresh prawns have mild ocean smell; ammonia smell indicates spoilage",
          icon: "👃",
        },
        {
          title: "Photo Documentation",
          description: "Take clear photos of prawns showing color and condition",
          icon: "📸",
        },
      ],
      tips: [
        "Fresh prawns curl naturally in C-shape",
        "Avoid prawns with black spots on shell or flesh",
        "Flesh should be firm and not mushy when touched",
      ],
      adulterants: ["Sodium metabisulfite", "Formalin", "Borax", "Artificial colors"],
    },
  },
}

export default function TestInstructionPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.category as string
  const itemId = params.item as string
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const testData =
    testInstructions[categoryId as keyof typeof testInstructions]?.[itemId as keyof (typeof testInstructions)[keyof typeof testInstructions]]

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

  const retakePhoto = () => {
    setSelectedImage(null)
    setSelectedFile(null)
  }

  const proceedToAnalysis = () => {
    if (selectedImage && selectedFile) {
      router.push(`/upload/${categoryId}/${itemId}`)
    }
  }

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

        {/* Image Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Set Test Image</CardTitle>
            <CardDescription>Take or upload a photo of your {itemId.replace(/-/g, ' ')} sample</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
              capture="environment"
            />
            
            {!selectedImage ? (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/50">
                <div className="mb-4 text-muted-foreground">
                  <Camera className="w-12 h-12 mx-auto mb-2" />
                  <p>No image selected</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleCameraCapture} className="bg-primary hover:bg-primary/90">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md h-64 mb-4 rounded-lg overflow-hidden">
                  <Image 
                    src={selectedImage} 
                    alt="Selected food sample" 
                    fill 
                    style={{ objectFit: 'contain' }} 
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={retakePhoto}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Photo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Button */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Test?</h3>
            <p className="text-muted-foreground mb-4">
              Once you've completed all the steps above and taken a photo, proceed to analysis.
            </p>
            {selectedImage ? (
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={proceedToAnalysis}
              >
                <Camera className="w-5 h-5 mr-2" />
                Analyze Sample
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-primary/50 hover:bg-primary/60"
                disabled
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo First
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
