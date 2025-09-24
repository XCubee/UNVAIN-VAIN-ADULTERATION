import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safety score calculation for food items
export function calculateSafetyScore(category: string, item: string, imageData?: string): {
  score: number;
  status: "pure" | "adulterated" | "inconclusive";
  confidence: number;
  details: string;
  adulterants: string[];
  recommendations: string[];
} {
  // For demo purposes, generate consistent but seemingly random scores based on category and item
  const hash = stringToHash(category + item + (imageData?.substring(0, 20) || ""));
  
  // Generate a score between 0-100
  const baseScore = (hash % 60) + 40; // Score between 40-99
  
  // Determine status based on score
  let status: "pure" | "adulterated" | "inconclusive";
  let adulterants: string[] = [];
  let recommendations: string[] = [];
  let details = "";
  
  if (baseScore >= 85) {
    status = "pure";
    details = "This sample appears to be pure with no significant signs of adulteration.";
    recommendations = [
      "Store properly in a cool, dry place",
      "Consume within recommended timeframe",
      "Continue purchasing from trusted sources"
    ];
  } else if (baseScore >= 60) {
    status = "inconclusive";
    details = "Some minor irregularities detected, but not conclusive evidence of adulteration.";
    adulterants = getRandomAdulterants(category, item, 1);
    recommendations = [
      "Consider washing thoroughly before consumption",
      "Monitor for any unusual taste or reactions",
      "Try purchasing from alternative sources"
    ];
  } else {
    status = "adulterated";
    details = "Analysis indicates potential adulteration in this sample.";
    adulterants = getRandomAdulterants(category, item, 2);
    recommendations = [
      "Not recommended for consumption",
      "Return to vendor if possible",
      "Report to local food safety authorities"
    ];
  }
  
  // For vegetables and fruits, add specific details
  if (category === "vegetables") {
    if (status === "pure") {
      details += " The color, texture, and surface appearance indicate natural growing conditions.";
    } else if (status === "adulterated") {
      details += " Detected signs of artificial ripening agents or surface treatments.";
    }
    
    // Add specific recommendations for vegetables
    recommendations.push("Wash thoroughly with baking soda solution to remove residues");
  }
  
  return {
    score: baseScore,
    status,
    confidence: Math.min(98, baseScore + (hash % 10)),
    details,
    adulterants,
    recommendations
  };
}

// Helper function to generate a numeric hash from a string
function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Helper function to get random adulterants based on category and item
function getRandomAdulterants(category: string, item: string, count: number): string[] {
  const adulterantsMap: Record<string, Record<string, string[]>> = {
    vegetables: {
      apples: ["Wax coating", "Pesticide residues", "Artificial colors"],
      tomatoes: ["Artificial ripening agents", "Pesticides", "Wax"],
      "leafy-greens": ["Pesticide residues", "Chemical fertilizers", "Preservatives"],
      berries: ["Pesticide residues", "Artificial colors", "Preservatives"]
    },
    "milk-dairy": {
      milk: ["Water", "Starch", "Urea", "Detergent"],
      cheese: ["Artificial colors", "Preservatives", "Fillers"],
      yogurt: ["Artificial sweeteners", "Preservatives", "Thickeners"],
      butter: ["Vegetable oils", "Artificial colors", "Preservatives"]
    },
    honey: {
      "raw-honey": ["Sugar syrup", "Corn syrup", "Artificial sweeteners"],
      "processed-honey": ["High fructose corn syrup", "Inverted sugar", "Water"],
      "organic-honey": ["Non-organic honey", "Sugar syrup", "Artificial sweeteners"]
    }
  };
  
  const availableAdulterants = adulterantsMap[category]?.[item] || [
    "Unknown adulterant",
    "Chemical additives",
    "Artificial enhancers",
    "Preservatives"
  ];
  
  // Select random adulterants from the available list
  const hash = stringToHash(category + item);
  const selected: string[] = [];
  
  for (let i = 0; i < count && i < availableAdulterants.length; i++) {
    const index = (hash + i) % availableAdulterants.length;
    selected.push(availableAdulterants[index]);
  }
  
  return selected;
}
