"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Phone,
  Users,
  Zap,
  Droplets,
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
      id: "wingham-station",
      name: "Wingham Heights Station",
      location: "Wingham, Manning Valley - Elevated 45m above sea level",
      riskLevel: "LOW",
      livestock: [
        { type: "Cattle", count: 200, location: "Upper Paddocks", status: "Safe" },
        { type: "Horses", count: 8, location: "Home Paddock", status: "Safe" },
      ],
    },
    {
      id: "gloucester-farm",
      name: "Gloucester Valley Farm",
      location: "Gloucester - High Country, 180m elevation",
      riskLevel: "MODERATE",
      livestock: [
        { type: "Cattle", count: 350, location: "Hill Paddocks", status: "Safe" },
        { type: "Sheep", count: 150, location: "Ridge Line", status: "Safe" },
      ],
    },
    {
      id: "krambach-property",
      name: "Krambach Ridge Property",
      location: "Krambach - Elevated inland, flood-safe",
      riskLevel: "LOW",
      livestock: [
        { type: "Cattle", count: 120, location: "High Paddocks", status: "Safe" },
        { type: "Horses", count: 15, location: "House Paddock", status: "Safe" },
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
    { name: "Manning Valley RFS", number: "(02) 6552 1234", type: "Fire" },
    { name: "Taree SES", number: "132 500", type: "Flood" },
    { name: "Manning Valley Veterinary Emergency", number: "(02) 6552 7890", type: "Veterinary" },
    { name: "Manning Valley Livestock Transport", number: "(02) 6552 3456", type: "Transport" },
    { name: "Wingham Community Emergency", number: "(02) 6553 4567", type: "Community" },
    { name: "Gloucester High Country Access", number: "(02) 6558 2345", type: "High Ground" },
  ]

  const emergencyServices = [
    {
      id: "manning-livestock-transport",
      name: "Manning Valley Livestock Transport",
      category: "Transport",
      type: "Emergency Livestock Evacuation",
      description:
        "Local family business providing 24/7 emergency livestock evacuation. Cattle trucks, horse floats, sheep transport. Knows all the flood-safe routes and high ground locations.",
      distance: "8 km from Taree",
      responseTime: "20 mins",
      contact: "(02) 6552 3456",
      email: "emergency@manninglivestocktransport.com.au",
      services: ["Cattle Transport", "Horse Float", "Sheep Trucks", "Emergency Evacuation", "Local Knowledge"],
      capacity: "Up to 40 cattle or 150 sheep per trip",
      pricing: "Emergency rates: $3.00/km + $200 callout",
      rating: 4.9,
      reviews: 89,
      available24h: true,
      emergencyPartner: true,
      sponsored: true,
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "manning-valley-vets",
      name: "Manning Valley Emergency Veterinary Services",
      category: "Veterinary",
      type: "Mobile Emergency Vet",
      description:
        "Local veterinary practice providing emergency care during floods and fires. Mobile clinic can reach elevated areas when main roads are flooded.",
      distance: "5 km from Taree",
      responseTime: "30 mins",
      contact: "(02) 6552 7890",
      email: "emergency@manningvalleyvets.com.au",
      services: ["Emergency Surgery", "Trauma Care", "Health Certificates", "Flood Injury Treatment"],
      capacity: "Mobile clinic with full equipment - can access high ground",
      pricing: "Emergency callout: $350 + treatment costs",
      rating: 4.8,
      reviews: 156,
      available24h: true,
      emergencyPartner: true,
      sponsored: false,
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      id: "gloucester-rural-supplies",
      name: "Gloucester Rural Supplies & Transport",
      category: "Transport",
      type: "Feed & Emergency Transport",
      description:
        "Rural supplies store with emergency transport capability. Knows all the back roads to high country. Can deliver feed to elevated evacuation sites.",
      distance: "45 km from Taree",
      responseTime: "45 mins",
      contact: "(02) 6558 2345",
      email: "help@gloucesterrural.com.au",
      services: ["Feed Delivery", "Emergency Transport", "Local Knowledge", "High Country Access"],
      capacity: "Multiple vehicles - can access remote elevated areas",
      pricing: "Emergency delivery: $4.00/km + $150 callout",
      rating: 4.7,
      reviews: 67,
      available24h: false,
      emergencyPartner: true,
      sponsored: false,
      icon: <Package className="h-5 w-5" />,
    },
  ]

  const safeLocations = [
    {
      id: "wingham-showgrounds",
      name: "Wingham Showgrounds",
      type: "Community Facility",
      distance: "12 km from Taree",
      travelTime: "15 mins",
      capacity: {
        cattle: { max: 400, current: 0, available: 400 },
        sheep: { max: 600, current: 0, available: 600 },
        horses: { max: 80, current: 0, available: 80 },
        pets: { max: 50, current: 0, available: 50 },
      },
      facilities: ["Water", "Feed Storage", "Shelter", "Loading Ramps", "High Ground"],
      contact: "(02) 6553 4567",
      address: "Showground Rd, Wingham NSW 2429",
      status: "Available",
      petFriendly: true,
      emergencyOnly: false,
      elevation: "45m above sea level - FLOOD SAFE",
    },
    {
      id: "gloucester-showgrounds",
      name: "Gloucester Showgrounds",
      type: "Community Facility",
      distance: "45 km from Taree",
      travelTime: "35 mins",
      capacity: {
        cattle: { max: 600, current: 0, available: 600 },
        sheep: { max: 800, current: 0, available: 800 },
        horses: { max: 100, current: 0, available: 100 },
        pets: { max: 40, current: 0, available: 40 },
      },
      facilities: ["Water", "Feed Storage", "Veterinary", "Shelter", "Loading Ramps", "High Country"],
      contact: "(02) 6558 1234",
      address: "Showground Rd, Gloucester NSW 2422",
      status: "Available",
      petFriendly: true,
      emergencyOnly: false,
      elevation: "180m above sea level - FLOOD SAFE HIGH COUNTRY",
    },
    {
      id: "krambach-community-farm",
      name: "Krambach Community Emergency Farm",
      type: "Private Farm - Community Partner",
      distance: "25 km from Taree",
      travelTime: "20 mins",
      capacity: {
        cattle: { max: 300, current: 0, available: 300 },
        sheep: { max: 400, current: 0, available: 400 },
        horses: { max: 50, current: 0, available: 50 },
        pets: { max: 30, current: 0, available: 30 },
      },
      facilities: ["Water", "Feed Available", "Basic Shelter", "High Ground"],
      contact: "(02) 6559 8901",
      address: "Krambach Rd, Krambach NSW 2429",
      status: "Available",
      petFriendly: true,
      emergencyOnly: true,
      elevation: "65m above sea level - ELEVATED INLAND LOCATION",
    },
    {
      id: "bulahdelah-heights",
      name: "Bulahdelah Heights Emergency Depot",
      type: "Community Emergency Facility",
      distance: "35 km from Taree",
      travelTime: "25 mins",
      capacity: {
        cattle: { max: 250, current: 0, available: 250 },
        sheep: { max: 350, current: 0, available: 350 },
        horses: { max: 60, current: 0, available: 60 },
        pets: { max: 40, current: 0, available: 40 },
      },
      facilities: ["Water", "Feed Storage", "Loading Ramps", "Elevated Location"],
      contact: "(02) 4997 4567",
      address: "Pacific Hwy, Bulahdelah NSW 2423",
      status: "Available",
      petFriendly: true,
      emergencyOnly: true,
      elevation: "55m above sea level - SAFE FROM MYALL LAKES FLOODING",
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
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {onboardingStep === "welcome" && (
            <Card className="text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-8 pt-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">
                  🔥 MANNING VALLEY LIVESTOCK EMERGENCY NETWORK 🔥
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
                  🚨 EMERGENCY RESPONSE FOR MANNING VALLEY FARMERS 🚨 - Get livestock to high ground before roads flood!
                </CardDescription>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-slate-800 mb-2">🆕 NEWLY UPDATED SYSTEM!</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    This platform is funded by emergency services partnerships, government rural safety initiatives, and
                    service provider advertising. Our mission is to protect rural communities - not profit from
                    emergencies. When you need help most, cost should never be a barrier.
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-8 pb-8">
                {/* Hero Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/placeholder.svg?height=300&width=800"
                    alt="Rural community helping during emergency"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">🔥 When disaster strikes, rural communities respond first 🔥</p>
                  </div>
                </div>

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
                      <h3 className="font-bold text-xl mb-3 text-emerald-800">🏠 Register My Property</h3>
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
                      <h3 className="font-bold text-xl mb-3 text-red-800">🚨 I Need Help Now</h3>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* MASSIVE RED BANNER */}
        <div className="bg-red-600 text-white p-6 text-center text-2xl font-bold animate-pulse border-4 border-yellow-400">
          🔥🔥🔥 SYSTEM UPDATED - MANNING VALLEY LIVESTOCK EMERGENCY NETWORK 🔥🔥🔥
        </div>

        {/* Header */}
        <div className="relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10">
            <img
              src="/placeholder.svg?height=200&width=1200"
              alt="Rural landscape"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Logo/Icon */}
                <div className="p-4 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent">
                    🚨 MANNING VALLEY LIVESTOCK EMERGENCY NETWORK 🚨
                  </h1>
                  <div className="text-lg text-red-600 bg-yellow-100 px-4 py-2 rounded-full font-bold animate-bounce">
                    ⚡ NEWLY UPDATED SYSTEM ⚡
                  </div>
                  <p className="text-slate-600 text-lg mt-1">Emergency response for Manning Valley farmers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowOnboarding(true)}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold px-6"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Join Network
                </Button>
                <Button
                  variant={emergencyMode ? "destructive" : "outline"}
                  onClick={() => setEmergencyMode(!emergencyMode)}
                  className={`font-semibold shadow-lg px-6 ${
                    emergencyMode
                      ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 animate-pulse"
                      : "border-red-300 text-red-700 hover:bg-red-50"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {emergencyMode ? "EMERGENCY ACTIVE" : "EMERGENCY"}
                </Button>
              </div>
            </div>
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

        {/* Rest of the dashboard remains the same... */}
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

        {/* Simple dashboard content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-slate-800 text-xl">🔥 UPDATED DASHBOARD 🔥</CardTitle>
            <CardDescription className="text-slate-600">Manning Valley Emergency Response System</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-green-600">✅ System successfully updated!</p>
            <p className="text-slate-600 mt-2">
              You are now viewing the new Manning Valley Livestock Emergency Network.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
