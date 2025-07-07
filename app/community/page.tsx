"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/components/AuthContext"
import {
  Shield,
  Users,
  MessageSquare,
  Heart,
  Share2,
  MapPin,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Filter,
} from "lucide-react"

interface CommunityPost {
  id: string
  author: string
  location: string
  time: string
  content: string
  type: "help" | "share" | "alert" | "discussion"
  likes: number
  comments: number
  tags: string[]
}

interface CommunityMember {
  id: string
  name: string
  location: string
  type: string
  joinDate: string
  posts: number
  helpfulVotes: number
}

function CommunityContent() {
  const { user, profile } = useAuth()
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "Sarah Mitchell",
      location: "Manning Valley, NSW",
      time: "2 hours ago",
      content:
        "Just wanted to share that we successfully moved our cattle to higher ground before the flood warnings. Thanks to everyone who helped coordinate the evacuation routes!",
      type: "share",
      likes: 12,
      comments: 5,
      tags: ["flood", "cattle", "evacuation"],
    },
    {
      id: "2",
      author: "John Thompson",
      location: "Darling Downs, QLD",
      time: "4 hours ago",
      content:
        "Looking for someone with a cattle truck who could help transport 20 head of cattle to temporary grazing. Happy to pay fuel and time. Fire risk is increasing in our area.",
      type: "help",
      likes: 8,
      comments: 3,
      tags: ["cattle", "transport", "fire"],
    },
    {
      id: "3",
      author: "Emma Rodriguez",
      location: "Gippsland, VIC",
      time: "6 hours ago",
      content:
        "Weather bureau is predicting severe storms for our region tomorrow. Make sure your livestock have access to shelter and check your emergency supplies.",
      type: "alert",
      likes: 15,
      comments: 7,
      tags: ["weather", "storm", "preparation"],
    },
  ])

  const [members, setMembers] = useState<CommunityMember[]>([
    {
      id: "1",
      name: "Sarah Mitchell",
      location: "Manning Valley, NSW",
      type: "Cattle Station",
      joinDate: "Jan 2024",
      posts: 23,
      helpfulVotes: 45,
    },
    {
      id: "2",
      name: "John Thompson",
      location: "Darling Downs, QLD",
      type: "Mixed Farm",
      joinDate: "Feb 2024",
      posts: 18,
      helpfulVotes: 32,
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      location: "Gippsland, VIC",
      type: "Horse Stud",
      joinDate: "Mar 2024",
      posts: 31,
      helpfulVotes: 67,
    },
  ])

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "help":
        return "bg-red-100 text-red-800"
      case "share":
        return "bg-green-100 text-green-800"
      case "alert":
        return "bg-orange-100 text-orange-800"
      case "discussion":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "help":
        return <Heart className="h-4 w-4" />
      case "share":
        return <Share2 className="h-4 w-4" />
      case "alert":
        return <Shield className="h-4 w-4" />
      case "discussion":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {profile?.state || "Member"}
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">
            Connect with fellow rural community members, share resources, and support each other
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">3,456</div>
              <div className="text-sm text-gray-600">Posts This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">892</div>
              <div className="text-sm text-gray-600">Help Requests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {profile?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button className="w-full justify-start bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <Plus className="h-4 w-4 mr-2" />
                      Share with the community...
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Posts</option>
                  <option>Help Requests</option>
                  <option>Sharing</option>
                  <option>Alerts</option>
                  <option>Discussions</option>
                </select>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{post.author}</h3>
                          <Badge className={getPostTypeColor(post.type)}>
                            {getPostTypeIcon(post.type)}
                            <span className="ml-1 capitalize">{post.type}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{post.location}</span>
                          <span>•</span>
                          <Calendar className="h-4 w-4" />
                          <span>{post.time}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-red-600">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-blue-600">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-600">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarFallback className="text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.type}</p>
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{member.location}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{member.posts}</div>
                        <div className="text-xs text-gray-500">Posts</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{member.helpfulVotes}</div>
                        <div className="text-xs text-gray-500">Helpful</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{member.joinDate}</div>
                        <div className="text-xs text-gray-500">Joined</div>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    Emergency Response NSW
                  </CardTitle>
                  <CardDescription>
                    Coordination and support for emergency situations in New South Wales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">342 members</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    Cattle Farmers Network
                  </CardTitle>
                  <CardDescription>
                    Share knowledge, resources, and support for cattle farming operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">189 members</span>
                    <Badge className="bg-blue-100 text-blue-800">Growing</Badge>
                  </div>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 text-red-600 mr-2" />
                    Rural Mental Health Support
                  </CardTitle>
                  <CardDescription>
                    A safe space for mental health support and resources for rural communities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">156 members</span>
                    <Badge className="bg-red-100 text-red-800">Supportive</Badge>
                  </div>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
                    Equipment Sharing Hub
                  </CardTitle>
                  <CardDescription>Share and borrow farming equipment with your neighbors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">278 members</span>
                    <Badge className="bg-purple-100 text-purple-800">Popular</Badge>
                  </div>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  return (
    <ProtectedRoute>
      <CommunityContent />
    </ProtectedRoute>
  )
}
