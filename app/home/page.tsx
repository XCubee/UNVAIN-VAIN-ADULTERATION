"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Wheat, Apple, Beef, Coffee, Milk, ChevronRight, Camera, History, User } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "milk-dairy",
    name: "Milk & Dairy",
    icon: Milk,
    description: "Test milk, cheese, yogurt",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    items: ["Milk", "Cheese", "Yogurt", "Butter"],
  },
  {
    id: "spices",
    name: "Spices",
    icon: Coffee,
    description: "Verify spice purity",
    color: "bg-orange-50 text-orange-600 border-orange-200",
    items: ["Turmeric", "Chili Powder", "Cumin", "Coriander"],
  },
  {
    id: "pulses",
    name: "Pulses",
    icon: Wheat,
    description: "Check dal and lentils",
    color: "bg-green-50 text-green-600 border-green-200",
    items: ["Toor Dal", "Masoor Dal", "Chana Dal", "Moong Dal"],
  },
  {
    id: "honey",
    name: "Honey",
    icon: Droplets,
    description: "Detect honey adulteration",
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    items: ["Raw Honey", "Processed Honey", "Organic Honey"],
  },
  {
    id: "vegetables",
    name: "Vegetables & Fruits",
    icon: Apple,
    description: "Check for chemicals",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    items: ["Apples", "Tomatoes", "Leafy Greens", "Berries"],
  },
  {
    id: "meat",
    name: "Meat & Fish",
    icon: Beef,
    description: "Verify freshness",
    color: "bg-red-50 text-red-600 border-red-200",
    items: ["Chicken", "Fish", "Mutton", "Prawns"],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Purity Lens</h1>
              <p className="text-sm text-muted-foreground">Welcome back!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/history">
                <Button variant="ghost" size="icon">
                  <History className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Quick Action */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Quick Test</h2>
                <p className="text-muted-foreground mb-4">Take a photo and get instant purity results</p>
              </div>
              <div className="hidden sm:block">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Food Categories</h2>
            <Badge variant="secondary" className="text-xs">
              6 Categories Available
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
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {category.items.slice(0, 3).map((item) => (
                          <Badge key={item} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {category.items.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.items.length - 3} more
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
              Recent Tests
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  View All
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
              <h3 className="text-lg font-medium text-foreground mb-2">No Recent Tests</h3>
              <p className="text-muted-foreground text-sm mb-4">Start testing your food items to see results here</p>
              <p className="text-2xl font-bold text-primary mb-4">0</p>
              <Link href="/category/milk-dairy">
                <Button className="bg-primary hover:bg-primary/90">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Your First Test
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
