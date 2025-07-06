"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Search,
  Filter,
  MapPin,
  Clock,
  AlertTriangle,
  Truck,
  Home,
  Plus,
} from "lucide-react"
import Link from "next/link"
import CreatePostModal from "@/components/create-post-modal"

export default function CommunityPage() {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const communityPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Mitchell",
        location: "Tamworth, NSW",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      timestamp: "2 hours ago",
      type: "emergency",
      title: "Flood Update - Murray River",
      content:
        "Water levels rising rapidly near Corowa. We've moved all cattle to higher ground. Happy to help neighbors with livestock transport if needed. Have truck and trailer available.",
      tags: ["flood", "livestock-transport", "mutual-aid"],
      engagement: {
        likes: 24,
        comments: 8,
        shares: 12,
      },
      urgent: true,
    },
    {
      id: 2,
      author: {
        name: "Tom Bradley",
        location: "Warwick, QLD",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      timestamp: "4 hours ago",
      type: "resource-sharing",
      title: "Hay Available - Good Quality",
      content:
        "Have 200 bales of lucerne hay available. $12/bale. Can deliver within 50km of Warwick. Contact me if you need feed for drought affected areas.",
      tags: ["hay", "drought-relief", "livestock-feed"],
      engagement: {
        likes: 18,
        comments: 15,
        shares: 6,
      },
      urgent: false,
    },
    {
      id: 3,
      author: {
        name: "Emma Chen",
        location: "Mount Gambier, SA",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      timestamp: "6 hours ago",
      type: "community-support",
      title: "Community BBQ - Bushfire Recovery",
      content:
        "Organizing a community BBQ this Saturday to support families affected by recent bushfires. Bring a plate to share. All welcome. Let's come together as a community.",
      tags: ["community-event", "bushfire-recovery", "support"],
      engagement: {
        likes: 45,
        comments: 22,
        shares: 18,
      },
      urgent: false,
    },
    {
      id: 4,
      author: {
        name: "Mike Johnson",
        location: "Bendigo, VIC",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      timestamp: "8 hours ago",
      type: "agistment",
      title: "Agistment Available - 500 Acres",
      content:
        "Have 500 acres of improved pasture available for agistment. Good water, secure fencing. $8/head/week for cattle. Perfect for drought relief or temporary grazing.",
      tags: ["agistment", "cattle", "drought-relief"],
      engagement: {
        likes: 32,
        comments: 19,
        shares: 14,
      },
      urgent: false,
    },
    {
      id: 5,
      author: {
        name: "Lisa Thompson",
        location: "Dubbo, NSW",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      timestamp: "12 hours ago",
      type: "equipment-sharing",
      title: "Tractor Available for Harvest Help",
      content:
        "John Deere 7830 with header available to help neighbors with harvest. Just finished our crop. Happy to help community members. Fuel costs only.",
      tags: ["equipment-sharing", "harvest", "community-help"],
      engagement: {
        likes: 28,
        comments: 11,
        shares: 9,
      },
      urgent: false,
    },
  ]

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "resource-sharing":
        return <Share2 className="h-4 w-4 text-blue-500" />
      case "agistment":
        return <Home className="h-4 w-4 text-green-500" />
      case "equipment-sharing":
        return <Truck className="h-4 w-4 text-orange-500" />
      default:
        return <Users className="h-4 w-4 text-purple-500" />
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "bg-red-100 text-red-800"
      case "resource-sharing":
        return "bg-blue-100 text-blue-800"
      case "agistment":
        return "bg-green-100 text-green-800"
      case "equipment-sharing":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-purple-100 text-purple-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Rural Community Hub</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button onClick={() => setShowCreatePost(true)} className="bg-teal-500 hover:bg-teal-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Feed</h1>
          <p className="text-gray-600">Connect, share, and support your rural community</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search community posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-600 mb-1">8,630+</div>
              <div className="text-sm text-gray-600">Community Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
              <div className="text-sm text-gray-600">Active This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">342</div>
              <div className="text-sm text-gray-600">Resources Shared</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {communityPosts.map((post) => (
            <Card key={post.id} className={`${post.urgent ? "border-red-200 bg-red-50" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        {post.author.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{post.author.location}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.urgent && (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                    <Badge className={getPostTypeColor(post.type)}>
                      {getPostTypeIcon(post.type)}
                      <span className="ml-1 capitalize">{post.type.replace("-", " ")}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.engagement.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.engagement.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">{post.engagement.shares}</span>
                    </button>
                  </div>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal open={showCreatePost} onOpenChange={setShowCreatePost} />
    </div>
  )
}
