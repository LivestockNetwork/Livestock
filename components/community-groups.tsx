"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  MessageCircle,
  Search,
  Plus,
  Shield,
  Bookmark,
  TrendingUp,
  Clock,
  Eye,
  Lock,
  Globe,
  BeefIcon as Cattle,
  Wrench,
  CloudRain,
  Wheat,
  Truck,
  Star,
} from "lucide-react"

interface Group {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  postCount: number
  isPrivate: boolean
  lastActivity: Date
  moderators: string[]
  tags: string[]
  icon: any
  color: string
}

interface Discussion {
  id: string
  groupId: string
  title: string
  author: string
  content: string
  replies: number
  views: number
  lastReply: Date
  isPinned: boolean
  isLocked: boolean
  tags: string[]
}

export default function CommunityGroups() {
  const [activeTab, setActiveTab] = useState("discover")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateGroup, setShowCreateGroup] = useState(false)

  const groups: Group[] = [
    {
      id: "1",
      name: "Cattle & Livestock",
      description: "Discussion about cattle breeding, health, and management in the Manning Valley region.",
      category: "Livestock",
      memberCount: 234,
      postCount: 1456,
      isPrivate: false,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      moderators: ["Sarah M.", "Tom K."],
      tags: ["cattle", "breeding", "health", "management"],
      icon: Cattle,
      color: "green",
    },
    {
      id: "2",
      name: "Farm Equipment & Machinery",
      description: "Share, trade, and discuss farm equipment. Get advice on repairs and maintenance.",
      category: "Equipment",
      memberCount: 189,
      postCount: 892,
      isPrivate: false,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      moderators: ["David R.", "Jenny K."],
      tags: ["equipment", "machinery", "repairs", "trading"],
      icon: Wrench,
      color: "blue",
    },
    {
      id: "3",
      name: "Weather & Climate",
      description: "Local weather discussions, seasonal planning, and climate adaptation strategies.",
      category: "Weather",
      memberCount: 312,
      postCount: 2134,
      isPrivate: false,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      moderators: ["Weather Watch Team"],
      tags: ["weather", "climate", "forecasting", "planning"],
      icon: CloudRain,
      color: "amber",
    },
    {
      id: "4",
      name: "Crop & Pasture Management",
      description: "Discuss crop rotation, pasture improvement, and sustainable farming practices.",
      category: "Crops",
      memberCount: 156,
      postCount: 743,
      isPrivate: false,
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
      moderators: ["Agronomy Team"],
      tags: ["crops", "pasture", "sustainability", "rotation"],
      icon: Wheat,
      color: "green",
    },
    {
      id: "5",
      name: "Transport & Logistics",
      description: "Coordinate livestock transport, equipment delivery, and shared logistics.",
      category: "Logistics",
      memberCount: 98,
      postCount: 456,
      isPrivate: false,
      lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
      moderators: ["Transport Co-op"],
      tags: ["transport", "logistics", "delivery", "coordination"],
      icon: Truck,
      color: "purple",
    },
    {
      id: "6",
      name: "Emergency Response Team",
      description: "Private group for certified emergency responders and coordinators.",
      category: "Emergency",
      memberCount: 23,
      postCount: 189,
      isPrivate: true,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000),
      moderators: ["Emergency Coordinator"],
      tags: ["emergency", "response", "coordination", "certified"],
      icon: Shield,
      color: "red",
    },
  ]

  const discussions: Discussion[] = [
    {
      id: "1",
      groupId: "1",
      title: "Best practices for cattle health during wet season",
      author: "Sarah M.",
      content:
        "With all this rain, I'm seeing more hoof problems in my herd. What preventive measures are you all taking?",
      replies: 23,
      views: 156,
      lastReply: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isPinned: true,
      isLocked: false,
      tags: ["health", "wet-season", "prevention"],
    },
    {
      id: "2",
      groupId: "1",
      title: "Angus vs Hereford for our climate?",
      author: "Tom K.",
      content: "Thinking about changing breeds. Anyone have experience with both in the Manning Valley?",
      replies: 18,
      views: 89,
      lastReply: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: false,
      isLocked: false,
      tags: ["breeds", "angus", "hereford", "climate"],
    },
    {
      id: "3",
      groupId: "2",
      title: "John Deere 6120M - maintenance schedule?",
      author: "David R.",
      content:
        "Just bought a used 6120M. Looking for a good maintenance schedule and reliable service providers in the area.",
      replies: 12,
      views: 67,
      lastReply: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isPinned: false,
      isLocked: false,
      tags: ["john-deere", "maintenance", "service"],
    },
  ]

  const categories = [
    { id: "all", name: "All Groups", count: groups.length },
    { id: "Livestock", name: "Livestock", count: groups.filter((g) => g.category === "Livestock").length },
    { id: "Equipment", name: "Equipment", count: groups.filter((g) => g.category === "Equipment").length },
    { id: "Weather", name: "Weather", count: groups.filter((g) => g.category === "Weather").length },
    { id: "Crops", name: "Crops", count: groups.filter((g) => g.category === "Crops").length },
    { id: "Emergency", name: "Emergency", count: groups.filter((g) => g.category === "Emergency").length },
  ]

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      searchQuery === "" ||
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (selectedGroup) {
    const group = groups.find((g) => g.id === selectedGroup)
    const groupDiscussions = discussions.filter((d) => d.groupId === selectedGroup)

    return (
      <div className="space-y-6">
        {/* Group Header */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedGroup(null)}
                className="text-slate-600 hover:text-slate-800 mb-4"
              >
                ← Back to Groups
              </Button>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 bg-${group?.color}-100 rounded-xl flex items-center justify-center`}>
                {group?.icon && <group.icon className={`h-8 w-8 text-${group.color}-600`} />}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-slate-800">{group?.name}</h1>
                  {group?.isPrivate && (
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      <Lock className="h-3 w-3 mr-1" />
                      Private
                    </Badge>
                  )}
                </div>

                <p className="text-slate-600 mb-4">{group?.description}</p>

                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {group?.memberCount} members
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {group?.postCount} posts
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Active {getTimeAgo(group?.lastActivity || new Date())}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {group?.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Join Group
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Group Navigation */}
        <div className="flex items-center gap-4 border-b">
          <Button variant="ghost" className="border-b-2 border-teal-500 text-teal-600">
            Discussions
          </Button>
          <Button variant="ghost" className="text-slate-600">
            Members
          </Button>
          <Button variant="ghost" className="text-slate-600">
            Events
          </Button>
          <Button variant="ghost" className="text-slate-600">
            Files
          </Button>
        </div>

        {/* Discussions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Recent Discussions</h2>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </div>

          {groupDiscussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {discussion.isPinned && <Star className="h-4 w-4 text-amber-500" />}
                      {discussion.isLocked && <Lock className="h-4 w-4 text-slate-400" />}
                      <h3 className="font-semibold text-slate-800 hover:text-teal-600">{discussion.title}</h3>
                    </div>

                    <p className="text-slate-600 text-sm mb-3">{discussion.content}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>by {discussion.author}</span>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {discussion.replies} replies
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {discussion.views} views
                      </div>
                      <span>Last reply {getTimeAgo(discussion.lastReply)}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {discussion.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                      {discussion.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Community Groups</h1>
          <p className="text-slate-600">Connect with farmers and specialists in your area of interest</p>
        </div>
        <Button onClick={() => setShowCreateGroup(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4 border-b">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("discover")}
          className={activeTab === "discover" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          Discover Groups
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("my-groups")}
          className={activeTab === "my-groups" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          My Groups (5)
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("trending")}
          className={activeTab === "trending" ? "border-b-2 border-teal-500 text-teal-600" : "text-slate-600"}
        >
          <TrendingUp className="h-4 w-4 mr-1" />
          Trending
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className="text-slate-600 hover:text-slate-800 bg-transparent"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <Card
            key={group.id}
            className="hover:shadow-lg transition-all cursor-pointer border-0 shadow-md"
            onClick={() => setSelectedGroup(group.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${group.color}-100 rounded-lg flex items-center justify-center`}>
                  <group.icon className={`h-6 w-6 text-${group.color}-600`} />
                </div>
                <div className="flex items-center gap-1">
                  {group.isPrivate ? (
                    <Lock className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Globe className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>

              <h3 className="font-bold text-slate-800 mb-2 hover:text-teal-600">{group.name}</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{group.description}</p>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {group.memberCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {group.postCount}
                  </div>
                </div>
                <span className="text-xs">{getTimeAgo(group.lastActivity)}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {group.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {group.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{group.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {group.moderators.slice(0, 3).map((mod, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-white">
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                        {mod
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-teal-600 border-teal-200 hover:bg-teal-50 bg-transparent"
                >
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-green-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle>Create New Group</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateGroup(false)}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Group Name</label>
                <Input placeholder="Enter group name..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <Textarea placeholder="Describe what this group is about..." rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select className="w-full p-2 border border-slate-300 rounded-md">
                  <option>Livestock</option>
                  <option>Equipment</option>
                  <option>Weather</option>
                  <option>Crops</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white flex-1">Create Group</Button>
                <Button variant="outline" onClick={() => setShowCreateGroup(false)} className="border-slate-300">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
