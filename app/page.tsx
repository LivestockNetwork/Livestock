"use client"

import { useState } from "react"
import {
  AlertTriangle,
  MapPin,
  Phone,
  Users,
  Droplets,
  Thermometer,
  Truck,
  Stethoscope,
  Package,
  Star,
  Shield,
  Plus,
  Home,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ShoppingCart,
  MessageSquare,
  Calendar,
  Flame,
  DollarSign,
  Heart,
  Share2,
  Clock,
  TrendingUp,
  Award,
  Handshake,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ManningValleyRuralHub() {
  const [selectedProperty, setSelectedProperty] = useState("wingham-station")
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [onboardingStep, setOnboardingStep] = useState("welcome")
  const [userType, setUserType] = useState("")

  // Form states
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
    businessType: "",
    services: [],
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
      businessType: "Cattle Station",
      services: ["Agistment", "Cattle Sales", "Hay Production"],
    },
  ]

  const marketplaceItems = [
    {
      id: 1,
      title: "25 Angus Steers - Ready for Market",
      price: "$45,000",
      location: "Wingham",
      seller: "John's Cattle Station",
      image: "/images/angus-steers.png",
      category: "Livestock",
      posted: "2 days ago",
      featured: true,
      description: "Premium Angus steers, 18-20 months old, grass fed, excellent condition",
    },
    {
      id: 2,
      title: "John Deere 5075E Tractor - Low Hours",
      price: "$85,000",
      location: "Gloucester",
      seller: "Manning Valley Equipment",
      image: "/images/john-deere-tractor.png",
      category: "Equipment",
      posted: "1 week ago",
      featured: false,
      description: "2019 model, 450 hours, excellent condition, includes front loader",
    },
    {
      id: 3,
      title: "Premium Lucerne Hay - 500 Bales",
      price: "$18/bale",
      location: "Krambach",
      seller: "Ridge Line Farm",
      image: "/images/lucerne-hay-bales.png",
      category: "Feed & Supplies",
      posted: "3 days ago",
      featured: true,
      description: "High quality lucerne hay, stored undercover, perfect for cattle and horses",
    },
    {
      id: 4,
      title: "Registered Quarter Horse Mare",
      price: "$8,500",
      location: "Taree",
      seller: "Valley View Horses",
      image: "/images/quarter-horse-mare.png",
      category: "Livestock",
      posted: "5 days ago",
      featured: false,
      description: "Beautiful 6yo mare, excellent bloodlines, quiet temperament, suitable for all levels",
    },
  ]

  const communityPosts = [
    {
      id: 1,
      author: "Sarah from Wingham Station",
      title: "Looking for someone to share transport costs to Scone Horse Sales",
      content:
        "Planning to take 3 horses to Scone sales next Friday. Have room for 2-3 more horses if anyone wants to share transport costs. Professional float with experienced driver.",
      category: "Transport Share",
      replies: 7,
      posted: "4 hours ago",
      urgent: false,
    },
    {
      id: 2,
      author: "Manning Valley Weather Watch",
      title: "Severe Weather Warning - Strong Winds Expected Thursday",
      content:
        "BOM has issued severe weather warning for Manning Valley. Winds 60-80km/h expected Thursday afternoon. Secure loose items and check livestock shelter.",
      category: "Weather Alert",
      replies: 12,
      posted: "6 hours ago",
      urgent: true,
    },
    {
      id: 3,
      author: "Tom's Rural Contracting",
      title: "Hay cutting services available - booking now for summer",
      content:
        "Professional hay cutting, raking and baling services. Modern equipment, competitive rates. Booking now for December/January. Call Tom on 0412 345 678.",
      category: "Services",
      replies: 3,
      posted: "1 day ago",
      urgent: false,
    },
  ]

  const localServices = [
    {
      id: "manning-livestock-transport",
      name: "Manning Valley Livestock Transport",
      category: "Transport",
      description:
        "Family business providing livestock transport across NSW. Specializes in cattle, horses, and sheep. Available for emergency evacuation.",
      services: ["Cattle Transport", "Horse Float", "Sheep Trucks", "Emergency Evacuation", "Sale Yard Transport"],
      contact: "(02) 6552 3456",
      rating: 4.9,
      reviews: 127,
      emergencyService: true,
      businessHours: "24/7 Emergency, 6am-6pm Regular",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "valley-rural-supplies",
      name: "Valley Rural Supplies & Hardware",
      category: "Supplies",
      description:
        "Complete rural supplies store. Feed, fencing, tools, and equipment. Local knowledge and friendly service for Manning Valley farmers.",
      services: ["Stock Feed", "Fencing Supplies", "Farm Tools", "Water Systems", "Delivery Service"],
      contact: "(02) 6552 1234",
      rating: 4.7,
      reviews: 89,
      emergencyService: false,
      businessHours: "Mon-Fri 7am-5pm, Sat 7am-12pm",
      icon: <Package className="h-5 w-5" />,
    },
    {
      id: "manning-valley-vets",
      name: "Manning Valley Veterinary Services",
      category: "Veterinary",
      description:
        "Comprehensive veterinary care for large and small animals. Emergency callouts available. Experienced with cattle, horses, sheep, and farm dogs.",
      services: ["Large Animal Care", "Emergency Surgery", "Pregnancy Testing", "Vaccinations", "Health Certificates"],
      contact: "(02) 6552 7890",
      rating: 4.8,
      reviews: 156,
      emergencyService: true,
      businessHours: "24/7 Emergency, 8am-5pm Regular",
      icon: <Stethoscope className="h-5 w-5" />,
    },
  ]

  const safetyPreparedness = {
    bushfire: {
      riskLevel: "HIGH",
      currentConditions: "Total Fire Ban - Extreme Fire Danger",
      keyActions: [
        "Move livestock to prepared safe areas with water access",
        "Clear vegetation around buildings and water sources",
        "Prepare evacuation routes - multiple options essential",
        "Stock water supplies and emergency feed",
        "Have transport arranged in advance",
        "Monitor fire danger ratings and weather conditions",
      ],
      safeLocations: [
        {
          name: "Wingham Showgrounds - Fire Safe Area",
          features: ["Large cleared area", "Water access", "Away from heavy timber"],
          capacity: "400 cattle, 600 sheep",
          contact: "(02) 6553 4567",
        },
        {
          name: "Gloucester Sports Ground",
          features: ["Open grassland", "Town water supply", "Road access"],
          capacity: "300 cattle, 500 sheep",
          contact: "(02) 6558 1234",
        },
      ],
    },
    flood: {
      riskLevel: "MODERATE",
      currentConditions: "River levels normal - Minor flood watch",
      keyActions: [
        "Move livestock to high ground early",
        "Know your evacuation routes before roads flood",
        "Stock feed and water at elevated locations",
        "Have emergency contact numbers ready",
        "Monitor river levels and weather warnings",
        "Prepare for road closures in low-lying areas",
      ],
      safeLocations: [
        {
          name: "Krambach Ridge Community Farm",
          features: ["65m elevation", "Flood-free access", "Community support"],
          capacity: "300 cattle, 400 sheep",
          contact: "(02) 6559 8901",
        },
        {
          name: "Gloucester High Country",
          features: ["180m elevation", "Multiple access roads", "Feed available"],
          capacity: "600 cattle, 800 sheep",
          contact: "(02) 6558 2345",
        },
      ],
    },
  }

  const currentProperty = properties.find((p) => p.id === selectedProperty)

  const addLivestockRow = () => {
    setPropertyForm({
      ...propertyForm,
      livestock: [...propertyForm.livestock, { type: "cattle", count: "", location: "" }],
    })
  }

  const updateLivestockRow = (index: number, field: string, value: string) => {
    const updated = [...propertyForm.livestock]
    updated[index] = { ...updated[index], [field]: value }
    setPropertyForm({ ...propertyForm, livestock: updated })
  }

  const handlePropertySubmit = () => {
    console.log("Property registration:", propertyForm)
    setOnboardingStep("success")
  }

  const completeOnboarding = () => {
    setShowOnboarding(false)
    setOnboardingStep("welcome")
  }

  if (showOnboarding) {
    return (
      <div
        className="min-h-screen p-4"
        style={{ background: "linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 50%, #fff8dc 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          {onboardingStep === "welcome" && (
            <Card className="shadow-2xl border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <CardHeader className="text-center pb-8 pt-8">
                <div
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold mb-4" style={{ color: "#059669" }}>
                  Manning Valley Rural Community Hub
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className="text-white font-bold px-4 py-2" style={{ backgroundColor: "#7EC9BB" }}>
                    100% FREE TO JOIN
                  </Badge>
                  <Badge className="text-white font-bold px-4 py-2" style={{ backgroundColor: "#3b82f6" }}>
                    LOCAL COMMUNITY
                  </Badge>
                </div>
                <CardDescription className="text-lg text-slate-600 mt-4">
                  Your local platform for buying, selling, community connections, weather updates, and safety
                  preparedness. Built by Manning Valley farmers, for Manning Valley farmers.
                </CardDescription>

                <div
                  className="mt-6 p-4 rounded-xl border"
                  style={{ backgroundColor: "#f0f9ff", borderColor: "#3b82f6" }}
                >
                  <h4 className="font-semibold text-slate-800 mb-2">Why join our community?</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Connect with local farmers, buy and sell livestock and equipment, share transport costs, get weather
                    alerts, and be prepared for bushfires and floods. When you need help, your community is already
                    here.
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-8 pb-8">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/rural-community.png"
                    alt="Manning Valley rural community"
                    className="w-full h-48 object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
                  ></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Manning Valley farmers helping each other every day</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 transform"
                    style={{ backgroundColor: "#f0fdf9", borderColor: "#7EC9BB" }}
                    onClick={() => {
                      setUserType("property")
                      setOnboardingStep("property-form")
                    }}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                      >
                        <Home className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3" style={{ color: "#059669" }}>
                        Register My Property & Business
                      </h3>
                      <p className="text-sm mb-6" style={{ color: "#065f46" }}>
                        Join our community network. List your property, services, and connect with local farmers for
                        daily business and safety preparedness.
                      </p>
                      <div className="space-y-3 text-xs mb-6" style={{ color: "#059669" }}>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> List livestock and services
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Connect with local community
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Safety preparedness network
                        </p>
                      </div>
                      <Button
                        className="w-full text-white font-semibold py-3 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                      >
                        Join Community
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 transform"
                    style={{ backgroundColor: "#fef2f2", borderColor: "#ef4444" }}
                    onClick={() => {
                      setUserType("help")
                      setOnboardingStep("help-form")
                    }}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse"
                        style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
                      >
                        <HelpCircle className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3" style={{ color: "#dc2626" }}>
                        I Need Help Right Now
                      </h3>
                      <p className="text-sm mb-6" style={{ color: "#991b1b" }}>
                        Get immediate help from community members, transport services, veterinary care, and local
                        businesses. For urgent situations or planning ahead.
                      </p>
                      <div className="space-y-3 text-xs mb-6" style={{ color: "#dc2626" }}>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Connect with local services
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Find transport and equipment
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Community support network
                        </p>
                      </div>
                      <Button
                        className="w-full text-white font-semibold py-3 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
                      >
                        Get Help Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#7EC9BB" }}>
                      847
                    </div>
                    <div className="text-xs text-slate-600">Community Members</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#3b82f6" }}>
                      2,341
                    </div>
                    <div className="text-xs text-slate-600">Items Sold</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                      156
                    </div>
                    <div className="text-xs text-slate-600">Local Businesses</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#8b5cf6" }}>
                      24/7
                    </div>
                    <div className="text-xs text-slate-600">Community Support</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    Already part of our community? Jump straight to your dashboard.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowOnboarding(false)}
                    className="border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Skip to Community Hub
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Property Form */}
          {onboardingStep === "property-form" && (
            <Card className="shadow-2xl border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <CardHeader
                className="text-white rounded-t-lg"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                    <Home className="h-6 w-6" />
                  </div>
                  Join Manning Valley Rural Community
                </CardTitle>
                <CardDescription className="text-base" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Tell us about your property and business so we can connect you with the right community members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="property-name" className="text-slate-700 font-medium">
                      Property/Business Name *
                    </Label>
                    <Input
                      id="property-name"
                      value={propertyForm.propertyName}
                      onChange={(e) => setPropertyForm({ ...propertyForm, propertyName: e.target.value })}
                      placeholder="e.g., Riverside Farm or Valley Rural Services"
                      className="border-slate-300 focus:border-[#7EC9BB] focus:ring-[#7EC9BB]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="business-type" className="text-slate-700 font-medium">
                      Business Type *
                    </Label>
                    <Select
                      value={propertyForm.businessType}
                      onValueChange={(value) => setPropertyForm({ ...propertyForm, businessType: value })}
                    >
                      <SelectTrigger className="border-slate-300 focus:border-[#7EC9BB]">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cattle-station">Cattle Station</SelectItem>
                        <SelectItem value="sheep-farm">Sheep Farm</SelectItem>
                        <SelectItem value="horse-stud">Horse Stud/Training</SelectItem>
                        <SelectItem value="mixed-farming">Mixed Farming</SelectItem>
                        <SelectItem value="rural-supplies">Rural Supplies</SelectItem>
                        <SelectItem value="transport">Transport Services</SelectItem>
                        <SelectItem value="veterinary">Veterinary Services</SelectItem>
                        <SelectItem value="contracting">Rural Contracting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="owner-name" className="text-slate-700 font-medium">
                      Owner/Manager Name *
                    </Label>
                    <Input
                      id="owner-name"
                      value={propertyForm.ownerName}
                      onChange={(e) => setPropertyForm({ ...propertyForm, ownerName: e.target.value })}
                      placeholder="Your full name"
                      className="border-slate-300 focus:border-[#7EC9BB] focus:ring-[#7EC9BB]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={propertyForm.phone}
                      onChange={(e) => setPropertyForm({ ...propertyForm, phone: e.target.value })}
                      placeholder="0412 345 678"
                      className="border-slate-300 focus:border-[#7EC9BB] focus:ring-[#7EC9BB]"
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
                    placeholder="e.g., 123 Rural Road, Wingham NSW 2429"
                    className="border-slate-300 focus:border-[#7EC9BB] focus:ring-[#7EC9BB]"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700 font-medium text-lg">Livestock Information</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addLivestockRow}
                      className="border-[#7EC9BB] text-[#7EC9BB] hover:bg-emerald-50 bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Livestock
                    </Button>
                  </div>
                  {propertyForm.livestock.map((animal, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-2 border-slate-200 rounded-xl"
                      style={{ background: "linear-gradient(135deg, #f8fafc, #f0fdf4)" }}
                    >
                      <Select value={animal.type} onValueChange={(value) => updateLivestockRow(index, "type", value)}>
                        <SelectTrigger className="border-slate-300 focus:border-[#7EC9BB]">
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
                        onChange={(e) => updateLivestockRow(index, "count", e.target.value)}
                        className="border-slate-300 focus:border-[#7EC9BB] focus:ring-[#7EC9BB]"
                      />
                      <Input
                        placeholder="Location (e.g., North Paddock)"
                        value={animal.location}
                        onChange={(e) => updateLivestockRow(index, "location", e.target.value)}
                        className="border-slate-300 focus:border-[#7EC9BB] focus:ring-[#7EC9BB]"
                      />
                    </div>
                  ))}
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
                    className="flex-1 text-white font-semibold py-3 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                  >
                    Join Community
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Screen */}
          {onboardingStep === "success" && (
            <Card className="text-center shadow-2xl border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <CardHeader className="pb-8 pt-8">
                <div
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold" style={{ color: "#059669" }}>
                  Welcome to Manning Valley Rural Community!
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 mt-4">
                  You're now connected to your local farming community. Start exploring the marketplace, connect with
                  neighbors, and stay informed about local conditions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pb-8">
                <Button
                  onClick={completeOnboarding}
                  size="lg"
                  className="w-full text-white font-bold py-4 text-lg shadow-xl"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Explore Community Hub
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
    <div
      className="min-h-screen p-4"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div
          className="relative overflow-hidden rounded-2xl shadow-xl border border-white/20"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <div className="absolute inset-0 opacity-10">
            <img
              src="/images/manning-valley-landscape.png"
              alt="Manning Valley landscape"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div
                  className="p-4 rounded-2xl shadow-lg"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  <Users className="h-10 w-10 text-white" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold" style={{ color: "#6BB3A6" }}>
                    Manning Valley Rural Community Hub
                  </h1>
                  <p className="text-slate-600 text-lg mt-1">
                    Your local platform for farming, business, and community connections
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowOnboarding(true)}
                  className="border-[#7EC9BB] text-[#7EC9BB] hover:bg-emerald-50 font-semibold px-6"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold px-6 bg-transparent"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Community Chat
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Current Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Alert
            className="shadow-xl border-0 animate-pulse"
            style={{ background: "linear-gradient(135deg, #fef2f2, #fed7d7)" }}
          >
            <Flame className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800 font-bold text-lg">BUSHFIRE ALERT - EXTREME DANGER</AlertTitle>
            <AlertDescription className="text-red-700 font-medium">
              Total Fire Ban in effect. Winds 60-80km/h, Temperature 38°C. Have evacuation plans ready.
            </AlertDescription>
          </Alert>

          <Alert className="shadow-xl border-0" style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}>
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <AlertTitle className="text-orange-800 font-bold text-lg">CATTLE PRICES UP 12%</AlertTitle>
            <AlertDescription className="text-orange-700 font-medium">
              Strong demand at Scone sales. Premium steers $3.20/kg. Good time to sell quality cattle.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList
            className="grid w-full grid-cols-6 border-0 shadow-lg rounded-2xl p-2"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <TabsTrigger value="marketplace" className="data-[state=active]:text-white font-semibold rounded-xl">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:text-white font-semibold rounded-xl">
              <MessageSquare className="h-4 w-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:text-white font-semibold rounded-xl">
              <Handshake className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="weather" className="data-[state=active]:text-white font-semibold rounded-xl">
              <Thermometer className="h-4 w-4 mr-2" />
              Weather
            </TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:text-white font-semibold rounded-xl">
              <Shield className="h-4 w-4 mr-2" />
              Safety
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:text-white font-semibold rounded-xl">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Featured Listings */}
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-800 text-xl flex items-center gap-3">
                    <Star className="h-6 w-6" style={{ color: "#f59e0b" }} />
                    Featured Listings
                  </CardTitle>
                  <Button
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    List Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {marketplaceItems.map((item) => (
                    <Card
                      key={item.id}
                      className="border-0 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 transform cursor-pointer"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                    >
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-40 object-cover"
                          crossOrigin="anonymous"
                        />
                        {item.featured && (
                          <Badge
                            className="absolute top-2 left-2 text-white font-bold"
                            style={{ backgroundColor: "#f59e0b" }}
                          >
                            FEATURED
                          </Badge>
                        )}
                        <div className="absolute top-2 right-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-bold text-slate-800 text-sm line-clamp-2">{item.title}</h3>
                            <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg" style={{ color: "#7EC9BB" }}>
                              {item.price}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.posted}
                            </span>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              className="flex-1 text-white"
                              style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Contact
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-300 text-slate-600 bg-transparent"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl flex items-center gap-3">
                  <MessageSquare className="h-6 w-6" style={{ color: "#3b82f6" }} />
                  Community Discussion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {communityPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-full"
                          style={{ background: "linear-gradient(135deg, #64748b, #7EC9BB)" }}
                        >
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{post.author}</p>
                          <p className="text-xs text-slate-600">{post.posted}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${post.urgent ? "bg-red-100 text-red-800" : ""}`}
                        >
                          {post.category}
                        </Badge>
                        {post.urgent && (
                          <Badge className="text-white text-xs" style={{ backgroundColor: "#ef4444" }}>
                            URGENT
                          </Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">{post.title}</h3>
                    <p className="text-slate-700 text-sm mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.replies} replies
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {localServices.map((service) => (
                <Card
                  key={service.id}
                  className="border-0 shadow-xl rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <CardHeader
                    className="text-white"
                    style={{
                      background: service.emergencyService
                        ? "linear-gradient(135deg, #ef4444, #dc2626)"
                        : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    }}
                  >
                    <CardTitle className="flex items-center gap-3">
                      {service.icon}
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      {service.category} • ⭐ {service.rating}/5 ({service.reviews} reviews)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-slate-700">{service.description}</p>

                      <div className="space-y-2">
                        <span className="font-semibold text-slate-800 text-sm">Services:</span>
                        <div className="flex flex-wrap gap-1">
                          {service.services.map((svc, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {svc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
                      >
                        <p className="text-xs font-medium text-slate-700">Hours: {service.businessHours}</p>
                        {service.emergencyService && (
                          <p className="text-xs text-red-600 font-medium mt-1">✓ Emergency Service Available</p>
                        )}
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-slate-200">
                        <Button
                          className="flex-1 text-white font-semibold"
                          style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {service.contact}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center gap-3">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    Current Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-800">38°C</div>
                    <p className="text-slate-600">Partly Cloudy</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Wind</span>
                      <span className="font-medium">60 km/h NW</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Humidity</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">UV Index</span>
                      <span className="font-medium text-red-600">Extreme (11)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-0 shadow-xl rounded-2xl"
                style={{ background: "linear-gradient(135deg, #fef2f2, #fed7d7)" }}
              >
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-3">
                    <Flame className="h-5 w-5" />
                    Fire Danger
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-red-800">EXTREME</div>
                    <p className="text-red-700 text-sm">Total Fire Ban</p>
                  </div>
                  <div className="space-y-2 text-xs text-red-700">
                    <p>• No fires permitted</p>
                    <p>• Prepare evacuation plans</p>
                    <p>• Monitor conditions closely</p>
                    <p>• Have water supplies ready</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-0 shadow-xl rounded-2xl"
                style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}
              >
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-3">
                    <Droplets className="h-5 w-5" />
                    Flood Watch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-blue-800">MODERATE</div>
                    <p className="text-blue-700 text-sm">River levels normal</p>
                  </div>
                  <div className="space-y-2 text-xs text-blue-700">
                    <p>• Manning River: 2.1m (normal)</p>
                    <p>• Minor flood level: 4.5m</p>
                    <p>• Next update: 6:00 AM</p>
                    <p>• Low-lying areas monitored</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bushfire Preparedness */}
              <Card
                className="border-0 shadow-xl rounded-2xl overflow-hidden"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                <CardHeader className="text-white" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
                  <CardTitle className="flex items-center gap-3">
                    <Flame className="h-6 w-6" />
                    Bushfire Preparedness
                  </CardTitle>
                  <CardDescription className="text-red-100">
                    Current Risk: {safetyPreparedness.bushfire.riskLevel}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Alert
                      className="border-red-300"
                      style={{ background: "linear-gradient(135deg, #fef2f2, #fed7d7)" }}
                    >
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700 font-medium">
                        {safetyPreparedness.bushfire.currentConditions}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Key Actions:</h4>
                      <div className="space-y-2">
                        {safetyPreparedness.bushfire.keyActions.map((action, index) => (
                          <label
                            key={index}
                            className="flex items-start space-x-3 p-2 rounded hover:bg-slate-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-slate-700">{action}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Fire-Safe Locations:</h4>
                      {safetyPreparedness.bushfire.safeLocations.map((location, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border"
                          style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
                        >
                          <h5 className="font-semibold text-sm" style={{ color: "#059669" }}>
                            {location.name}
                          </h5>
                          <p className="text-xs text-slate-600 mt-1">Capacity: {location.capacity}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {location.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flood Preparedness */}
              <Card
                className="border-0 shadow-xl rounded-2xl overflow-hidden"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                <CardHeader className="text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>
                  <CardTitle className="flex items-center gap-3">
                    <Droplets className="h-6 w-6" />
                    Flood Preparedness
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Current Risk: {safetyPreparedness.flood.riskLevel}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Alert
                      className="border-blue-300"
                      style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}
                    >
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700 font-medium">
                        {safetyPreparedness.flood.currentConditions}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Key Actions:</h4>
                      <div className="space-y-2">
                        {safetyPreparedness.flood.keyActions.map((action, index) => (
                          <label
                            key={index}
                            className="flex items-start space-x-3 p-2 rounded hover:bg-slate-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-700">{action}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Flood-Safe Locations:</h4>
                      {safetyPreparedness.flood.safeLocations.map((location, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border"
                          style={{ backgroundColor: "#f0f9ff", borderColor: "#bfdbfe" }}
                        >
                          <h5 className="font-semibold text-sm" style={{ color: "#1d4ed8" }}>
                            {location.name}
                          </h5>
                          <p className="text-xs text-slate-600 mt-1">Capacity: {location.capacity}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {location.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl flex items-center gap-3">
                  <Calendar className="h-6 w-6" style={{ color: "#8b5cf6" }} />
                  Upcoming Events & Sales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card
                    className="border-0 shadow-lg rounded-xl"
                    style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="p-2 rounded-full"
                          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                        >
                          <DollarSign className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">Scone Horse Sales</h3>
                          <p className="text-xs text-slate-600">Friday, Dec 15</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 mb-4">
                        Monthly horse sales. Transport sharing available from Manning Valley.
                      </p>
                      <Button
                        size="sm"
                        className="w-full text-white"
                        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                      >
                        Join Transport Share
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="border-0 shadow-lg rounded-xl"
                    style={{ background: "linear-gradient(135deg, #e6f7f5, #b3e5df)" }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="p-2 rounded-full"
                          style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                        >
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">Community BBQ</h3>
                          <p className="text-xs text-slate-600">Saturday, Dec 16</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 mb-4">
                        Wingham Showgrounds. Meet your neighbors, share local knowledge.
                      </p>
                      <Button
                        size="sm"
                        className="w-full text-white"
                        style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                      >
                        RSVP
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="border-0 shadow-lg rounded-xl"
                    style={{ background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="p-2 rounded-full"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">Fire Safety Workshop</h3>
                          <p className="text-xs text-slate-600">Sunday, Dec 17</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 mb-4">
                        Learn bushfire preparedness and evacuation planning for livestock.
                      </p>
                      <Button
                        size="sm"
                        className="w-full text-white"
                        style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                      >
                        Register
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
