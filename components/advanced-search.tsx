"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  MapPin,
  User,
  MessageCircle,
  Truck,
  Users,
  Clock,
  Star,
  Bookmark,
  SlidersHorizontal,
  X,
  TrendingUp,
  Eye,
  Heart,
} from "lucide-react"

interface SearchResult {
  id: string
  type: "post" | "member" | "group" | "resource"
  title: string
  content: string
  author: string
  location: string
  date: Date
  tags: string[]
  metadata: {
    likes?: number
    comments?: number
    views?: number
    members?: number
    isUrgent?: boolean
    isVerified?: boolean
  }
}

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    location: "all",
    dateRange: "all",
    sortBy: "relevance",
    tags: [] as string[],
    urgentOnly: false,
    verifiedOnly: false,
  })
  const [savedSearches, setSavedSearches] = useState([
    {
      id: "1",
      name: "Cattle emergencies in Manning Valley",
      query: "cattle emergency",
      filters: { location: "Manning Valley", urgentOnly: true },
    },
    { id: "2", name: "Equipment sharing", query: "equipment share", filters: { type: "equipment" } },
    { id: "3", name: "Weather alerts", query: "weather", filters: { type: "alert", urgentOnly: true } },
  ])

  const searchResults: SearchResult[] = [
    {
      id: "1",
      type: "post",
      title: "Urgent: Cattle stranded by flood water",
      content:
        "Need immediate help moving 20 head of cattle to higher ground. Flood water rising fast in back paddock.",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ["cattle", "flood", "urgent", "help-needed"],
      metadata: { likes: 12, comments: 8, isUrgent: true },
    },
    {
      id: "2",
      type: "member",
      title: "Tom K. - Cattle Specialist",
      content:
        "Experienced cattle farmer with 25+ years in the Manning Valley. Specializes in Angus breeding and pasture management.",
      author: "Tom K.",
      location: "Gloucester, NSW",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ["cattle", "breeding", "specialist", "angus"],
      metadata: { isVerified: true },
    },
    {
      id: "3",
      type: "group",
      title: "Cattle & Livestock Management",
      content:
        "Community group for discussing cattle breeding, health, and management practices in the Manning Valley region.",
      author: "Community",
      location: "Manning Valley, NSW",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      tags: ["cattle", "livestock", "management", "community"],
      metadata: { members: 234, views: 1456 },
    },
    {
      id: "4",
      type: "resource",
      title: "John Deere 6120M Tractor Available",
      content: "High-quality tractor available for hire. Perfect for hay cutting, cultivation, and heavy farm work.",
      author: "Manning Valley Machinery",
      location: "Taree, NSW",
      date: new Date(Date.now() - 3 * 60 * 60 * 1000),
      tags: ["equipment", "tractor", "hire", "john-deere"],
      metadata: { likes: 23, comments: 5, isVerified: true },
    },
    {
      id: "5",
      type: "post",
      title: "Weather warning: Severe storms approaching",
      content:
        "BOM has issued severe weather warning for Manning Valley. Heavy rain and strong winds expected tonight.",
      author: "Weather Watch Team",
      location: "Manning Valley, NSW",
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tags: ["weather", "warning", "storm", "alert"],
      metadata: { likes: 67, comments: 23, views: 456, isUrgent: true },
    },
  ]

  const contentTypes = [
    { id: "all", label: "All Content", count: 1247 },
    { id: "post", label: "Posts", count: 856 },
    { id: "member", label: "Members", count: 234 },
    { id: "group", label: "Groups", count: 45 },
    { id: "resource", label: "Resources", count: 112 },
  ]

  const locations = [
    "All Locations",
    "Manning Valley, NSW",
    "Taree, NSW",
    "Gloucester, NSW",
    "Wingham, NSW",
    "Krambach, NSW",
    "Forster, NSW",
  ]

  const popularTags = [
    "cattle",
    "equipment",
    "weather",
    "emergency",
    "help-needed",
    "livestock",
    "machinery",
    "flood",
    "drought",
    "community",
    "breeding",
    "health",
    "transport",
    "feed",
    "pasture",
  ]

  const sortOptions = [
    { id: "relevance", label: "Most Relevant" },
    { id: "recent", label: "Most Recent" },
    { id: "popular", label: "Most Popular" },
    { id: "urgent", label: "Most Urgent" },
  ]

  const filteredResults = searchResults.filter((result) => {
    if (
      searchQuery &&
      !result.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !result.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !result.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    if (activeFilters.type !== "all" && result.type !== activeFilters.type) {
      return false
    }

    if (activeFilters.urgentOnly && !result.metadata.isUrgent) {
      return false
    }

    if (activeFilters.verifiedOnly && !result.metadata.isVerified) {
      return false
    }

    if (activeFilters.tags.length > 0 && !activeFilters.tags.some((tag) => result.tags.includes(tag))) {
      return false
    }

    return true
  })

  const getResultIcon = (type: string) => {
    switch (type) {
      case "post":
        return MessageCircle
      case "member":
        return User
      case "group":
        return Users
      case "resource":
        return Truck
      default:
        return MessageCircle
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const toggleTag = (tag: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Advanced Search</h1>
          <p className="text-slate-600">Find exactly what you're looking for in the community</p>
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="border-slate-300">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {showFilters ? "Hide" : "Show"} Filters
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search posts, members, groups, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-slate-300 focus:ring-2 focus:ring-teal-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {contentTypes.map((type) => (
              <Button
                key={type.id}
                variant={activeFilters.type === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilters((prev) => ({ ...prev, type: type.id }))}
                className={activeFilters.type === type.id ? "bg-teal-500 hover:bg-teal-600" : "border-slate-300"}
              >
                {type.label} ({type.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <Select
                  value={activeFilters.location}
                  onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase().replace(/\s+/g, "-")}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                <Select
                  value={activeFilters.dateRange}
                  onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, dateRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                <Select
                  value={activeFilters.sortBy}
                  onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Tags</label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeFilters.tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={activeFilters.tags.includes(tag) ? "bg-teal-500 hover:bg-teal-600" : "border-slate-300"}
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Special Filters */}
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={activeFilters.urgentOnly}
                  onCheckedChange={(checked) =>
                    setActiveFilters((prev) => ({ ...prev, urgentOnly: checked as boolean }))
                  }
                />
                <label htmlFor="urgent" className="text-sm text-slate-700">
                  Urgent posts only
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={activeFilters.verifiedOnly}
                  onCheckedChange={(checked) =>
                    setActiveFilters((prev) => ({ ...prev, verifiedOnly: checked as boolean }))
                  }
                />
                <label htmlFor="verified" className="text-sm text-slate-700">
                  Verified users only
                </label>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() =>
                  setActiveFilters({
                    type: "all",
                    location: "all",
                    dateRange: "all",
                    sortBy: "relevance",
                    tags: [],
                    urgentOnly: false,
                    verifiedOnly: false,
                  })
                }
                className="border-slate-300"
              >
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Saved Searches */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Saved Searches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">{search.name}</p>
                    <p className="text-xs text-slate-500">"{search.query}"</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full border-slate-300 bg-transparent">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Current Search
              </Button>
            </CardContent>
          </Card>

          {/* Trending Tags */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["cattle", "flood", "equipment", "weather", "help-needed"].map((tag, index) => (
                  <div key={tag} className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-teal-100"
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </Badge>
                    <span className="text-xs text-slate-500">+{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              {filteredResults.length} results {searchQuery && `for "${searchQuery}"`}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <Select
                value={activeFilters.sortBy}
                onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, sortBy: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No results found</h3>
                  <p className="text-slate-600">Try adjusting your search terms or filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredResults.map((result) => {
                const Icon = getResultIcon(result.type)
                return (
                  <Card key={result.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-slate-600" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-slate-800 hover:text-teal-600 mb-1">
                                {result.title}
                                {result.metadata.isUrgent && (
                                  <Badge className="ml-2 bg-red-500 text-white text-xs">URGENT</Badge>
                                )}
                                {result.metadata.isVerified && (
                                  <Badge className="ml-2 bg-blue-500 text-white text-xs">VERIFIED</Badge>
                                )}
                              </h3>
                              <p className="text-slate-600 text-sm line-clamp-2">{result.content}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {result.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {result.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getTimeAgo(result.date)}
                            </div>
                            <Badge variant="outline" className="text-xs border-slate-300">
                              {result.type}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {result.tags.slice(0, 4).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                              {result.tags.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{result.tags.length - 4}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              {result.metadata.likes && (
                                <div className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {result.metadata.likes}
                                </div>
                              )}
                              {result.metadata.comments && (
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-3 w-3" />
                                  {result.metadata.comments}
                                </div>
                              )}
                              {result.metadata.views && (
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {result.metadata.views}
                                </div>
                              )}
                              {result.metadata.members && (
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {result.metadata.members}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          {/* Load More */}
          {filteredResults.length > 0 && (
            <div className="text-center py-6">
              <Button variant="outline" className="border-slate-300 bg-transparent">
                Load More Results
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
