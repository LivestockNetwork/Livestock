"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Edit,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Settings,
  Share2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"

interface UserProfile {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    joinDate: string
    location: string
    region: string
  }
  propertyDetails: {
    propertyType: string
    propertySize: string
    description: string
    photos: string[]
  }
  livestock: {
    types: string[]
    details: { [key: string]: { count: number; description: string } }
  }
  equipment: {
    available: string[]
    details: { [key: string]: string }
  }
  services: {
    canOffer: string[]
    needHelp: string[]
  }
  contact: {
    phone: string
    preferredContact: string
    availability: string
  }
  stats: {
    helpRequests: number
    helpProvided: number
    communityRating: number
    memberSince: string
  }
}

export default function ProfilePage() {
  const [isPublicView, setIsPublicView] = useState(false)
  const [userProfile] = useState<UserProfile>({
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      joinDate: "January 2025",
      location: "Taree, NSW",
      region: "Manning Valley",
    },
    propertyDetails: {
      propertyType: "cattle-farm",
      propertySize: "100-500",
      description:
        "Family cattle farm running 200 head of Angus cattle. Located 15km from Taree with good road access. We focus on sustainable grazing practices and are always happy to help neighbors.",
      photos: ["/images/john-deere-tractor.png", "/images/angus-steers.png"],
    },
    livestock: {
      types: ["cattle", "horses"],
      details: {
        cattle: { count: 200, description: "Angus steers and breeding cows" },
        horses: { count: 4, description: "Working horses for mustering" },
      },
    },
    equipment: {
      available: ["truck", "trailer", "tractor", "generator"],
      details: {},
    },
    services: {
      canOffer: ["transport", "machinery", "emergency-help", "feed-supply"],
      needHelp: ["veterinary", "equipment-repair"],
    },
    contact: {
      phone: "0412 345 678",
      preferredContact: "both",
      availability: "Weekends and evenings, emergency anytime",
    },
    stats: {
      helpRequests: 3,
      helpProvided: 12,
      communityRating: 4.8,
      memberSince: "2 weeks",
    },
  })

  const propertyTypeLabels: { [key: string]: string } = {
    "cattle-farm": "🐄 Cattle Farm",
    "horse-property": "🐴 Horse Property",
    "mixed-farm": "🚜 Mixed Farm",
    "hobby-farm": "🐓 Hobby Farm",
    cropping: "🌾 Cropping",
    "rural-residential": "🏡 Rural Residential",
    "town-resident": "🏘️ Town Resident",
  }

  const propertySizeLabels: { [key: string]: string } = {
    "under-5": "Under 5 acres",
    "5-20": "5-20 acres",
    "20-100": "20-100 acres",
    "100-500": "100-500 acres",
    "500-plus": "500+ acres",
    "no-property": "No rural property",
  }

  const livestockLabels: { [key: string]: string } = {
    cattle: "🐄 Cattle",
    horses: "🐴 Horses",
    sheep: "🐑 Sheep",
    goats: "🐐 Goats",
    pigs: "🐷 Pigs",
    chickens: "🐓 Chickens",
    alpacas: "🦙 Alpacas",
    other: "🦆 Other",
  }

  const equipmentLabels: { [key: string]: string } = {
    truck: "🚛 Truck/4WD",
    trailer: "🚚 Livestock Trailer",
    tractor: "🚜 Tractor",
    generator: "⚡ Generator",
    "water-pump": "💧 Water Pump",
    chainsaw: "🪚 Chainsaw",
    welder: "🔧 Welder",
    "post-driver": "🔨 Post Driver",
    slasher: "🌾 Slasher/Mower",
    "spray-unit": "💨 Spray Unit",
  }

  const serviceLabels: { [key: string]: string } = {
    transport: "🚛 Livestock Transport",
    agistment: "🌾 Agistment/Grazing",
    fencing: "🪚 Fencing Work",
    machinery: "🚜 Machinery Work",
    veterinary: "🏥 Animal Health",
    "feed-supply": "🌾 Feed Supply",
    "emergency-help": "🚨 Emergency Response",
    "equipment-repair": "🔧 Equipment Repair",
    labor: "👥 General Labor",
    coordination: "📱 Community Coordination",
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const total = 8

    if (userProfile.propertyDetails.propertyType) completed++
    if (userProfile.propertyDetails.propertySize) completed++
    if (userProfile.propertyDetails.description) completed++
    if (userProfile.livestock.types.length > 0) completed++
    if (userProfile.equipment.available.length > 0) completed++
    if (userProfile.services.canOffer.length > 0) completed++
    if (userProfile.services.needHelp.length > 0) completed++
    if (userProfile.contact.phone) completed++

    return Math.round((completed / total) * 100)
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 bg-transparent"
                onClick={() => (window.location.href = "/community")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Community
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
                <p className="text-slate-600">
                  {userProfile.personalInfo.firstName} {userProfile.personalInfo.lastName} •{" "}
                  {userProfile.personalInfo.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPublicView(!isPublicView)}
                className="border-slate-300 text-slate-700 bg-transparent"
              >
                {isPublicView ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {isPublicView ? "Private View" : "Public View"}
              </Button>
              <Button
                size="sm"
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                onClick={() => (window.location.href = "/profile-setup")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden sticky top-6">
              <CardContent className="p-6">
                {/* Profile Photo & Basic Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {userProfile.personalInfo.firstName} {userProfile.personalInfo.lastName}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-slate-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    {userProfile.personalInfo.location}
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-sm">
                    {userProfile.personalInfo.region} Member
                  </Badge>
                </div>

                {/* Community Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-semibold text-green-800">Help Provided</span>
                    <span className="text-lg font-bold text-green-600">{userProfile.stats.helpProvided}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-semibold text-blue-800">Help Requests</span>
                    <span className="text-lg font-bold text-blue-600">{userProfile.stats.helpRequests}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span className="text-sm font-semibold text-amber-800">Community Rating</span>
                    <span className="text-lg font-bold text-amber-600">⭐ {userProfile.stats.communityRating}/5.0</span>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">Profile Completion</span>
                    <span className="text-sm text-slate-600">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getCompletionPercentage()}%` }}
                    ></div>
                  </div>
                  {getCompletionPercentage() < 100 && (
                    <p className="text-xs text-slate-500 mt-2">
                      Complete your profile to get better matches and help more neighbors
                    </p>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full border-slate-300 text-slate-700 bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-slate-300 text-slate-700 bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                </div>

                {/* Member Since */}
                <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-500 text-sm">
                    <Calendar className="h-4 w-4" />
                    Member since {userProfile.personalInfo.joinDate}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Details */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Property Details</h3>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Property Type</label>
                    <p className="text-slate-800">{propertyTypeLabels[userProfile.propertyDetails.propertyType]}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600">Property Size</label>
                    <p className="text-slate-800">{propertySizeLabels[userProfile.propertyDetails.propertySize]}</p>
                  </div>
                </div>

                {userProfile.propertyDetails.description && (
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-slate-600">Description</label>
                    <p className="text-slate-700 leading-relaxed">{userProfile.propertyDetails.description}</p>
                  </div>
                )}

                {userProfile.propertyDetails.photos.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-slate-600 mb-2 block">Property Photos</label>
                    <div className="grid grid-cols-2 gap-3">
                      {userProfile.propertyDetails.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo || "/placeholder.svg"}
                          alt={`Property photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Livestock */}
            {userProfile.livestock.types.length > 0 && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Livestock</h3>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userProfile.livestock.types.map((type) => (
                      <div key={type} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-800">{livestockLabels[type]}</span>
                          <Badge className="bg-blue-100 text-blue-700 text-sm">
                            {userProfile.livestock.details[type]?.count || 0}
                          </Badge>
                        </div>
                        {userProfile.livestock.details[type]?.description && (
                          <p className="text-sm text-slate-600">{userProfile.livestock.details[type].description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Equipment */}
            {userProfile.equipment.available.length > 0 && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Available Equipment</h3>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {userProfile.equipment.available.map((equipment) => (
                      <div key={equipment} className="p-3 bg-purple-50 rounded-lg text-center">
                        <span className="text-sm font-semibold text-purple-800">{equipmentLabels[equipment]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Services */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Services</h3>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userProfile.services.canOffer.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">✅ Can Offer</h4>
                      <div className="space-y-2">
                        {userProfile.services.canOffer.map((service) => (
                          <div key={service} className="p-2 bg-green-50 rounded-lg">
                            <span className="text-sm text-green-800">{serviceLabels[service]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {userProfile.services.needHelp.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-3">🤝 Need Help With</h4>
                      <div className="space-y-2">
                        {userProfile.services.needHelp.map((service) => (
                          <div key={service} className="p-2 bg-amber-50 rounded-lg">
                            <span className="text-sm text-amber-800">{serviceLabels[service]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            {!isPublicView && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Contact Information</h3>
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                    <p className="text-sm text-amber-800">
                      <strong>Private Information:</strong> This section is only visible to you and verified community
                      members who need to contact you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </label>
                      <p className="text-slate-800">{userProfile.personalInfo.email}</p>
                    </div>
                    {userProfile.contact.phone && (
                      <div>
                        <label className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Phone
                        </label>
                        <p className="text-slate-800">{userProfile.contact.phone}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Preferred Contact</label>
                      <p className="text-slate-800 capitalize">{userProfile.contact.preferredContact}</p>
                    </div>
                    {userProfile.contact.availability && (
                      <div>
                        <label className="text-sm font-semibold text-slate-600">Availability</label>
                        <p className="text-slate-800">{userProfile.contact.availability}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {isPublicView && (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Contact {userProfile.personalInfo.firstName}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Connect through the community platform to get in touch with {userProfile.personalInfo.firstName}
                    </p>
                    <Button
                      size="lg"
                      className="text-white font-semibold"
                      style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                    >
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
