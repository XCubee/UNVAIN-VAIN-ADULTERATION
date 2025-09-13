"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Search,
  Download,
  Share,
  Calendar,
  Milk,
  Coffee,
  Wheat,
  Droplets,
  Apple,
  Beef,
  MoreVertical,
  Eye,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for testing history
const mockReports = [
  {
    id: "1",
    itemName: "Milk",
    category: "Milk & Dairy",
    categoryId: "milk-dairy",
    itemId: "milk",
    status: "pure",
    confidence: 94,
    date: "2024-01-15T10:30:00Z",
    icon: Milk,
    color: "text-blue-600",
    adulterants: [],
  },
  {
    id: "2",
    itemName: "Turmeric Powder",
    category: "Spices",
    categoryId: "spices",
    itemId: "turmeric",
    status: "adulterated",
    confidence: 87,
    date: "2024-01-14T15:45:00Z",
    icon: Coffee,
    color: "text-orange-600",
    adulterants: ["Lead chromate", "Metanil yellow"],
  },
  {
    id: "3",
    itemName: "Toor Dal",
    category: "Pulses",
    categoryId: "pulses",
    itemId: "toor-dal",
    status: "pure",
    confidence: 91,
    date: "2024-01-13T09:15:00Z",
    icon: Wheat,
    color: "text-green-600",
    adulterants: [],
  },
  {
    id: "4",
    itemName: "Raw Honey",
    category: "Honey",
    categoryId: "honey",
    itemId: "raw-honey",
    status: "inconclusive",
    confidence: 65,
    date: "2024-01-12T14:20:00Z",
    icon: Droplets,
    color: "text-yellow-600",
    adulterants: [],
  },
  {
    id: "5",
    itemName: "Apples",
    category: "Vegetables & Fruits",
    categoryId: "vegetables",
    itemId: "apples",
    status: "pure",
    confidence: 89,
    date: "2024-01-11T11:00:00Z",
    icon: Apple,
    color: "text-emerald-600",
    adulterants: [],
  },
  {
    id: "6",
    itemName: "Chicken",
    category: "Meat & Fish",
    categoryId: "meat",
    itemId: "chicken",
    status: "adulterated",
    confidence: 82,
    date: "2024-01-10T16:30:00Z",
    icon: Beef,
    color: "text-red-600",
    adulterants: ["Formalin", "Artificial colors"],
  },
  {
    id: "7",
    itemName: "Masoor Dal",
    category: "Pulses",
    categoryId: "pulses",
    itemId: "masoor-dal",
    status: "pure",
    confidence: 93,
    date: "2024-01-09T08:45:00Z",
    icon: Wheat,
    color: "text-green-600",
    adulterants: [],
  },
  {
    id: "8",
    itemName: "Chili Powder",
    category: "Spices",
    categoryId: "spices",
    itemId: "chili-powder",
    status: "adulterated",
    confidence: 88,
    date: "2024-01-08T13:15:00Z",
    icon: Coffee,
    color: "text-orange-600",
    adulterants: ["Brick powder", "Artificial colors"],
  },
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesCategory = categoryFilter === "all" || report.categoryId === categoryFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pure" && report.status === "pure") ||
      (activeTab === "adulterated" && report.status === "adulterated") ||
      (activeTab === "inconclusive" && report.status === "inconclusive")

    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pure":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pure</Badge>
      case "adulterated":
        return <Badge variant="destructive">Adulterated</Badge>
      case "inconclusive":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Inconclusive</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const exportReports = () => {
    // In a real app, this would generate and download a PDF/CSV
    alert("Export functionality would generate a PDF/CSV file")
  }

  const deleteReport = (reportId: string) => {
    // In a real app, this would delete from database
    alert(`Delete report ${reportId}`)
  }

  const viewReport = (report: any) => {
    // In a real app, this would navigate to detailed report view
    alert(`View detailed report for ${report.itemName}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/home">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">Test History</h1>
                <p className="text-sm text-muted-foreground">View and manage your food purity test reports</p>
              </div>
            </div>
            <Button onClick={exportReports} variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold text-foreground">{mockReports.length}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pure Items</p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockReports.filter((r) => r.status === "pure").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Badge className="w-5 h-5 bg-green-600 hover:bg-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Adulterated</p>
                  <p className="text-2xl font-bold text-red-600">
                    {mockReports.filter((r) => r.status === "adulterated").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Badge className="w-5 h-5 bg-red-600 hover:bg-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(mockReports.reduce((acc, r) => acc + r.confidence, 0) / mockReports.length)}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Badge className="w-5 h-5 bg-blue-600 hover:bg-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by item name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-border"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-input border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pure">Pure</SelectItem>
                  <SelectItem value="adulterated">Adulterated</SelectItem>
                  <SelectItem value="inconclusive">Inconclusive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-input border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="milk-dairy">Milk & Dairy</SelectItem>
                  <SelectItem value="spices">Spices</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                  <SelectItem value="honey">Honey</SelectItem>
                  <SelectItem value="vegetables">Vegetables & Fruits</SelectItem>
                  <SelectItem value="meat">Meat & Fish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({mockReports.length})</TabsTrigger>
            <TabsTrigger value="pure">Pure ({mockReports.filter((r) => r.status === "pure").length})</TabsTrigger>
            <TabsTrigger value="adulterated">
              Adulterated ({mockReports.filter((r) => r.status === "adulterated").length})
            </TabsTrigger>
            <TabsTrigger value="inconclusive">
              Inconclusive ({mockReports.filter((r) => r.status === "inconclusive").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredReports.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No Reports Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "You haven't run any tests yet"}
                  </p>
                  <Link href="/home">
                    <Button>Start New Test</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredReports.map((report) => {
                  const IconComponent = report.icon
                  return (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center`}>
                              <IconComponent className={`w-6 h-6 ${report.color}`} />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{report.itemName}</h3>
                              <p className="text-sm text-muted-foreground">{report.category}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(report.date)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              {getStatusBadge(report.status)}
                              <p className="text-xs text-muted-foreground mt-1">Confidence: {report.confidence}%</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => viewReport(report)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="w-4 h-4 mr-2" />
                                  Share Report
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteReport(report.id)} className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Report
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {report.adulterants.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-1">Detected Adulterants:</p>
                            <div className="flex flex-wrap gap-1">
                              {report.adulterants.map((adulterant) => (
                                <Badge key={adulterant} variant="destructive" className="text-xs">
                                  {adulterant}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
