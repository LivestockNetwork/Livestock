"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Truck,
  Calendar,
  MapPin,
  Star,
  Shield,
  Clock,
  Phone,
  Mail,
  Search,
  Filter,
  Plus,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Users,
  Package,
  Tractor,
  Scissors,
  Eye,
} from "lucide-react"

interface MarketplaceItem {
  id: string
  type: "equipment" | "livestock" | "service" | "supply"
  title: string
  description: string
  price: number
  priceType: "hour" | "day" | "week" | "month" | "fixed"
  seller: {
    name: string
    rating: number
    reviews: number
    verified: boolean
    location: string
  }
  images: string[]
  availability: {
    available: boolean
    nextAvailable?: Date
    calendar?: Date[]
  }
  specifications?: Record<string, string>
  tags: string[]
  category: string
  condition: "new" | "excellent" | "good" | "fair"
  posted: Date
  views: number
  likes: number
  isUrgent?: boolean
  isFeatured?: boolean
}

export default function ResourceMarketplace() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "1",
      type: "equipment",
      title: "John Deere 6120M Tractor",
      description:
        "High-performance tractor perfect for hay cutting, cultivation, and heavy farm work. Well maintained with full service history.",
      price: 80,
      priceType: "hour",
      seller: {
        name: "Manning Valley Machinery",
        rating: 4.8,
        reviews: 127,
        verified: true,
        location: "Taree, NSW",
      },
      images: ["/images/john-deere-tractor.png"],
      availability: {
        available: true,
        calendar: [new Date(), new Date(Date.now() + 24 * 60 * 60 * 1000)],
      },
      specifications: {
        "Engine Power": "120 HP",
        Year: "2019",
        Hours: "1,250",
        Transmission: "PowerQuad Plus",
      },
      tags: ["tractor", "john-deere", "cultivation", "hay"],
      category: "Tractors",
      condition: "excellent",
      posted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      views: 234,
      likes: 18,
      isFeatured: true,
    },
    {
      id: "2",
      type: "livestock",
      title: "Premium Angus Steers",
      description:
        "15 quality Angus steers, 18-20 months old, grass-fed, excellent condition. Perfect for breeding or finishing.",
      price: 1800,
      priceType: "fixed",
      seller: {
        name: "David R.",
        rating: 4.9,
        reviews: 43,
        verified: true,
        location: "Krambach, NSW",
      },
      images: ["/images/angus-steers.png"],
      availability: {
        available: true,
      },
      specifications: {
        Age: "18-20 months",
        Weight: "450-500 kg",
        Breed: "Angus",
        Feed: "Grass-fed",
      },
      tags: ["cattle", "angus", "steers", "grass-fed"],
      category: "Cattle",
      condition: "excellent",
      posted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      views: 156,
      likes: 24,
    },
    {
      id: "3",
      type: "service",
      title: "Livestock Transport Service",
      description:
        "Professional livestock transport with modern trucks and experienced drivers. Fully insured and licensed.",
      price: 2.5,
      priceType: "fixed",
      seller: {
        name: "Valley Transport Co.",
        rating: 4.7,
        reviews: 89,
        verified: true,
        location: "Manning Valley, NSW",
      },
      images: ["/placeholder.svg?height=300&width=400&text=Livestock+Transport+Truck"],
      availability: {
        available: true,
        nextAvailable: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      specifications: {
        Capacity: "40 head cattle",
        Insurance: "Fully covered",
        License: "Heavy vehicle",
        Experience: "15+ years",
      },
      tags: ["transport", "livestock", "professional", "insured"],
      category: "Transport",
      condition: "excellent",
      posted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      views: 89,
      likes: 12,
    },
    {
      id: "4",
      type: "supply",
      title: "Premium Lucerne Hay Bales",
      description:
        "High-quality lucerne hay bales, perfect for cattle and horse feed. Stored in dry conditions, excellent nutritional value.",
      price: 18,
      priceType: "fixed",
      seller: {
        name: "Green Valley Hay",
        rating: 4.6,
        reviews: 67,
        verified: false,
        location: "Gloucester, NSW",
      },
      images: ["/images/lucerne-hay-bales.png"],
      availability: {
        available: true,
      },
      specifications: {
        Type: "Lucerne",
        Weight: "20-25 kg per bale",
        Storage: "Dry shed",
        Quality: "Premium grade",
      },
      tags: ["hay", "lucerne", "feed", "cattle"],
      category: "Feed & Supplies",
      condition: "new",
      posted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      views: 178,
      likes: 15,
    },
    {
      id: "5",
      type: "equipment",
      title: "Hay Cutter - Urgent Sale",
      description:
        "Reliable hay cutter, needs minor repairs but fully functional. Great for small to medium operations.",
      price: 2500,
      priceType: "fixed",
      seller: {
        name: "Tom K.",
        rating: 4.4,
        reviews: 23,
        verified: true,
        location: "Wingham, NSW",
      },
      images: ["/placeholder.svg?height=300&width=400&text=Hay+Cutter+Equipment"],
      availability: {
        available: true,
      },
      specifications: {
        Width: "2.1m cutting width",
        Condition: "Good - minor repairs needed",
        Age: "8 years",
        Maintenance: "Regular service",
      },
      tags: ["hay-cutter", "equipment", "urgent", "repair"],
      category: "Hay Equipment",
      condition: "good",
      posted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      views: 92,
      likes: 8,
      isUrgent: true,
    },
  ]

  const categories = [
    { id: "all", name: "All Categories", count: marketplaceItems.length, icon: Package },
    { id: "Tractors", name: "Tractors", count: 1, icon: Tractor },
    { id: "Cattle", name: "Cattle", count: 1, icon: Users },
    { id: "Transport", name: "Transport", count: 1, icon: Truck },
    { id: "Feed & Supplies", name: "Feed & Supplies", count: 1, icon: Package },
    { id: "Hay Equipment", name: "Hay Equipment", count: 1, icon: Scissors },
  ]

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "green"
      case "excellent":
        return "blue"
      case "good":
        return "amber"
      case "fair":
        return "orange"
      default:
        return "gray"
    }
  }

  const formatPrice = (price: number, priceType: string) => {
    const formatted = price.toLocaleString()
    switch (priceType) {
      case "hour":
        return `$${formatted}/hour`
      case "day":
        return `$${formatted}/day`
      case "week":
        return `$${formatted}/week`
      case "month":
        return `$${formatted}/month`
      default:
        return `$${formatted}`
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    return `${diffInDays} days ago`
  }

  if (selectedItem) {
    const item = marketplaceItems.find((i) => i.id === selectedItem)
    if (!item) return null

    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedItem(null)} className="text-slate-600 hover:text-slate-800">
          ← Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-100 rounded-t-lg overflow-hidden">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h1>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`bg-${getConditionColor(item.condition)}-100 text-${getConditionColor(item.condition)}-700`}
                        >
                          {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                        </Badge>
                        <Badge variant="outline">{item.type}</Badge>
                        {item.isUrgent && <Badge className="bg-red-500 text-white">URGENT</Badge>}
                        {item.isFeatured && <Badge className="bg-amber-500 text-white">FEATURED</Badge>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-teal-600">{formatPrice(item.price, item.priceType)}</p>
                      {item.priceType !== "fixed" && <p className="text-sm text-slate-500">per {item.priceType}</p>}
                    </div>
                  </div>

                  <p className="text-slate-700 mb-6">{item.description}</p>

                  {/* Specifications */}
                  {item.specifications && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-slate-800 mb-3">Specifications</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(item.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between p-2 bg-slate-50 rounded">
                            <span className="text-sm text-slate-600">{key}:</span>
                            <span className="text-sm font-medium text-slate-800">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Seller Info */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {item.seller.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800">{item.seller.name}</h3>
                      {item.seller.verified && <Shield className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="text-sm text-slate-600">
                        {item.seller.rating} ({item.seller.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {item.seller.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="w-full border-slate-300 bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Availability</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {item.availability.available ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">Available Now</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span className="text-amber-600 font-medium">Currently Unavailable</span>
                      </>
                    )}
                  </div>

                  {item.availability.nextAvailable && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      Next available: {item.availability.nextAvailable.toLocaleDateString()}
                    </div>
                  )}

                  <Button variant="outline" className="w-full border-slate-300 bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Check Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Item Stats */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Item Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Views</span>
                    </div>
                    <span className="font-medium text-slate-800">{item.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Likes</span>
                    </div>
                    <span className="font-medium text-slate-800">{item.likes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Posted</span>
                    </div>
                    <span className="font-medium text-slate-800">{getTimeAgo(item.posted)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-300 bg-transparent">
                    <Heart className="h-4 w-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-slate-300 bg-transparent">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Resource Marketplace</h1>
          <p className="text-slate-600">Buy, sell, and hire equipment, livestock, and services</p>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          List Item
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 border-b">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("browse")}
          className={activeTab === "browse" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          Browse Marketplace
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("my-listings")}
          className={activeTab === "my-listings" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          My Listings (3)
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("favorites")}
          className={activeTab === "favorites" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          Favorites (7)
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search equipment, livestock, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="border-slate-300">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6 sticky top-6">
            {/* Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-teal-100 text-teal-700 font-medium"
                        : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Marketplace Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Active Listings</span>
                  <span className="font-semibold text-teal-600">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">This Week</span>
                  <span className="font-semibold text-teal-600">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Avg Response</span>
                  <span className="font-semibold text-teal-600">2.4 hrs</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedItem(item.id)}
              >
                <CardContent className="p-0">
                  <div className="aspect-video bg-slate-100 rounded-t-lg overflow-hidden relative">
                    <img
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-amber-500 text-white">FEATURED</Badge>
                    )}
                    {item.isUrgent && <Badge className="absolute top-2 right-2 bg-red-500 text-white">URGENT</Badge>}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-slate-800 hover:text-teal-600 line-clamp-1">{item.title}</h3>
                      <div className="text-right">
                        <p className="font-bold text-teal-600">{formatPrice(item.price, item.priceType)}</p>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={`bg-${getConditionColor(item.condition)}-100 text-${getConditionColor(item.condition)}-700 text-xs`}
                      >
                        {item.condition}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.seller.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(item.posted)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                            {item.seller.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span className="text-xs text-slate-600">{item.seller.rating}</span>
                        </div>
                        {item.seller.verified && <Shield className="h-3 w-3 text-blue-500" />}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No items found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
