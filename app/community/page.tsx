"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Plus,
  Search,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  Truck,
  AlertTriangle,
  DollarSign,
  Wrench,
  Home,
  Bell,
  Settings,
} from "lucide-react"
import EmergencyTicker from "@/components/emergency-ticker"

interface CommunityPost {
  id: string
  type: "help-request" | "livestock-sale" | "equipment-share" | "general" | "emergency" | "transport"
  author: string
  location: string
  timeAgo: string
  title: string
  content: string
  images?: string[]
  price?: string
  urgent?: boolean
  likes: number
  comments: number
  isLiked: boolean
  tags: string[]
}

export default function CommunityFeed() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      type: "help-request",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      timeAgo: "2 hours ago",
      title: "🚨 Need urgent help - cattle stuck in flood water",
      content:
        "Hi everyone, we have 12 head of cattle stuck on a small island after the creek rose overnight. Need someone with a boat or high clearance vehicle to help get feed to them. Will pay for fuel + your time. Located near Wingham.",
      urgent: true,
      likes: 8,
      comments: 12,
      isLiked: false,
      tags: ["urgent", "cattle", "flood", "wingham"],
    },
    {
      id: "2",
      type: "livestock-sale",
      author: "Manning Valley Angus",
      location: "Taree, NSW",
      timeAgo: "4 hours ago",
      title: "Quality Angus steers for sale",
      content:
        "We have 15 quality Angus steers ready for sale. 18-20 months old, grass fed, excellent condition. $1,800 each or $25,000 for the lot. Can deliver within 50km. Serious buyers only.",
      images: ["/placeholder.svg?height=300&width=400&text=Angus+Steers"],
      price: "$1,800 each",
      likes: 15,
      comments: 6,
      isLiked: true,
      tags: ["angus", "steers", "sale", "taree"],
    },
    {
      id: "3",
      type: "transport",
      author: "Jim's Rural Transport",
      location: "Hunter Valley, NSW",
      timeAgo: "6 hours ago",
      title: "🚛 Livestock transport available this week",
      content:
        "Have space available on livestock truck this Thursday-Friday. Going from Hunter Valley to Sydney markets, then back via Central Coast. Can take cattle, sheep, or horses. Competitive rates, fully insured.",
      likes: 23,
      comments: 9,
      isLiked: false,
      tags: ["transport", "livestock", "hunter-valley", "sydney"],
    },
    {
      id: "4",
      type: "equipment-share",
      author: "Dave K.",
      location: "Gloucester, NSW",
      timeAgo: "8 hours ago",
      title: "Post hole digger available to borrow",
      content:
        "Have a hydraulic post hole digger sitting idle this week. Happy to lend to local farmers - just cover fuel costs. Can dig up to 600mm diameter holes. Located 10km out of Gloucester.",
      likes: 31,
      comments: 14,
      isLiked: false,
      tags: ["equipment", "post-holes", "gloucester", "borrow"],
    },
    {
      id: "5",
      type: "general",
      author: "Manning Valley Weather Watch",
      location: "Manning Valley, NSW",
      timeAgo: "12 hours ago",
      title: "⛈️ Severe weather warning - prepare now",
      content:
        "BOM has issued severe weather warning for our area. Heavy rain and damaging winds expected tomorrow afternoon. Check your livestock water points, secure loose equipment, and charge devices. Stay safe everyone!",
      urgent: true,
      likes: 67,
      comments: 28,
      isLiked: true,
      tags: ["weather", "warning", "preparation", "safety"],
    },
    {
      id: "6",
      type: "livestock-sale",
      author: "Riverside Quarter Horses",
      location: "Krambach, NSW",
      timeAgo: "1 day ago",
      title: "Beautiful quarter horse mare - reluctant sale",
      content:
        "Selling our beloved 8yo quarter horse mare due to downsizing. She's gentle, great with kids, and perfect for trail riding. Up to date with all vaccinations. $4,500 to good home only. Must see her go to someone who will love her.",
      images: ["/placeholder.svg?height=300&width=400&text=Quarter+Horse+Mare"],
      price: "$4,500",
      likes: 42,
      comments: 18,
      isLiked: false,
      tags: ["quarter-horse", "mare", "krambach", "gentle"],
    },
    {
      id: "7",
      type: "general",
      author: "Local Vet Services",
      location: "Manning Valley, NSW",
      timeAgo: "1 day ago",
      title: "Free cattle health workshop this Saturday",
      content:
        "We're running a free workshop on cattle health and disease prevention this Saturday 2pm at Taree Showgrounds. Topics include vaccination schedules, parasite control, and emergency first aid. Light refreshments provided. RSVP appreciated but not required.",
      likes: 89,
      comments: 35,
      isLiked: true,
      tags: ["workshop", "cattle", "health", "free", "taree"],
    },
    {
      id: "8",
      type: "help-request",
      author: "Emma R.",
      location: "Wingham, NSW",
      timeAgo: "2 days ago",
      title: "Looking for emergency agistment",
      content:
        "Our property flooded and we need emergency agistment for 8 head of cattle and 3 horses for 2-3 weeks while we repair fencing. Can pay agistment fees. Animals are all healthy and well-behaved. Desperate - please help!",
      urgent: true,
      likes: 156,
      comments: 47,
      isLiked: true,
      tags: ["agistment", "emergency", "cattle", "horses", "wingham"],
    },
  ])

  const filters = [
    { id: "all", label: "All Posts", icon: Users, count: posts.length },
    {
      id: "help-request",
      label: "Help Needed",
      icon: AlertTriangle,
      count: posts.filter((p) => p.type === "help-request").length,
    },
    {
      id: "livestock-sale",
      label: "Livestock",
      icon: DollarSign,
      count: posts.filter((p) => p.type === "livestock-sale").length,
    },
    {
      id: "transport",
      label: "Transport",
      icon: Truck,
      count: posts.filter((p) => p.type === "transport").length,
    },
    {
      id: "equipment-share",
      label: "Equipment",
      icon: Wrench,
      count: posts.filter((p) => p.type === "equipment-share").length,
    },
    { id: "general", label: "General", icon: MessageCircle, count: posts.filter((p) => p.type === "general").length },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = activeFilter === "all" || post.type === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case "help-request":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "livestock-sale":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "transport":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "equipment-share":
        return <Wrench className="h-5 w-5 text-purple-500" />
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <MessageCircle className="h-5 w-5 text-slate-500" />
    }
  }

  const getPostBorderColor = (type: string, urgent?: boolean) => {
    if (urgent) return "border-l-4 border-red-500"
    switch (type) {
      case "help-request":
        return "border-l-4 border-red-400"
      case "livestock-sale":
        return "border-l-4 border-green-400"
      case "transport":
        return "border-l-4 border-blue-400"
      case "equipment-share":
        return "border-l-4 border-purple-400"
      default:
        return "border-l-4 border-slate-300"
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      <EmergencyTicker />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Manning Valley Community</h1>
                <p className="text-slate-600">450+ active members • 23 online now</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                size="sm"
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden sticky top-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-800 mb-4">Filter Posts</h3>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-slate-300 rounded-xl"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={activeFilter === filter.id ? "default" : "ghost"}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`w-full justify-between text-left ${
                        activeFilter === filter.id ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <filter.icon className="h-4 w-4" />
                        {filter.label}
                      </div>
                      <Badge
                        className={`${
                          activeFilter === filter.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                        } text-xs`}
                      >
                        {filter.count}
                      </Badge>
                    </Button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-green-800 mb-2">Community Activity</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 12 new posts today</div>
                    <div>• 3 urgent help requests</div>
                    <div>• 23 members online</div>
                    <div>• 8 items for sale</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Welcome Message for New Users */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-teal-50 to-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Welcome to Manning Valley Community! 👋</h3>
                    <p className="text-slate-700 mb-4">
                      You're now connected with 450+ local rural families. Browse posts below to see what's happening,
                      or create your first post to introduce yourself!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="text-white font-semibold"
                        style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Post
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300 text-slate-700 bg-transparent">
                        <Home className="h-4 w-4 mr-2" />
                        Complete Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className={`border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all ${getPostBorderColor(post.type, post.urgent)}`}
                >
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{post.author}</div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="h-3 w-3" />
                            {post.location}
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            {post.timeAgo}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getPostIcon(post.type)}
                        {post.urgent && <Badge className="bg-red-100 text-red-700 text-xs font-bold">URGENT</Badge>}
                        {post.price && (
                          <Badge className="bg-green-100 text-green-700 text-xs font-bold">{post.price}</Badge>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
                      <p className="text-slate-700 leading-relaxed">{post.content}</p>
                    </div>

                    {/* Post Images */}
                    {post.images && (
                      <div className="mb-4">
                        <img
                          src={post.images[0] || "/placeholder.svg"}
                          alt="Post image"
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    )}

                    {/* Post Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-slate-300 text-slate-600 bg-slate-50"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 ${
                            post.isLiked ? "text-red-500" : "text-slate-500"
                          } hover:text-red-500`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-slate-500">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-slate-500">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>

                      {(post.type === "help-request" || post.type === "livestock-sale") && (
                        <Button
                          size="sm"
                          className="text-white font-semibold"
                          style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                        >
                          {post.type === "help-request" ? "Offer Help" : "Contact Seller"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
