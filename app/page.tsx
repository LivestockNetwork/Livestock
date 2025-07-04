"use client"

import { useState } from "react"
import {
  AlertTriangle,
  MapPin,
  Phone,
  Users,
  Zap,
  Droplets,
  Wind,
  Thermometer,
  Truck,
  Stethoscope,
  Package,
  Star,
  Shield,
  MessageSquare,
  Plus,
  Home,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function EmergencyLivestockSystem() {
  const [selectedProperty, setSelectedProperty] = useState("farm-1")
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [userLocation, setUserLocation] = useState("Riverside Farm, Sector 7")
  const [searchRadius, setSearchRadius] = useState("25")
  const [animalType, setAnimalType] = useState("all")
  const [serviceCategory, setServiceCategory] = useState("all")
  const [communityFilter, setCommunityFilter] = useState("local")
  const [postCategory, setPostCategory] = useState("emergency")
  const [newPost, setNewPost] = useState("")
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [onboardingStep, setOnboardingStep] = useState("welcome")
  const [userType, setUserType] = useState("")

  // Onboarding form states
  const [propertyForm, setPropertyForm] = useState({
    propertyName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    coordinates: "",
    propertySize: "",
    livestock: [{ type: "cattle", count: "", location: "" }],
    emergencyContact: "",
    specialNeeds: "",
  })

  const [helpForm, setHelpForm] = useState({
    name: "",
    phone: "",
    email: "",
    currentLocation: "",
    helpType: "",
    urgency: "",
    livestock: [{ type: "cattle", count: "", condition: "" }],
    description: "",
    transportNeeded: false,
    veterinaryNeeded: false,
    shelterNeeded: false,
  })

  const properties = [
    {
      id: "farm-1",
      name: "Riverside Farm",
      location: "Sector 7, Grid Reference: 34.5°S 142.1°E",
      riskLevel: "HIGH",
      livestock: [
        { type: "Cattle", count: 150, location: "North Paddock", status: "Safe" },
        { type: "Sheep", count: 300, location: "South Paddock", status: "At Risk" },
        { type: "Horses", count: 12, location: "Stable Block", status: "Evacuated" },
      ],
    },
    {
      id: "farm-2",
      name: "Hill Country Station",
      location: "Sector 12, Grid Reference: 34.7°S 142.3°E",
      riskLevel: "MODERATE",
      livestock: [
        { type: "Cattle", count: 200, location: "East Paddock", status: "Safe" },
        { type: "Sheep", count: 450, location: "West Paddock", status: "Safe" },
      ],
    },
  ]

  const communityPosts = [
    {
      id: "post-1",
      author: {
        name: "Sarah Mitchell",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Millfield District",
        verified: true,
      },
      timestamp: "2 hours ago",
      category: "Emergency Alert",
      scope: "local",
      title: "Fire approaching from the west - evacuating cattle now",
      content:
        "Just got word from RFS that the fire has jumped the highway. We're moving our 200 head of cattle to Thompson's place. Route via Back Road is still clear. Anyone else in Sector 8-10 should consider moving livestock ASAP.",
      images: ["/placeholder.svg?height=200&width=300"],
      location: "Sector 8, Millfield",
      urgency: "high",
      likes: 23,
      comments: 8,
      shares: 12,
      views: 156,
    },
    {
      id: "post-2",
      author: {
        name: "Tom Bradley",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Thompson Creek",
        verified: false,
      },
      timestamp: "4 hours ago",
      category: "Resource Sharing",
      scope: "local",
      title: "Free hay available for emergency evacuations",
      content:
        "Have 50 bales of good quality hay available for anyone who needs feed for evacuated livestock. Located at Thompson Creek - can deliver within 20km. Contact me on 0412 345 678.",
      images: [],
      location: "Thompson Creek",
      urgency: "medium",
      likes: 45,
      comments: 15,
      shares: 28,
      views: 234,
    },
  ]

  const emergencyContacts = [
    { name: "Emergency Services", number: "000", type: "Emergency" },
    { name: "Rural Fire Service", number: "1800 679 737", type: "Fire" },
    { name: "SES Flood Rescue", number: "132 500", type: "Flood" },
    { name: "Veterinary Emergency", number: "1300 838 363", type: "Veterinary" },
    { name: "Livestock Transport", number: "0412 345 678", type: "Transport" },
  ]

  const emergencyServices = [
    {
      id: "es-1",
      name: "Swift Livestock Transport",
      category: "Transport",
      type: "Emergency Transport",
      description:
        "24/7 emergency livestock evacuation service. Cattle trucks, horse floats, and sheep transport available.",
      distance: "8.5 km",
      responseTime: "30 mins",
      contact: "(02) 6789 4567",
      email: "emergency@swiftlivestock.com.au",
      services: ["Cattle Transport", "Horse Float", "Sheep Trucks", "Emergency Evacuation"],
      capacity: "Up to 50 cattle or 200 sheep per trip",
      pricing: "Emergency rates: $2.50/km + $150 callout",
      rating: 4.8,
      reviews: 127,
      available24h: true,
      emergencyPartner: true,
      sponsored: true,
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "es-2",
      name: "Rural Emergency Veterinary Services",
      category: "Veterinary",
      type: "Mobile Vet",
      description:
        "Emergency veterinary care for livestock during disasters. Trauma treatment, evacuation health checks.",
      distance: "12.2 km",
      responseTime: "45 mins",
      contact: "(02) 6789 8901",
      email: "emergency@ruralvet.com.au",
      services: ["Emergency Surgery", "Trauma Care", "Health Certificates", "Euthanasia"],
      capacity: "Mobile clinic with full surgical equipment",
      pricing: "Emergency callout: $280 + treatment costs",
      rating: 4.9,
      reviews: 89,
      available24h: true,
      emergencyPartner: true,
      sponsored: false,
      icon: <Stethoscope className="h-5 w-5" />,
    },
  ]

  const safeLocations = [
    {
      id: "sl-1",
      name: "Millfield Regional Showgrounds",
      type: "Livestock Facility",
      distance: "12.5 km",
      travelTime: "18 mins",
      capacity: {
        cattle: { max: 500, current: 120, available: 380 },
        sheep: { max: 800, current: 200, available: 600 },
        horses: { max: 100, current: 25, available: 75 },
        pets: { max: 50, current: 12, available: 38 },
      },
      facilities: ["Water", "Feed Storage", "Veterinary", "Shelter", "Loading Ramps"],
      contact: "(02) 6789 1234",
      address: "123 Showground Rd, Millfield",
      status: "Available",
      petFriendly: true,
      emergencyOnly: false,
    },
    {
      id: "sl-2",
      name: "Thompson's Emergency Livestock Depot",
      type: "Private Farm",
      distance: "8.2 km",
      travelTime: "12 mins",
      capacity: {
        cattle: { max: 200, current: 50, available: 150 },
        sheep: { max: 300, current: 100, available: 200 },
        horses: { max: 30, current: 8, available: 22 },
        pets: { max: 20, current: 5, available: 15 },
      },
      facilities: ["Water", "Basic Shelter", "Feed Available"],
      contact: "(02) 6789 5678",
      address: "456 Back Rd, Thompson Creek",
      status: "Available",
      petFriendly: true,
      emergencyOnly: true,
    },
  ]

  const weatherAlerts = [
    {
      type: "Fire Danger",
      level: "EXTREME",
      description: "Total Fire Ban in effect. Winds 45-60km/h, Temperature 38°C",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      type: "Flood Warning",
      level: "MODERATE",
      description: "River levels rising. Minor flooding expected in low-lying areas",
      icon: <Droplets className="h-4 w-4" />,
    },
  ]

  const currentProperty = properties.find((p) => p.id === selectedProperty)

  const filteredServices = emergencyServices.filter((service) => {
    if (serviceCategory === "all") return true
    return service.category.toLowerCase() === serviceCategory.toLowerCase()
  })

  const sponsoredServices = emergencyServices.filter((service) => service.sponsored)

  const filteredPosts = communityPosts.filter((post) => {
    if (communityFilter === "all") return true
    return post.scope === communityFilter
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-red-300 bg-gradient-to-br from-red-50 to-red-100 shadow-red-100"
      case "medium":
        return "border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 shadow-amber-100"
      default:
        return "border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-slate-100"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Emergency Alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "Resource Sharing":
        return <Package className="h-4 w-4 text-emerald-600" />
      case "Help Request":
        return <Users className="h-4 w-4 text-blue-600" />
      case "Official Update":
        return <Shield className="h-4 w-4 text-purple-600" />
      case "Information":
        return <MessageSquare className="h-4 w-4 text-slate-600" />
      case "Success Story":
        return <Star className="h-4 w-4 text-yellow-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-slate-600" />
    }
  }

  const addLivestockRow = (formType: "property" | "help") => {
    if (formType === "property") {
      setPropertyForm({
        ...propertyForm,
        livestock: [...propertyForm.livestock, { type: "cattle", count: "", location: "" }],
      })
    } else {
      setHelpForm({
        ...helpForm,
        livestock: [...helpForm.livestock, { type: "cattle", count: "", condition: "" }],
      })
    }
  }

  const updateLivestockRow = (index: number, field: string, value: string, formType: "property" | "help") => {
    if (formType === "property") {
      const updated = [...propertyForm.livestock]
      updated[index] = { ...updated[index], [field]: value }
      setPropertyForm({ ...propertyForm, livestock: updated })
    } else {
      const updated = [...helpForm.livestock]
      updated[index] = { ...updated[index], [field]: value }
      setHelpForm({ ...helpForm, livestock: updated })
    }
  }

  const handlePropertySubmit = () => {
    console.log("Property registration:", propertyForm)
    setOnboardingStep("success")
  }

  const handleHelpSubmit = () => {
    console.log("Help request:", helpForm)
    setOnboardingStep("success")
  }

  const completeOnboarding = () => {
    setShowOnboarding(false)
    setOnboardingStep("welcome")
  }

  const transportFacilities = [
    {
      id: "tf-1",
      name: "Highway Rest Stop - Cattle Station",
      type: "Commercial Rest Stop",
      location: "Pacific Highway, 45km north of Grafton",
      distance: "125 km",
      travelTime: "1h 45m",
      coordinates: "-29.2°S 153.1°E",
      facilities: ["Water Troughs", "Feed Available", "Loading Ramps", "Shade", "Truck Parking", "Toilets"],
      capacity: {
        cattle: { max: 200, hourlyRate: 50 },
        sheep: { max: 500, hourlyRate: 100 },
        horses: { max: 50, hourlyRate: 20 },
      },
      pricing: {
        cattle: "$2.50 per head per hour",
        sheep: "$1.00 per head per hour",
        horses: "$5.00 per head per hour",
        minimumCharge: "$25.00",
      },
      operatingHours: "24/7",
      contact: "(02) 6642 1234",
      rating: 4.6,
      reviews: 89,
      amenities: ["Cafe", "Fuel Station", "Mechanic", "Accommodation"],
      emergencyOnly: false,
      bookingRequired: false,
    },
    {
      id: "tf-2",
      name: "Millfield Transport Hub",
      type: "Livestock Transport Hub",
      location: "New England Highway, Millfield",
      distance: "85 km",
      travelTime: "1h 15m",
      coordinates: "-32.1°S 151.2°E",
      facilities: ["Water", "Premium Feed", "Veterinary", "Wash Bays", "Weighbridge", "Loading Ramps"],
      capacity: {
        cattle: { max: 300, hourlyRate: 75 },
        sheep: { max: 800, hourlyRate: 200 },
        horses: { max: 80, hourlyRate: 30 },
      },
      pricing: {
        cattle: "$3.00 per head per hour",
        sheep: "$1.25 per head per hour",
        horses: "$6.00 per head per hour",
        minimumCharge: "$40.00",
      },
      operatingHours: "5:00 AM - 10:00 PM",
      contact: "(02) 6789 5678",
      rating: 4.8,
      reviews: 156,
      amenities: ["Restaurant", "Accommodation", "Truck Wash", "Tire Service"],
      emergencyOnly: false,
      bookingRequired: true,
    },
  ]

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {onboardingStep === "welcome" && (
            <Card className="text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-8 pt-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">
                  Your Complete Livestock Network
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2 mb-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-2 text-sm">
                    100% FREE TO JOIN
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-4 py-2 text-sm">
                    NO HIDDEN FEES
                  </Badge>
                </div>
                <CardDescription className="text-lg text-slate-600 mt-4">
                  Emergency response, transport planning, and community support. From crisis management to everyday
                  logistics - we've got your livestock covered.
                </CardDescription>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-slate-800 mb-2">Why is this free?</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    This platform is funded by emergency services partnerships, government rural safety initiatives, and
                    service provider advertising. Our mission is to protect rural communities - not profit from
                    emergencies. When you need help most, cost should never be a barrier.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-100 hover:scale-105 transform"
                    onClick={() => {
                      setUserType("property")
                      setOnboardingStep("property-form")
                    }}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <Home className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-emerald-800">Register My Property</h3>
                      <p className="text-emerald-700 text-sm mb-6">
                        Join our free emergency network and get priority access to rescue services, safe locations, and
                        community support. No subscription fees, no hidden costs - just protection when you need it
                        most.
                      </p>
                      <div className="space-y-3 text-xs text-emerald-600 mb-6">
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Register livestock locations
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Connect with emergency services
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Join local community network
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Access evacuation planning
                        </p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 shadow-lg">
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-red-400 bg-gradient-to-br from-red-50 to-orange-100 hover:scale-105 transform"
                    onClick={() => {
                      setUserType("help")
                      setOnboardingStep("help-form")
                    }}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
                        <HelpCircle className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-red-800">I Need Help Now</h3>
                      <p className="text-red-700 text-sm mb-6">
                        Get immediate help from emergency responders, transport services, veterinary care, and community
                        volunteers. Completely free during emergencies - because every second counts and cost shouldn't.
                      </p>
                      <div className="space-y-3 text-xs text-red-600 mb-6">
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Emergency transport services
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Find safe locations nearby
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Connect with volunteers
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Access veterinary care
                        </p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 shadow-lg">
                        Get Help Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white/60 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">2,847</div>
                    <div className="text-xs text-slate-600">Properties Protected</div>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">15,623</div>
                    <div className="text-xs text-slate-600">Animals Safely Evacuated</div>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-xs text-slate-600">Emergency Response</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Trusted by Rural Fire Service</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>SES Emergency Partner</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Government Supported</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Already part of our network? Jump straight to your emergency dashboard.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowOnboarding(false)}
                    className="border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Skip to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {onboardingStep === "property-form" && (
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Home className="h-6 w-6" />
                  </div>
                  Register Your Property
                </CardTitle>
                <CardDescription className="text-emerald-100 text-base">
                  Help us understand your property and livestock so we can provide better emergency support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="property-name" className="text-slate-700 font-medium">
                      Property Name *
                    </Label>
                    <Input
                      id="property-name"
                      value={propertyForm.propertyName}
                      onChange={(e) => setPropertyForm({ ...propertyForm, propertyName: e.target.value })}
                      placeholder="e.g., Riverside Farm"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="owner-name" className="text-slate-700 font-medium">
                      Owner/Manager Name *
                    </Label>
                    <Input
                      id="owner-name"
                      value={propertyForm.ownerName}
                      onChange={(e) => setPropertyForm({ ...propertyForm, ownerName: e.target.value })}
                      placeholder="Your full name"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={propertyForm.phone}
                      onChange={(e) => setPropertyForm({ ...propertyForm, phone: e.target.value })}
                      placeholder="0412 345 678"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={propertyForm.email}
                      onChange={(e) => setPropertyForm({ ...propertyForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-slate-700 font-medium">
                    Property Address *
                  </Label>
                  <Input
                    id="address"
                    value={propertyForm.address}
                    onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                    placeholder="123 Rural Road, Township, State, Postcode"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="coordinates" className="text-slate-700 font-medium">
                      GPS Coordinates (if known)
                    </Label>
                    <Input
                      id="coordinates"
                      value={propertyForm.coordinates}
                      onChange={(e) => setPropertyForm({ ...propertyForm, coordinates: e.target.value })}
                      placeholder="e.g., -34.5°S 142.1°E"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="property-size" className="text-slate-700 font-medium">
                      Property Size
                    </Label>
                    <Input
                      id="property-size"
                      value={propertyForm.propertySize}
                      onChange={(e) => setPropertyForm({ ...propertyForm, propertySize: e.target.value })}
                      placeholder="e.g., 500 hectares"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700 font-medium text-lg">Livestock Information *</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addLivestockRow("property")}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Livestock
                    </Button>
                  </div>
                  {propertyForm.livestock.map((animal, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-2 border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50"
                    >
                      <Select
                        value={animal.type}
                        onValueChange={(value) => updateLivestockRow(index, "type", value, "property")}
                      >
                        <SelectTrigger className="border-slate-300 focus:border-emerald-500">
                          <SelectValue placeholder="Animal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cattle">Cattle</SelectItem>
                          <SelectItem value="sheep">Sheep</SelectItem>
                          <SelectItem value="horses">Horses</SelectItem>
                          <SelectItem value="goats">Goats</SelectItem>
                          <SelectItem value="pigs">Pigs</SelectItem>
                          <SelectItem value="poultry">Poultry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Number of animals"
                        value={animal.count}
                        onChange={(e) => updateLivestockRow(index, "count", e.target.value, "property")}
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                      <Input
                        placeholder="Location (e.g., North Paddock)"
                        value={animal.location}
                        onChange={(e) => updateLivestockRow(index, "location", e.target.value, "property")}
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="emergency-contact" className="text-slate-700 font-medium">
                    Emergency Contact (Alternative Person)
                  </Label>
                  <Input
                    id="emergency-contact"
                    value={propertyForm.emergencyContact}
                    onChange={(e) => setPropertyForm({ ...propertyForm, emergencyContact: e.target.value })}
                    placeholder="Name and phone number of backup contact"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="special-needs" className="text-slate-700 font-medium">
                    Special Requirements or Notes
                  </Label>
                  <Textarea
                    id="special-needs"
                    value={propertyForm.specialNeeds}
                    onChange={(e) => setPropertyForm({ ...propertyForm, specialNeeds: e.target.value })}
                    placeholder="Any special needs, medical conditions, or important information about your livestock or property"
                    rows={4}
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex gap-4 pt-8 border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={() => setOnboardingStep("welcome")}
                    className="flex items-center gap-2 border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Options
                  </Button>
                  <Button
                    onClick={handlePropertySubmit}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 shadow-lg"
                  >
                    Register Property
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {onboardingStep === "help-form" && (
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-white/20 rounded-full animate-pulse">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  Emergency Help Request
                </CardTitle>
                <CardDescription className="text-red-100 text-base">
                  Tell us about your situation so we can connect you with the right help immediately
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <Alert className="border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="text-red-800 font-bold">Life-Threatening Emergency?</AlertTitle>
                  <AlertDescription className="text-red-700 font-medium">
                    If this is a life-threatening emergency, call 000 immediately before filling out this form.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="help-name" className="text-slate-700 font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="help-name"
                      value={helpForm.name}
                      onChange={(e) => setHelpForm({ ...helpForm, name: e.target.value })}
                      placeholder="Your full name"
                      className="border-slate-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="help-phone" className="text-slate-700 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="help-phone"
                      value={helpForm.phone}
                      onChange={(e) => setHelpForm({ ...helpForm, phone: e.target.value })}
                      placeholder="0412 345 678"
                      className="border-slate-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="help-location" className="text-slate-700 font-medium">
                    Current Location *
                  </Label>
                  <Input
                    id="help-location"
                    value={helpForm.currentLocation}
                    onChange={(e) => setHelpForm({ ...helpForm, currentLocation: e.target.value })}
                    placeholder="Your current address or GPS coordinates"
                    className="border-slate-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="help-type" className="text-slate-700 font-medium">
                      Type of Help Needed *
                    </Label>
                    <Select
                      value={helpForm.helpType}
                      onValueChange={(value) => setHelpForm({ ...helpForm, helpType: value })}
                    >
                      <SelectTrigger className="border-slate-300 focus:border-red-500">
                        <SelectValue placeholder="Select help type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="evacuation">Livestock Evacuation</SelectItem>
                        <SelectItem value="transport">Transport Services</SelectItem>
                        <SelectItem value="veterinary">Veterinary Care</SelectItem>
                        <SelectItem value="shelter">Emergency Shelter</SelectItem>
                        <SelectItem value="feed">Feed and Water</SelectItem>
                        <SelectItem value="equipment">Equipment/Fencing</SelectItem>
                        <SelectItem value="multiple">Multiple Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="urgency" className="text-slate-700 font-medium">
                      Urgency Level *
                    </Label>
                    <Select
                      value={helpForm.urgency}
                      onValueChange={(value) => setHelpForm({ ...helpForm, urgency: value })}
                    >
                      <SelectTrigger className="border-slate-300 focus:border-red-500">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical - Immediate danger</SelectItem>
                        <SelectItem value="urgent">Urgent - Within 2 hours</SelectItem>
                        <SelectItem value="moderate">Moderate - Within 24 hours</SelectItem>
                        <SelectItem value="low">Low - Planning ahead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700 font-medium text-lg">Livestock Needing Help *</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addLivestockRow("help")}
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Livestock
                    </Button>
                  </div>
                  {helpForm.livestock.map((animal, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-2 border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-red-50"
                    >
                      <Select
                        value={animal.type}
                        onValueChange={(value) => updateLivestockRow(index, "type", value, "help")}
                      >
                        <SelectTrigger className="border-slate-300 focus:border-red-500">
                          <SelectValue placeholder="Animal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cattle">Cattle</SelectItem>
                          <SelectItem value="sheep">Sheep</SelectItem>
                          <SelectItem value="horses">Horses</SelectItem>
                          <SelectItem value="goats">Goats</SelectItem>
                          <SelectItem value="pigs">Pigs</SelectItem>
                          <SelectItem value="poultry">Poultry</SelectItem>
                          <SelectItem value="pets">Pets</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Number of animals"
                        value={animal.count}
                        onChange={(e) => updateLivestockRow(index, "count", e.target.value, "help")}
                        className="border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                      <Select
                        value={animal.condition}
                        onValueChange={(value) => updateLivestockRow(index, "condition", value, "help")}
                      >
                        <SelectTrigger className="border-slate-300 focus:border-red-500">
                          <SelectValue placeholder="Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthy">Healthy</SelectItem>
                          <SelectItem value="injured">Injured</SelectItem>
                          <SelectItem value="sick">Sick</SelectItem>
                          <SelectItem value="pregnant">Pregnant</SelectItem>
                          <SelectItem value="young">Young animals</SelectItem>
                          <SelectItem value="elderly">Elderly animals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="help-description" className="text-slate-700 font-medium">
                    Describe Your Situation *
                  </Label>
                  <Textarea
                    id="help-description"
                    value={helpForm.description}
                    onChange={(e) => setHelpForm({ ...helpForm, description: e.target.value })}
                    placeholder="Please describe your current situation, what help you need, and any time constraints"
                    rows={4}
                    className="border-slate-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-700 font-medium text-lg">Additional Services Needed</Label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={helpForm.transportNeeded}
                        onChange={(e) => setHelpForm({ ...helpForm, transportNeeded: e.target.checked })}
                        className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Transport/Evacuation vehicles needed</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={helpForm.veterinaryNeeded}
                        onChange={(e) => setHelpForm({ ...helpForm, veterinaryNeeded: e.target.checked })}
                        className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Veterinary care required</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={helpForm.shelterNeeded}
                        onChange={(e) => setHelpForm({ ...helpForm, shelterNeeded: e.target.checked })}
                        className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Emergency shelter/safe location needed</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-8 border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={() => setOnboardingStep("welcome")}
                    className="flex items-center gap-2 border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Options
                  </Button>
                  <Button
                    onClick={handleHelpSubmit}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 shadow-lg"
                  >
                    Submit Help Request
                    <AlertTriangle className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {onboardingStep === "success" && (
            <Card className="text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-8 pt-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-emerald-800">
                  {userType === "property" ? "Property Registered Successfully!" : "Help Request Submitted!"}
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 mt-4">
                  {userType === "property"
                    ? "Your property is now registered in our emergency system. You can access all features and connect with your local community."
                    : "Your help request has been submitted to our emergency network. We're connecting you with available services now."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pb-8">
                {userType === "property" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-4 text-lg">What's Next?</h4>
                        <ul className="space-y-2 text-blue-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Explore emergency services in your area
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Join your local community discussions
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Set up evacuation plans
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Connect with nearby safe locations
                          </li>
                        </ul>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                        <h4 className="font-bold text-emerald-800 mb-4 text-lg">Your Benefits</h4>
                        <ul className="space-y-2 text-emerald-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" /> Priority emergency service access
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" /> Community support network
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" /> Real-time weather and fire alerts
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" /> Evacuation route planning
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Alert className="border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <AlertTitle className="text-emerald-800 font-bold">Help is on the way!</AlertTitle>
                      <AlertDescription className="text-emerald-700 font-medium">
                        Emergency services and community volunteers in your area have been notified. Someone will
                        contact you shortly.
                      </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-4 text-lg">Immediate Actions</h4>
                        <ul className="space-y-2 text-blue-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Keep your phone nearby
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Check safe locations in your area
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Monitor community updates
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" /> Prepare for potential evacuation
                          </li>
                        </ul>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                        <h4 className="font-bold text-orange-800 mb-4 text-lg">Emergency Contacts</h4>
                        <ul className="space-y-2 text-orange-700">
                          <li className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-orange-600" /> Emergency Services: 000
                          </li>
                          <li className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-orange-600" /> Rural Fire Service: 1800 679 737
                          </li>
                          <li className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-orange-600" /> SES Flood Rescue: 132 500
                          </li>
                          <li className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-orange-600" /> Livestock Transport: 0412 345 678
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={completeOnboarding}
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-xl"
                >
                  Continue to Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">
              Livestock Management & Transport Network
            </h1>
            <p className="text-slate-600 text-lg mt-1">Emergency Response • Route Planning • Transport Logistics</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowOnboarding(true)}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property/Get Help
            </Button>
            <Button
              variant={emergencyMode ? "destructive" : "outline"}
              onClick={() => setEmergencyMode(!emergencyMode)}
              className={`font-semibold shadow-lg ${
                emergencyMode
                  ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 animate-pulse"
                  : "border-red-300 text-red-700 hover:bg-red-50"
              }`}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              {emergencyMode ? "EMERGENCY ACTIVE" : "ACTIVATE EMERGENCY"}
            </Button>
          </div>
        </div>

        {/* Emergency Alerts */}
        {emergencyMode && (
          <Alert className="border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-xl animate-pulse">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800 font-bold text-lg">EMERGENCY MODE ACTIVE</AlertTitle>
            <AlertDescription className="text-red-700 font-medium">
              All livestock locations are being monitored. Emergency services have been notified.
            </AlertDescription>
          </Alert>
        )}

        {/* Sponsored Services Banner */}
        <Card className="bg-gradient-to-r from-blue-100 via-emerald-100 to-green-100 border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-800 flex items-center gap-3 text-xl">
              <div className="p-2 bg-yellow-400 rounded-full">
                <Star className="h-6 w-6 text-yellow-800" />
              </div>
              Emergency Services Available Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sponsoredServices.slice(0, 3).map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full shadow-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate text-slate-800">{service.name}</p>
                    <p className="text-xs text-slate-600">{service.responseTime} response</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg"
                  >
                    <Phone className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weatherAlerts.map((alert, index) => (
            <Alert
              key={index}
              className={`shadow-xl border-0 ${
                alert.level === "EXTREME"
                  ? "bg-gradient-to-r from-red-100 to-orange-100 animate-pulse"
                  : "bg-gradient-to-r from-orange-100 to-yellow-100"
              }`}
            >
              <div className="p-2 bg-white/50 rounded-full w-fit">{alert.icon}</div>
              <AlertTitle
                className={`font-bold text-lg ${alert.level === "EXTREME" ? "text-red-800" : "text-orange-800"}`}
              >
                {alert.type} - {alert.level}
              </AlertTitle>
              <AlertDescription
                className={`font-medium ${alert.level === "EXTREME" ? "text-red-700" : "text-orange-700"}`}
              >
                {alert.description}
              </AlertDescription>
            </Alert>
          ))}
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-2">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="locations"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Locations
            </TabsTrigger>
            <TabsTrigger
              value="route-planning"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Route Planning
            </TabsTrigger>
            <TabsTrigger
              value="safe-zones"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Safe Zones
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Community
            </TabsTrigger>
            <TabsTrigger
              value="evacuation"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Evacuation
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white font-semibold rounded-xl"
            >
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Property Selection */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Property Overview</CardTitle>
                <CardDescription className="text-slate-600">Select a property to view livestock status</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name} - Risk Level: {property.riskLevel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Current Property Status */}
            {currentProperty && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      {currentProperty.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600">{currentProperty.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-700">Risk Level:</span>
                        <Badge
                          className={`${
                            currentProperty.riskLevel === "HIGH"
                              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                              : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                          } font-semibold px-3 py-1`}
                        >
                          {currentProperty.riskLevel}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800 text-lg">Livestock Status</h4>
                        {currentProperty.livestock.map((animal, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl border border-slate-200 shadow-sm"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-gradient-to-br from-slate-500 to-emerald-500 rounded-full">
                                <Users className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">
                                  {animal.count} {animal.type}
                                </p>
                                <p className="text-sm text-slate-600">{animal.location}</p>
                              </div>
                            </div>
                            <Badge
                              className={`font-semibold px-3 py-1 ${
                                animal.status === "Safe"
                                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                                  : animal.status === "At Risk"
                                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                              }`}
                            >
                              {animal.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-slate-800">Current Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                        <Thermometer className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium text-slate-700">Temperature: 38°C</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <Wind className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">Wind: 45-60 km/h NW</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <Droplets className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700">Humidity: 15%</span>
                      </div>
                      <div className="pt-4">
                        <Button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-xl">
                          View Detailed Weather
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Services Ad */}
                  <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-0 shadow-xl rounded-2xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-yellow-800 font-bold">Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs text-yellow-700 font-medium">Emergency transport available</p>
                      <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold rounded-xl">
                        <Truck className="h-3 w-3 mr-2" />
                        Call Transport
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Community Updates */}
                  <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-0 shadow-xl rounded-2xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-blue-800 flex items-center gap-2 font-bold">
                        <MessageSquare className="h-4 w-4" />
                        Latest Community Updates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-xs space-y-2">
                        <p className="text-blue-700 font-medium">• Fire approaching Sector 8 - evacuate now</p>
                        <p className="text-blue-700 font-medium">• Free hay available at Thompson Creek</p>
                        <p className="text-blue-700 font-medium">• Transport help needed for horses</p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        View Community
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Add Livestock Location</CardTitle>
                <CardDescription className="text-slate-600">
                  Record current livestock positions for emergency tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="livestock-type" className="text-slate-700 font-medium">
                      Livestock Type
                    </Label>
                    <Select>
                      <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cattle">Cattle</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="horses">Horses</SelectItem>
                        <SelectItem value="goats">Goats</SelectItem>
                        <SelectItem value="pigs">Pigs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="count" className="text-slate-700 font-medium">
                      Number of Animals
                    </Label>
                    <Input
                      id="count"
                      type="number"
                      placeholder="Enter count"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="location" className="text-slate-700 font-medium">
                    Current Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., North Paddock, GPS coordinates"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-slate-700 font-medium">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special conditions or requirements"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg">
                  <MapPin className="h-4 w-4 mr-2" />
                  Record Location
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safe-zones" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Find Nearest Safe Locations</CardTitle>
                <CardDescription className="text-slate-600">
                  Locate available facilities for pets and livestock evacuation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="current-location" className="text-slate-700 font-medium">
                      Your Current Location
                    </Label>
                    <Input
                      id="current-location"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      placeholder="Enter your location"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="search-radius" className="text-slate-700 font-medium">
                      Search Radius (km)
                    </Label>
                    <Select value={searchRadius} onValueChange={setSearchRadius}>
                      <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="25">25 km</SelectItem>
                        <SelectItem value="50">50 km</SelectItem>
                        <SelectItem value="100">100 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="animal-type" className="text-slate-700 font-medium">
                      Animal Type
                    </Label>
                    <Select value={animalType} onValueChange={setAnimalType}>
                      <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Animals</SelectItem>
                        <SelectItem value="cattle">Cattle</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="horses">Horses</SelectItem>
                        <SelectItem value="pets">Pets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg">
                  <MapPin className="h-4 w-4 mr-2" />
                  Search Locations
                </Button>

                {safeLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="text-slate-800">{location.name}</CardTitle>
                      <CardDescription className="text-slate-600">
                        {location.type} - {location.distance} away
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <p className="text-slate-700">
                          <span className="font-medium">Address:</span> {location.address}
                        </p>
                        <p className="text-slate-700">
                          <span className="font-medium">Contact:</span> {location.contact}
                        </p>
                        <p className="text-slate-700">
                          <span className="font-medium">Travel Time:</span> {location.travelTime}
                        </p>
                        <p className="text-slate-700">
                          <span className="font-medium">Status:</span>{" "}
                          <Badge
                            className={`${
                              location.status === "Available"
                                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                            } font-semibold`}
                          >
                            {location.status}
                          </Badge>
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-slate-800">Cattle:</p>
                          <p className="text-sm text-slate-600">
                            {location.capacity.cattle.available} / {location.capacity.cattle.max} available
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Sheep:</p>
                          <p className="text-sm text-slate-600">
                            {location.capacity.sheep.available} / {location.capacity.sheep.max} available
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Horses:</p>
                          <p className="text-sm text-slate-600">
                            {location.capacity.horses.available} / {location.capacity.horses.max} available
                          </p>
                        </div>
                      </div>
                      {location.petFriendly && (
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                          <p className="font-semibold text-blue-800">Pet Friendly:</p>
                          <p className="text-sm text-blue-600">
                            {location.capacity.pets.available} / {location.capacity.pets.max} pets available
                          </p>
                        </div>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        {location.facilities.map((facility, index) => (
                          <Badge
                            key={index}
                            className="bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium"
                          >
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Find Emergency Services</CardTitle>
                <CardDescription className="text-slate-600">
                  Connect with local vets, transport, and support services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="current-location" className="text-slate-700 font-medium">
                      Your Current Location
                    </Label>
                    <Input
                      id="current-location"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      placeholder="Enter your location"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="search-radius" className="text-slate-700 font-medium">
                      Search Radius (km)
                    </Label>
                    <Select value={searchRadius} onValueChange={setSearchRadius}>
                      <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="25">25 km</SelectItem>
                        <SelectItem value="50">50 km</SelectItem>
                        <SelectItem value="100">100 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="service-category" className="text-slate-700 font-medium">
                    Service Category
                  </Label>
                  <Select value={serviceCategory} onValueChange={setServiceCategory}>
                    <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="veterinary">Veterinary</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="feed">Feed & Supplies</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filteredServices.map((service) => (
                  <Card
                    key={service.id}
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-slate-800">
                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full">
                          {service.icon}
                        </div>
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        {service.type} - {service.distance} away
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-700">{service.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-slate-800">Contact:</p>
                          <p className="text-sm text-slate-600">{service.contact}</p>
                          <p className="text-sm text-slate-600">{service.email}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Response Time:</p>
                          <p className="text-sm text-slate-600">{service.responseTime}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {service.services.map((s, index) => (
                          <Badge
                            key={index}
                            className="bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Community Forum</CardTitle>
                <CardDescription className="text-slate-600">
                  Share information, request help, and connect with your local community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Select value={communityFilter} onValueChange={setCommunityFilter}>
                    <SelectTrigger className="w-48 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                      <SelectValue placeholder="Filter by scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Posts</SelectItem>
                      <SelectItem value="local">Local Community</SelectItem>
                      <SelectItem value="national">National Updates</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </div>

                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className={`border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 ${getUrgencyColor(
                        post.urgency,
                      )}`}
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-start gap-4">
                          <img
                            src={post.author.avatar || "/placeholder.svg"}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                            alt={post.author.name}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-slate-800">{post.author.name}</p>
                              <p className="text-xs text-slate-500">{post.timestamp}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <MapPin className="h-3 w-3" />
                              {post.author.location}
                              {post.author.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold flex items-center gap-3 text-slate-800">
                          {getCategoryIcon(post.category)}
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-700 leading-relaxed">
                          {post.content}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {post.images.length > 0 && (
                          <div className="flex gap-3 overflow-x-auto pb-3">
                            {post.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                className="w-48 h-32 object-cover rounded-xl border border-white shadow-lg"
                                alt="Post"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="hover:bg-slate-100 rounded-lg">
                              <Star className="h-3 w-3 mr-1" />
                              {post.likes} Likes
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-slate-100 rounded-lg">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {post.comments} Comments
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="hover:bg-slate-100 rounded-lg">
                              <ArrowRight className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                            <span className="text-slate-400">Views: {post.views}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evacuation" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Create Evacuation Plan</CardTitle>
                <CardDescription className="text-slate-600">
                  Define evacuation routes, safe locations, and emergency contacts for your property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-slate-600 text-lg">This feature is under development. Stay tuned for updates!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Emergency Contacts</CardTitle>
                <CardDescription className="text-slate-600">
                  Important contact numbers for emergency services and support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800 text-lg">{contact.name}</p>
                          <p className="text-slate-600 font-mono text-lg">{contact.number}</p>
                          <Badge className="bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium mt-2">
                            {contact.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="route-planning" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Plan Your Livestock Transport Route</CardTitle>
                <CardDescription className="text-slate-600">
                  Find rest stops, watering points, and facilities along your journey for safe livestock transport
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="start-location" className="text-slate-700 font-medium">
                      Starting Location
                    </Label>
                    <Input
                      id="start-location"
                      placeholder="Enter departure address or coordinates"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="end-location" className="text-slate-700 font-medium">
                      Destination
                    </Label>
                    <Input
                      id="end-location"
                      placeholder="Enter destination address"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="livestock-type-route" className="text-slate-700 font-medium">
                      Livestock Type
                    </Label>
                    <Select>
                      <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue placeholder="Select livestock" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cattle">Cattle</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="horses">Horses</SelectItem>
                        <SelectItem value="mixed">Mixed Load</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="animal-count" className="text-slate-700 font-medium">
                      Number of Animals
                    </Label>
                    <Input
                      id="animal-count"
                      type="number"
                      placeholder="Enter count"
                      className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="max-travel-time" className="text-slate-700 font-medium">
                      Max Travel Between Stops
                    </Label>
                    <Select>
                      <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Required Facilities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Water Troughs",
                      "Feed Available",
                      "Loading Ramps",
                      "Veterinary",
                      "Shade/Shelter",
                      "Truck Parking",
                      "Weighbridge",
                      "Wash Bays",
                    ].map((facility) => (
                      <label
                        key={facility}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-xs font-medium text-slate-700">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg">
                  <MapPin className="h-4 w-4 mr-2" />
                  Plan Route & Find Stops
                </Button>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800">Available Transport Facilities</h3>
                  {transportFacilities.map((facility) => (
                    <Card
                      key={facility.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-xl transition-all duration-300"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full">
                              <Truck className="h-5 w-5 text-white" />
                            </div>
                            {facility.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{facility.rating}</span>
                              <span className="text-xs text-slate-500">({facility.reviews})</span>
                            </div>
                          </div>
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                          {facility.type} - {facility.distance} away ({facility.travelTime})
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <p className="text-slate-700">
                            <span className="font-medium">Location:</span> {facility.location}
                          </p>
                          <p className="text-slate-700">
                            <span className="font-medium">Contact:</span> {facility.contact}
                          </p>
                          <p className="text-slate-700">
                            <span className="font-medium">Operating Hours:</span> {facility.operatingHours}
                          </p>
                          <p className="text-slate-700">
                            <span className="font-medium">Booking:</span>{" "}
                            {facility.bookingRequired ? "Required" : "Walk-in Welcome"}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl">
                          <div>
                            <p className="font-semibold text-slate-800">Cattle Capacity:</p>
                            <p className="text-sm text-slate-600">{facility.capacity.cattle.max} head max</p>
                            <p className="text-xs text-emerald-600">{facility.pricing.cattle}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Sheep Capacity:</p>
                            <p className="text-sm text-slate-600">{facility.capacity.sheep.max} head max</p>
                            <p className="text-xs text-emerald-600">{facility.pricing.sheep}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Horse Capacity:</p>
                            <p className="text-sm text-slate-600">{facility.capacity.horses.max} head max</p>
                            <p className="text-xs text-emerald-600">{facility.pricing.horses}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold text-slate-800 mb-2">Livestock Facilities:</p>
                            <div className="flex gap-2 flex-wrap">
                              {facility.facilities.map((fac, index) => (
                                <Badge
                                  key={index}
                                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium"
                                >
                                  {fac}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800 mb-2">Additional Amenities:</p>
                            <div className="flex gap-2 flex-wrap">
                              {facility.amenities.map((amenity, index) => (
                                <Badge
                                  key={index}
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium"
                                >
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                          <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-xl">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </Button>
                          {facility.bookingRequired && (
                            <Button
                              variant="outline"
                              className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-xl bg-transparent"
                            >
                              Book Stop
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="border-slate-300 text-slate-600 hover:bg-slate-50 rounded-xl bg-transparent"
                          >
                            Add to Route
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
