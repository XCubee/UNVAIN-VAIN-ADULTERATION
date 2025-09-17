"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight, Info } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "@/lib/i18n/client"

const categoryData = {
  "milk-dairy": {
    name: "Milk & Dairy",
    description: "Test various dairy products for purity and adulteration",
    items: [
      {
        id: "milk",
        name: "Milk",
        description: "Fresh cow, buffalo, or goat milk",
        commonAdulterants: ["Water", "Starch", "Urea", "Detergent"],
        testTime: "5-10 minutes",
      },
      {
        id: "cheese",
        name: "Cheese",
        description: "Hard and soft cheese varieties",
        commonAdulterants: ["Artificial colors", "Preservatives", "Fillers"],
        testTime: "3-5 minutes",
      },
      {
        id: "yogurt",
        name: "Yogurt",
        description: "Plain and flavored yogurt",
        commonAdulterants: ["Artificial flavors", "Thickeners", "Preservatives"],
        testTime: "5-8 minutes",
      },
      {
        id: "butter",
        name: "Butter",
        description: "Salted and unsalted butter",
        commonAdulterants: ["Margarine", "Vegetable oils", "Artificial colors"],
        testTime: "3-7 minutes",
      },
    ],
  },
  pulses: {
    name: "Pulses",
    description: "Verify the purity of various lentils and pulses",
    items: [
      {
        id: "toor-dal",
        name: "Toor Dal (Arhar)",
        description: "Yellow split pigeon peas",
        commonAdulterants: ["Artificial colors", "Kesari dal", "Starch"],
        testTime: "10-15 minutes",
      },
      {
        id: "masoor-dal",
        name: "Masoor Dal (Red Lentil)",
        description: "Red split lentils",
        commonAdulterants: ["Artificial colors", "Brick powder", "Sand"],
        testTime: "8-12 minutes",
      },
      {
        id: "chana-dal",
        name: "Chana Dal",
        description: "Split chickpeas",
        commonAdulterants: ["Artificial colors", "Kesari dal", "Metanil yellow"],
        testTime: "10-15 minutes",
      },
      {
        id: "moong-dal",
        name: "Moong Dal",
        description: "Split green gram",
        commonAdulterants: ["Artificial colors", "Kesari dal", "Lead chromate"],
        testTime: "8-10 minutes",
      },
    ],
  },
  spices: {
    name: "Spices",
    description: "Check spice powders and whole spices for adulteration",
    items: [
      {
        id: "turmeric",
        name: "Turmeric Powder",
        description: "Ground turmeric powder",
        commonAdulterants: ["Lead chromate", "Metanil yellow", "Chalk powder"],
        testTime: "5-8 minutes",
      },
      {
        id: "chili-powder",
        name: "Chili Powder",
        description: "Red chili powder",
        commonAdulterants: ["Brick powder", "Artificial colors", "Salt"],
        testTime: "5-10 minutes",
      },
      {
        id: "cumin",
        name: "Cumin Powder",
        description: "Ground cumin seeds",
        commonAdulterants: ["Roasted gram flour", "Common salt", "Sawdust"],
        testTime: "3-5 minutes",
      },
      {
        id: "coriander",
        name: "Coriander Powder",
        description: "Ground coriander seeds",
        commonAdulterants: ["Rice flour", "Starch", "Chalk powder"],
        testTime: "5-7 minutes",
      },
    ],
  },
  honey: {
    name: "Honey",
    description: "Detect adulteration in different types of honey",
    items: [
      {
        id: "raw-honey",
        name: "Raw Honey",
        description: "Unprocessed natural honey",
        commonAdulterants: ["Sugar syrup", "Corn syrup", "Artificial flavors"],
        testTime: "10-15 minutes",
      },
      {
        id: "processed-honey",
        name: "Processed Honey",
        description: "Commercially processed honey",
        commonAdulterants: ["High fructose corn syrup", "Invert sugar", "Water"],
        testTime: "8-12 minutes",
      },
      {
        id: "organic-honey",
        name: "Organic Honey",
        description: "Certified organic honey",
        commonAdulterants: ["Conventional honey", "Sugar additives", "Preservatives"],
        testTime: "12-18 minutes",
      },
    ],
  },
  vegetables: {
    name: "Vegetables & Fruits",
    description: "Check for chemical residues and artificial treatments",
    items: [
      {
        id: "apples",
        name: "Apples",
        description: "Fresh apples",
        commonAdulterants: ["Wax coating", "Pesticide residues", "Artificial colors"],
        testTime: "5-8 minutes",
      },
      {
        id: "tomatoes",
        name: "Tomatoes",
        description: "Fresh tomatoes",
        commonAdulterants: ["Artificial ripening agents", "Pesticides", "Wax"],
        testTime: "3-5 minutes",
      },
      {
        id: "leafy-greens",
        name: "Leafy Greens",
        description: "Spinach, lettuce, etc.",
        commonAdulterants: ["Pesticide residues", "Chemical fertilizers", "Preservatives"],
        testTime: "5-10 minutes",
      },
      {
        id: "berries",
        name: "Berries",
        description: "Strawberries, blueberries, etc.",
        commonAdulterants: ["Pesticide residues", "Artificial colors", "Preservatives"],
        testTime: "3-7 minutes",
      },
    ],
  },
  meat: {
    name: "Meat & Fish",
    description: "Verify freshness and detect harmful additives",
    items: [
      {
        id: "chicken",
        name: "Chicken",
        description: "Fresh chicken meat",
        commonAdulterants: ["Formalin", "Artificial colors", "Growth hormones"],
        testTime: "8-12 minutes",
      },
      {
        id: "fish",
        name: "Fish",
        description: "Fresh fish",
        commonAdulterants: ["Formalin", "Ammonia", "Artificial preservatives"],
        testTime: "5-10 minutes",
      },
      {
        id: "mutton",
        name: "Mutton",
        description: "Fresh mutton/lamb",
        commonAdulterants: ["Artificial colors", "Preservatives", "Tenderizers"],
        testTime: "10-15 minutes",
      },
      {
        id: "prawns",
        name: "Prawns",
        description: "Fresh prawns/shrimp",
        commonAdulterants: ["Formalin", "Borax", "Artificial preservatives"],
        testTime: "5-8 minutes",
      },
    ],
  },
}

export default function CategoryPage() {
  const { t } = useTranslation()
  const params = useParams()
  const categoryId = params.id as string
  const category = categoryData[categoryId as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t('category.not_found', 'Category Not Found')}</h1>
          <p className="text-muted-foreground mb-4">{t('category.does_not_exist', 'The requested category does not exist.')}</p>
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
            <Link href="/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t(`home.${categoryId}`, category.name)}</h1>
              <p className="text-sm text-muted-foreground">{t(`home.${categoryId}_desc`, category.description)}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Info Card */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">{t('category.testing_instructions', 'Testing Instructions')}</p>
                <p className="text-sm text-blue-700">
                  {t('category.select_item_instructions', 'Select an item below to view detailed testing instructions. Ensure you have good lighting and a clean surface for accurate results.')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.items.map((item) => (
            <Link key={item.id} href={`/test/${categoryId}/${item.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{t(`items.${item.id}.name`, item.name)}</CardTitle>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardDescription>{t(`items.${item.id}.description`, item.description)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">{t('category.common_adulterants', 'Common Adulterants')}:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.commonAdulterants.slice(0, 3).map((adulterant) => (
                        <Badge key={adulterant} variant="outline" className="text-xs">
                          {t(`adulterants.${adulterant.toLowerCase().replace(/ /g, '_')}`, adulterant)}
                        </Badge>
                      ))}
                      {item.commonAdulterants.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.commonAdulterants.length - 3} {t('category.more', 'more')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('category.test_duration', 'Test Duration')}:</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.testTime}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t('category.need_help', 'Need Help?')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('category.help_description', 'Watch our tutorial videos or contact our support team for assistance with testing procedures.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" className="bg-transparent">
                {t('category.watch_tutorials', 'Watch Tutorials')}
              </Button>
              <Button variant="outline" className="bg-transparent">
                {t('category.contact_support', 'Contact Support')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
