"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MapPin, Phone, Mail, Users, Truck, Star, MessageCircle, Shield, Clock, Award } from "lucide-react"

interface Member {
  id: string
  name: string
  location: string
  distance: number
  propertyType: string
  skills: string[]
  equipment: string[]
  livestock: string[]
  rating: number
  reviewCount: number
  joinedDate: Date
  lastActive: Date
  isVerified: boolean
  helpOffered: string[]
  helpNeeded: string[]
  contactPreference: "phone" | "message" | "both"
  emergencyContact: boolean
  avatar?: string
}

export default function MemberDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("distance")

  const members: Member[] = [
    {
      id: "1",
      name: "Sarah Mitchell",
      location: "Taree, NSW",
      distance: 5.2,
      propertyType: "Cattle Station",
      skills: ["Livestock Management", "Veterinary First Aid", "Heavy Machinery"],
      equipment: ["Cattle Truck", "Tractor", "Stock Trailer"],
      livestock: ["Cattle", "Horses"],
      rating: 4.9,
      reviewCount: 23,
      joinedDate: new Date("2023-03-15"),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isVerified: true,
      helpOffered: ["Livestock Transport", "Emergency Agistment", "Veterinary Assistance"],
      helpNeeded: ["Hay Cutting", "Fencing Work"],
      contactPreference: "both",
      emergencyContact: true,
    },
    {
      id: "2",
      name: "Tom & Jenny Roberts",
      location: "Wingham, NSW",
      distance: 12.8,
      propertyType: "Mixed Farming",
      skills: ["Crop Management", "Equipment Repair", "Flood Response"],
      equipment: ["Header", "Seeder", "Spray Rig", "Boat"],
      livestock: ["Sheep", "Cattle"],
      rating: 4.7,
      reviewCount: 18,
      joinedDate: new Date("2023-01-20"),
      lastActive: new Date(Date.now() - 30 * 60 * 1000),
      isVerified: true,
      helpOffered: ["Harvest Equipment", "Flood Evacuation", "Crop Advice"],
      helpNeeded: ["Livestock Handling", "Shearing"],
      contactPreference: "phone",
      emergencyContact: true,
    },
    {
      id: "3",
      name: "David Chen",
      location: "Gloucester, NSW",
      distance: 18.5,
      propertyType: "Horse Stud",
      skills: ["Horse Training", "Breeding", "Property Maintenance"],
      equipment: ["Horse Float", "Tractor", "Slasher"],
      livestock: ["Horses"],
      rating: 4.8,
      reviewCount: 31,
      joinedDate: new Date("2022-11-10"),
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isVerified: true,
      helpOffered: ["Horse Transport", "Training Advice", "Temporary Agistment"],
      helpNeeded: ["Hay Supply", "Fencing"],
      contactPreference: "message",
      emergencyContact: false,
    },
    {
      id: "4",
      name: "Manning Valley Machinery",
      location: "Taree, NSW",
      distance: 3.1,
      propertyType: "Agricultural Business",
      skills: ["Equipment Repair", "Parts Supply", "Technical Support"],
      equipment: ["Workshop", "Spare Parts", "Diagnostic Tools"],
      livestock: [],
      rating: 4.6,
      reviewCount: 45,
      joinedDate: new Date("2023-02-01"),
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isVerified: true,
      helpOffered: ["Equipment Repair", "Parts Supply", "Emergency Callout"],
      helpNeeded: [],
      contactPreference: "both",
      emergencyContact: true,
    },
    {
      id: "5",
      name: "Lisa Thompson",
      location: "Krambach, NSW",
      distance: 22.3,
      propertyType: "Sheep & Wool",
      skills: ["Sheep Management", "Wool Classing", "Pasture Management"],
      equipment: ["Sheep Truck", "Shearing Equipment", "ATV"],
      livestock: ["Sheep"],
      rating: 4.9,
      reviewCount: 27,
      joinedDate: new Date("2023-04-05"),
      lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isVerified: true,
      helpOffered: ["Shearing Services", "Sheep Transport", "Wool Marketing"],
      helpNeeded: ["Pasture Improvement", "Water System"],
      contactPreference: "phone",
      emergencyContact: true,
    },
  ]

  const skillCategories = [
    "Livestock Management",
    "Crop Management",
    "Equipment Repair",
    "Veterinary First Aid",
    "Heavy Machinery",
    "Flood Response",
    "Horse Training",
    "Sheep Management",
    "Pasture Management",
  ]

  const equipmentCategories = ["Tractor", "Truck", "Header", "Trailer", "Boat", "ATV", "Workshop", "Shearing Equipment"]

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      member.equipment.some((eq) => eq.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some(
        (filter) =>
          member.skills.includes(filter) ||
          member.equipment.includes(filter) ||
          (filter === "Emergency Contact" && member.emergencyContact) ||
          (filter === "Verified" && member.isVerified),
      )

    return matchesSearch && matchesFilters
  })

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.distance - b.distance
      case "rating":
        return b.rating - a.rating
      case "recent":
        return b.lastActive.getTime() - a.lastActive.getTime()
      default:
        return 0
    }
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Member Directory</h2>
          <p className="text-slate-600">{sortedMembers.length} members in your area</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="distance">Sort by Distance</option>
            <option value="rating">Sort by Rating</option>
            <option value="recent">Sort by Recent Activity</option>
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search members by name, location, skills, or equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedFilters.includes("Verified") ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter("Verified")}
            className="text-xs"
          >
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </Button>
          <Button
            variant={selectedFilters.includes("Emergency Contact") ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter("Emergency Contact")}
            className="text-xs"
          >
            Emergency Contact
          </Button>

          {skillCategories.slice(0, 5).map((skill) => (
            <Button
              key={skill}
              variant={selectedFilters.includes(skill) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(skill)}
              className="text-xs"
            >
              {skill}
            </Button>
          ))}

          {equipmentCategories.slice(0, 4).map((equipment) => (
            <Button
              key={equipment}
              variant={selectedFilters.includes(equipment) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(equipment)}
              className="text-xs"
            >
              <Truck className="h-3 w-3 mr-1" />
              {equipment}
            </Button>
          ))}
        </div>

        {selectedFilters.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Active filters:</span>
            {selectedFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="text-xs">
                {filter}
                <button onClick={() => toggleFilter(filter)} className="ml-1 hover:text-red-500">
                  ×
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setSelectedFilters([])} className="text-xs text-slate-500">
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMembers.map((member) => (
          <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              {/* Member Header */}
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">{member.name}</h3>
                    {member.isVerified && <Shield className="h-4 w-4 text-green-500" />}
                    {member.emergencyContact && <Badge className="bg-red-100 text-red-700 text-xs">Emergency</Badge>}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {member.location} • {member.distance}km
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(member.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-600">
                      {member.rating} ({member.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-3">
                <Badge variant="outline" className="text-xs">
                  {member.propertyType}
                </Badge>
              </div>

              {/* Skills */}
              {member.skills.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-slate-700 mb-1">Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{member.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Equipment */}
              {member.equipment.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-slate-700 mb-1">Equipment:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.equipment.slice(0, 3).map((equipment) => (
                      <Badge key={equipment} variant="outline" className="text-xs">
                        <Truck className="h-2 w-2 mr-1" />
                        {equipment}
                      </Badge>
                    ))}
                    {member.equipment.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.equipment.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Help Offered */}
              {member.helpOffered.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-green-700 mb-1">Can Help With:</h4>
                  <p className="text-xs text-slate-600">
                    {member.helpOffered.slice(0, 2).join(", ")}
                    {member.helpOffered.length > 2 && "..."}
                  </p>
                </div>
              )}

              {/* Activity */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Active {getTimeAgo(member.lastActive)}
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Joined {member.joinedDate.getFullYear()}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white flex-1">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Message
                </Button>
                {member.contactPreference !== "message" && (
                  <Button size="sm" variant="outline" className="border-slate-300 bg-transparent">
                    <Phone className="h-3 w-3" />
                  </Button>
                )}
                <Button size="sm" variant="outline" className="border-slate-300 bg-transparent">
                  <Mail className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No members found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters to find more members.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedFilters([])
              }}
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
