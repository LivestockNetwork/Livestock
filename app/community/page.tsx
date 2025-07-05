"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Plus, Search, Filter, AlertTriangle, Truck, Wrench, Wheat, ArrowLeft } from "lucide-react"
import Link from "next/link"
import CommunityPost from "@/components/community-post"
import CreatePostModal from "@/components/create-post-modal"
import EmergencyTicker from "@/components/emergency-ticker"

export default function CommunityFeedPage() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState([
    {
      id: "1",
      type: "help-request",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      title: "Need urgent help - cattle stranded by flood",
      content:
        "Our back paddock is flooded and we have 20 head of cattle that need moving to higher ground. Anyone with a boat or high-clearance vehicle who can help? Will pay for fuel + more.",
      images: ["/placeholder.svg?height=300&width=400&text=Flooded+Paddock"],
      likes: 12,
      comments: 8,
      shares: 3,
      isUrgent: true,
      tags: ["cattle", "flood", "urgent-help"],
    },
    {
      id: "2",
      type: "equipment-share",
      author: "Manning Valley Machinery",
      location: "Taree, NSW",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      title: "John Deere 6120M available for hire",
      content:
        "Our 6120M tractor is available for hire this week. Perfect for hay cutting or cultivation work. $80/hour including operator. Call us on 0412 345 678.",
      images: ["/placeholder.svg?height=300&width=400&text=John+Deere+Tractor"],
      likes: 23,
      comments: 5,
      shares: 7,
      isBusinessPost: true,
      tags: ["tractor", "hire", "machinery"],
    },
    {
      id: "3",
      type: "farm-update",
      author: "Tom & Jenny K.",
      location: "Gloucester, NSW",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      title: "Beautiful morning on the farm",
      content:
        "The rain has finally stopped and the sun is out! Our new Angus calves are loving the fresh grass. Spring is definitely here in the Manning Valley. 🌱",
      images: ["/placeholder.svg?height=300&width=400&text=Angus+Calves+in+Green+Paddock"],
      likes: 45,
      comments: 12,
      shares: 4,
      tags: ["cattle", "spring", "farm-life"],
    },
    {
      id: "4",
      type: "community-event",
      author: "Manning Valley Show Society",
      location: "Wingham, NSW",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      title: "Annual Show - Call for volunteers",
      content:
        "Our annual agricultural show is coming up in 6 weeks! We need volunteers for livestock judging, gate duties, and setup. Great way to meet your rural neighbors. Free entry for volunteers!",
      images: ["/placeholder.svg?height=300&width=400&text=Agricultural+Show+Grounds"],
      likes: 34,
      comments: 18,
      shares: 12,
      isBusinessPost: true,
      tags: ["show", "volunteers", "community"],
    },
    {
      id: "5",
      type: "livestock-sale",
      author: "David R.",
      location: "Krambach, NSW",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      title: "Quality Angus steers for sale",
      content:
        "15 Angus steers, 18-20 months old, grass fed, excellent condition. $1,800 each or $25,000 for the lot. Can deliver within 50km. Serious inquiries only.",
      images: ["/placeholder.svg?height=300&width=400&text=Angus+Steers"],
      likes: 19,
      comments: 7,
      shares: 5,
      tags: ["cattle", "sale", "angus"],
    },
    {
      id: "6",
      type: "weather-alert",
      author: "Manning Valley Weather Watch",
      location: "Manning Valley, NSW",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
      title: "Severe weather warning - prepare livestock",
      content:
        "BOM has issued a severe weather warning for our area. Heavy rain and strong winds expected tonight through tomorrow. Secure loose items and move livestock to shelter if possible.",
      likes: 67,
      comments: 23,
      shares: 31,
      isUrgent: true,
      isBusinessPost: true,
      tags: ["weather", "warning", "livestock-safety"],
    },
  ])

  const handleCreatePost = (newPost: any) => {
    const post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
    }
    setPosts([post, ...posts])
  }

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = activeFilter === "all" || post.type === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  const postTypes = [
    { id: "all", label: "All Posts", icon: Users, count: posts.length },
    {
      id: "help-request",
      label: "Help Needed",
      icon: AlertTriangle,
      count: posts.filter((p) => p.type === "help-request").length,
    },
    {
      id: "equipment-share",
      label: "Equipment",
      icon: Wrench,
      count: posts.filter((p) => p.type === "equipment-share").length,
    },
    {
      id: "livestock-sale",
      label: "Livestock",
      icon: Users,
      count: posts.filter((p) => p.type === "livestock-sale").length,
    },
    {
      id: "farm-update",
      label: "Farm Updates",
      icon: Wheat,
      count: posts.filter((p) => p.type === "farm-update").length,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <EmergencyTicker />

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-10 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>

              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Manning Valley Community</h1>
                  <p className="text-sm text-slate-600">450+ local members</p>
                </div>
              </Link>
            </div>

            <Button
              onClick={() => setIsCreatePostOpen(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters & Stats */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-32">
              {/* Search */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Post Type Filters */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Post Types
                  </h3>
                  <div className="space-y-2">
                    {postTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setActiveFilter(type.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                          activeFilter === type.id
                            ? "bg-teal-100 text-teal-700 font-medium"
                            : "hover:bg-slate-100 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {type.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-3">Community Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Active Members</span>
                      <span className="font-semibold text-teal-600">450+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Posts This Week</span>
                      <span className="font-semibold text-teal-600">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Help Requests</span>
                      <span className="font-semibold text-amber-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Equipment Shared</span>
                      <span className="font-semibold text-green-600">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setIsCreatePostOpen(true)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                      Request Help
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setIsCreatePostOpen(true)}
                    >
                      <Truck className="h-4 w-4 mr-2 text-blue-500" />
                      Share Equipment
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setIsCreatePostOpen(true)}
                    >
                      <Users className="h-4 w-4 mr-2 text-green-500" />
                      Sell Livestock
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Welcome Banner */}
              <Card className="border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Welcome to Manning Valley Community</h2>
                      <p className="text-slate-600">
                        Connect with 450+ local farmers, graziers, and rural families. Share resources, ask for help,
                        and build stronger communities together.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Filter Display */}
              {activeFilter !== "all" && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    Showing: {postTypes.find((t) => t.id === activeFilter)?.label}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFilter("all")}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Clear filter
                  </Button>
                </div>
              )}

              {/* Posts Feed */}
              <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">No posts found</h3>
                      <p className="text-slate-600 mb-4">
                        {searchQuery ? `No posts match "${searchQuery}"` : "No posts in this category yet"}
                      </p>
                      <Button onClick={() => setIsCreatePostOpen(true)} className="bg-teal-500 hover:bg-teal-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Post
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredPosts.map((post) => <CommunityPost key={post.id} post={post} />)
                )}
              </div>

              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="text-center py-8">
                  <Button variant="outline" className="border-slate-300 text-slate-700 bg-transparent">
                    Load More Posts
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  )
}
