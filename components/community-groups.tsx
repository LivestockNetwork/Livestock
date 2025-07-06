"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MapPin, MessageCircle, Search, Plus, Star, Shield, Heart, BookOpen, Wrench } from "lucide-react"

interface CommunityGroup {
  id: string
  name: string
  description: string
  category: string
  location: string
  memberCount: number
  isPrivate: boolean
  tags: string[]
  lastActivity: string
  avatar?: string
  isJoined?: boolean
}

const sampleGroups: CommunityGroup[] = [
  {
    id: "1",
    name: "NSW Central Coast Emergency Response",
    description:
      "Coordinating emergency preparedness and response for rural properties around Gosford, Wyong, and surrounding areas.",
    category: "Emergency",
    location: "Central Coast, NSW",
    memberCount: 247,
    isPrivate: false,
    tags: ["Emergency Planning", "Bushfire", "Flood", "Community Response"],
    lastActivity: "2 hours ago",
    isJoined: true,
  },
  {
    id: "2",
    name: "Hunter Valley Cattle Farmers",
    description:
      "Supporting cattle farmers across the Hunter Valley with market insights, breeding advice, and equipment sharing.",
    category: "Livestock",
    location: "Hunter Valley, NSW",
    memberCount: 189,
    isPrivate: false,
    tags: ["Cattle", "Breeding", "Markets", "Equipment"],
    lastActivity: "4 hours ago",
    isJoined: false,
  },
  {
    id: "3",
    name: "Blue Mountains Bushfire Preparedness",
    description:
      "Private group for Blue Mountains residents focusing on bushfire risk assessment and evacuation planning.",
    category: "Emergency",
    location: "Blue Mountains, NSW",
    memberCount: 156,
    isPrivate: true,
    tags: ["Bushfire", "Evacuation", "Risk Assessment"],
    lastActivity: "1 day ago",
    isJoined: false,
  },
  {
    id: "4",
    name: "Southern Highlands Sheep & Wool",
    description:
      "Connecting sheep farmers in the Southern Highlands for wool marketing, shearing services, and pasture management.",
    category: "Livestock",
    location: "Southern Highlands, NSW",
    memberCount: 134,
    isPrivate: false,
    tags: ["Sheep", "Wool", "Shearing", "Pasture"],
    lastActivity: "6 hours ago",
    isJoined: true,
  },
  {
    id: "5",
    name: "Riverina Equipment Share",
    description:
      "Community equipment sharing network for the Riverina region. Share tractors, tools, and specialized farming equipment.",
    category: "Equipment",
    location: "Riverina, NSW",
    memberCount: 203,
    isPrivate: false,
    tags: ["Equipment Sharing", "Tractors", "Tools", "Cost Saving"],
    lastActivity: "3 hours ago",
    isJoined: false,
  },
  {
    id: "6",
    name: "Hawkesbury River Flood Watch",
    description: "Monitoring flood conditions and coordinating community response along the Hawkesbury River system.",
    category: "Emergency",
    location: "Hawkesbury Region, NSW",
    memberCount: 178,
    isPrivate: false,
    tags: ["Flood Monitoring", "River Levels", "Community Alert"],
    lastActivity: "5 hours ago",
    isJoined: false,
  },
]

const categoryIcons = {
  Emergency: Shield,
  Livestock: Heart,
  Equipment: Wrench,
  Education: BookOpen,
  Social: Users,
}

const categoryColors = {
  Emergency: "bg-red-100 text-red-800 border-red-200",
  Livestock: "bg-green-100 text-green-800 border-green-200",
  Equipment: "bg-blue-100 text-blue-800 border-blue-200",
  Education: "bg-purple-100 text-purple-800 border-purple-200",
  Social: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

export default function CommunityGroups() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [groups, setGroups] = useState(sampleGroups)

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleJoinGroup = (groupId: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              isJoined: !group.isJoined,
              memberCount: group.isJoined ? group.memberCount - 1 : group.memberCount + 1,
            }
          : group,
      ),
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Community Groups</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with rural communities across NSW. Join groups focused on emergency preparedness, livestock farming,
          equipment sharing, and local support networks.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search groups by name, location, or interests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="Emergency">Emergency</TabsTrigger>
          <TabsTrigger value="Livestock">Livestock</TabsTrigger>
          <TabsTrigger value="Equipment">Equipment</TabsTrigger>
          <TabsTrigger value="Education">Education</TabsTrigger>
          <TabsTrigger value="Social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Results Summary */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredGroups.length} of {groups.length} groups
            {searchTerm && ` for "${searchTerm}"`}
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => {
              const CategoryIcon = categoryIcons[group.category as keyof typeof categoryIcons] || Users
              const categoryColorClass =
                categoryColors[group.category as keyof typeof categoryColors] || categoryColors.Social

              return (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={group.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <CategoryIcon className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg leading-tight">{group.name}</CardTitle>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            {group.location}
                          </div>
                        </div>
                      </div>
                      {group.isPrivate && (
                        <Badge variant="outline" className="text-xs">
                          Private
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm line-clamp-3">{group.description}</CardDescription>

                    {/* Category Badge */}
                    <Badge className={`${categoryColorClass} border`}>
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {group.category}
                    </Badge>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {group.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {group.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{group.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {group.memberCount} members
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {group.lastActivity}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleJoinGroup(group.id)}
                      variant={group.isJoined ? "outline" : "default"}
                      className={`w-full ${
                        group.isJoined
                          ? "border-green-600 text-green-600 hover:bg-green-50"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {group.isJoined ? (
                        <>
                          <Star className="h-4 w-4 mr-2 fill-current" />
                          Joined
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          {group.isPrivate ? "Request to Join" : "Join Group"}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? `No groups match your search for "${searchTerm}"`
                  : "No groups available in this category"}
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create the First Group
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
