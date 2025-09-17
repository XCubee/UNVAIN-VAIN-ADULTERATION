"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Droplets, Wheat, Apple, Beef, Coffee, Milk, ChevronRight, Camera } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { useTranslation } from "@/lib/utils/translate"

const categories = [
  {
    id: "milk-dairy",
    nameKey: "home.milk_dairy",
    name: "Milk & Dairy",
    icon: Milk,
    descriptionKey: "home.milk_dairy_desc",
    description: "Test milk, cheese, yogurt",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    items: ["Milk", "Cheese", "Yogurt", "Butter"],
  },
  {
    id: "spices",
    nameKey: "home.spices",
    name: "Spices",
    icon: Coffee,
    descriptionKey: "home.spices_desc",
    description: "Verify spice purity",
    color: "bg-orange-50 text-orange-600 border-orange-200",
    items: ["Turmeric", "Chili Powder", "Cumin", "Coriander"],
  },
  {
    id: "pulses",
    nameKey: "home.pulses",
    name: "Pulses",
    icon: Wheat,
    descriptionKey: "home.pulses_desc",
    description: "Check dal and lentils",
    color: "bg-green-50 text-green-600 border-green-200",
    items: ["Toor Dal", "Masoor Dal", "Chana Dal", "Moong Dal"],
  },
  {
    id: "honey",
    nameKey: "home.honey",
    name: "Honey",
    icon: Droplets,
    descriptionKey: "home.honey_desc",
    description: "Detect honey adulteration",
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    items: ["Raw Honey", "Processed Honey", "Organic Honey"],
  },
  {
    id: "vegetables",
    nameKey: "home.vegetables",
    name: "Vegetables & Fruits",
    icon: Apple,
    descriptionKey: "home.vegetables_desc",
    description: "Check for chemicals",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    items: ["Apples", "Tomatoes", "Leafy Greens", "Berries"],
  },
  {
    id: "meat",
    nameKey: "home.meat_fish",
    name: "Meat & Fish",
    icon: Beef,
    descriptionKey: "home.meat_fish_desc",
    description: "Verify freshness",
    color: "bg-red-50 text-red-600 border-red-200",
    items: ["Chicken", "Fish", "Mutton", "Prawns"],
  },
]

export default function HomePage() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Quick Action */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">{t('home.quick_test', 'Quick Test')}</h2>
                <p className="text-muted-foreground mb-4">{t('home.quick_test_desc', 'Take a photo and get instant purity results')}</p>
              </div>
              <div className="hidden sm:block">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
            <Button className="w-full">
              {t('home.start_quick_test', 'Start Quick Test')}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{t('home.categories')}</h2>
            <Badge variant="secondary" className="text-xs">
              {categories.length} {t('home.categories')} {t('app.available', 'Available')}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardTitle className="text-lg">{t(category.nameKey, category.name)}</CardTitle>
                      <CardDescription>{t(category.descriptionKey, category.description)}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {category.items.slice(0, 3).map((item) => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {t(`home.items.${item.toLowerCase().replace(/ /g, '_')}`, item)}
                          </Badge>
                        ))}
                        {category.items.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.items.length - 3} {t('home.more', 'more')}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('home.recent_tests')}
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  {t('home.view_all')}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{t('home.no_tests')}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t('home.start_testing', 'Start testing your food items to see results here')}</p>
              <p className="text-2xl font-bold text-primary mb-4">0</p>
              <Link href="/category/milk-dairy">
                <Button className="bg-primary hover:bg-primary/90">
                  <Camera className="w-4 h-4 mr-2" />
                  {t('home.start_first_test', 'Start Your First Test')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
