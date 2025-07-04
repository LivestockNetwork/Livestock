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
  const [selectedProperty, setSelectedProperty] = useState("wingham-station")
  const [emergencyMode, setEmergencyMode] = useState(false)
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

  const emergencyServices = [
    {
      id: "manning-livestock-transport",
      name: "Manning Valley Livestock Transport",
      category: "Transport",
      description:
        "Local family business providing 24/7 emergency livestock evacuation. Knows all flood-safe routes and high ground locations.",
      distance: "8 km from Taree",
      responseTime: "20 mins",
      contact: "(02) 6552 3456",
      services: ["Cattle Transport", "Horse Float", "Sheep Trucks", "Emergency Evacuation"],
      capacity: "Up to 40 cattle or 150 sheep per trip",
      pricing: "Emergency rates: $3.00/km + $200 callout",
      rating: 4.9,
      available24h: true,
      sponsored: true,
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "manning-valley-vets",
      name: "Manning Valley Emergency Veterinary Services",
      category: "Veterinary",
      description:
        "Local veterinary practice providing emergency care during floods and fires. Mobile clinic can reach elevated areas.",
      distance: "5 km from Taree",
      responseTime: "30 mins",
      contact: "(02) 6552 7890",
      services: ["Emergency Surgery", "Trauma Care", "Health Certificates", "Flood Injury Treatment"],
      capacity: "Mobile clinic with full equipment",
      pricing: "Emergency callout: $350 + treatment costs",
      rating: 4.8,
      available24h: true,
      sponsored: false,
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      id: "gloucester-rural-supplies",
      name: "Gloucester Rural Supplies & Transport",
      category: "Transport",
      description: "Rural supplies store with emergency transport capability. Knows all back roads to high country.",
      distance: "45 km from Taree",
      responseTime: "45 mins",
      contact: "(02) 6558 2345",
      services: ["Feed Delivery", "Emergency Transport", "Local Knowledge", "High Country Access"],
      capacity: "Multiple vehicles - can access remote elevated areas",
      pricing: "Emergency delivery: $4.00/km + $150 callout",
      rating: 4.7,
      available24h: false,
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
        cattle: { max: 400, available: 400 },
        sheep: { max: 600, available: 600 },
        horses: { max: 80, available: 80 },
      },
      facilities: ["Water", "Feed Storage", "Shelter", "Loading Ramps", "High Ground"],
      contact: "(02) 6553 4567",
      address: "Showground Rd, Wingham NSW 2429",
      status: "Available",
      elevation: "45m above sea level - FLOOD SAFE",
    },
    {
      id: "gloucester-showgrounds",
      name: "Gloucester Showgrounds",
      type: "Community Facility",
      distance: "45 km from Taree",
      travelTime: "35 mins",
      capacity: {
        cattle: { max: 600, available: 600 },
        sheep: { max: 800, available: 800 },
        horses: { max: 100, available: 100 },
      },
      facilities: ["Water", "Feed Storage", "Veterinary", "Shelter", "Loading Ramps"],
      contact: "(02) 6558 1234",
      address: "Showground Rd, Gloucester NSW 2422",
      status: "Available",
      elevation: "180m above sea level - FLOOD SAFE HIGH COUNTRY",
    },
    {
      id: "krambach-community-farm",
      name: "Krambach Community Emergency Farm",
      type: "Private Farm - Community Partner",
      distance: "25 km from Taree",
      travelTime: "20 mins",
      capacity: {
        cattle: { max: 300, available: 300 },
        sheep: { max: 400, available: 400 },
        horses: { max: 50, available: 50 },
      },
      facilities: ["Water", "Feed Available", "Basic Shelter", "High Ground"],
      contact: "(02) 6559 8901",
      address: "Krambach Rd, Krambach NSW 2429",
      status: "Available",
      elevation: "65m above sea level - ELEVATED INLAND LOCATION",
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
  const sponsoredServices = emergencyServices.filter((service) => service.sponsored)

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
                  style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
                >
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold mb-4" style={{ color: "#059669" }}>
                  Manning Valley Livestock Emergency Network
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className="text-white font-bold px-4 py-2" style={{ backgroundColor: "#10b981" }}>
                    100% FREE TO JOIN
                  </Badge>
                  <Badge className="text-white font-bold px-4 py-2" style={{ backgroundColor: "#3b82f6" }}>
                    NO HIDDEN FEES
                  </Badge>
                </div>
                <CardDescription className="text-lg text-slate-600 mt-4">
                  Community-driven emergency response for Manning Valley farmers. Get livestock to high ground before
                  roads flood!
                </CardDescription>

                <div
                  className="mt-6 p-4 rounded-xl border"
                  style={{ backgroundColor: "#f0f9ff", borderColor: "#3b82f6" }}
                >
                  <h4 className="font-semibold text-slate-800 mb-2">Why is this free?</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    This platform is funded by emergency services partnerships and government rural safety initiatives.
                    Our mission is to protect Manning Valley communities - not profit from emergencies.
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-8 pb-8">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/placeholder.svg?height=300&width=800&text=Manning+Valley+Rural+Community"
                    alt="Manning Valley rural community"
                    className="w-full h-48 object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
                  ></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Manning Valley farmers helping each other in emergencies</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 transform"
                    style={{ backgroundColor: "#f0fdf4", borderColor: "#10b981" }}
                    onClick={() => {
                      setUserType("property")
                      setOnboardingStep("property-form")
                    }}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                      >
                        <Home className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3" style={{ color: "#059669" }}>
                        Register My Property
                      </h3>
                      <p className="text-sm mb-6" style={{ color: "#065f46" }}>
                        Join our free emergency network and get priority access to rescue services, safe locations, and
                        community support.
                      </p>
                      <div className="space-y-3 text-xs mb-6" style={{ color: "#059669" }}>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Register livestock locations
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Connect with emergency services
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Join local community network
                        </p>
                      </div>
                      <Button
                        className="w-full text-white font-semibold py-3 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                      >
                        Get Started
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
                        I Need Help Now
                      </h3>
                      <p className="text-sm mb-6" style={{ color: "#991b1b" }}>
                        Get immediate help from emergency responders, transport services, veterinary care, and community
                        volunteers.
                      </p>
                      <div className="space-y-3 text-xs mb-6" style={{ color: "#dc2626" }}>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Emergency transport services
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Find safe locations nearby
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Connect with volunteers
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#10b981" }}>
                      847
                    </div>
                    <div className="text-xs text-slate-600">Manning Valley Properties Protected</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#3b82f6" }}>
                      5,623
                    </div>
                    <div className="text-xs text-slate-600">Animals Safely Evacuated</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                      24/7
                    </div>
                    <div className="text-xs text-slate-600">Emergency Response</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="h-4 w-4" style={{ color: "#10b981" }} />
                      <span>Trusted by Manning Valley RFS</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="h-4 w-4" style={{ color: "#10b981" }} />
                      <span>Taree SES Emergency Partner</span>
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

          {/* Property Form */}
          {onboardingStep === "property-form" && (
            <Card className="shadow-2xl border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <CardHeader
                className="text-white rounded-t-lg"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
              >
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 rounded-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                    <Home className="h-6 w-6" />
                  </div>
                  Register Your Manning Valley Property
                </CardTitle>
                <CardDescription className="text-base" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
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
                    placeholder="e.g., 123 Rural Road, Wingham NSW 2429"
                    className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
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
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-2 border-slate-200 rounded-xl"
                      style={{ background: "linear-gradient(135deg, #f8fafc, #f0fdf4)" }}
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
                    className="flex-1 text-white font-semibold py-3 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                  >
                    Register Property
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Form */}
          {onboardingStep === "help-form" && (
            <Card className="shadow-2xl border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <CardHeader
                className="text-white rounded-t-lg"
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
              >
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div
                    className="p-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  >
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  Manning Valley Emergency Help Request
                </CardTitle>
                <CardDescription className="text-base" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Tell us about your situation so we can connect you with the right help immediately
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <Alert
                  className="border-red-300 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #fef2f2, #fed7d7)" }}
                >
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
                    placeholder="Your current address or GPS coordinates in Manning Valley"
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
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-2 border-slate-200 rounded-xl"
                      style={{ background: "linear-gradient(135deg, #f8fafc, #fef2f2)" }}
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
                    className="flex-1 text-white font-semibold py-3 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
                  >
                    Submit Help Request
                    <AlertTriangle className="h-4 w-4 ml-2" />
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
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold" style={{ color: "#059669" }}>
                  {userType === "property" ? "Property Registered Successfully!" : "Help Request Submitted!"}
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 mt-4">
                  {userType === "property"
                    ? "Your Manning Valley property is now registered in our emergency system. You can access all features and connect with your local community."
                    : "Your help request has been submitted to our Manning Valley emergency network. We're connecting you with available services now."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pb-8">
                <Button
                  onClick={completeOnboarding}
                  size="lg"
                  className="w-full text-white font-bold py-4 text-lg shadow-xl"
                  style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
                >
                  Continue to Manning Valley Dashboard
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
              src="/placeholder.svg?height=200&width=1200&text=Manning+Valley+Landscape"
              alt="Manning Valley landscape"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div
                  className="p-4 rounded-2xl shadow-lg"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                >
                  <Shield className="h-10 w-10 text-white" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold" style={{ color: "#059669" }}>
                    Manning Valley Livestock Emergency Network
                  </h1>
                  <p className="text-slate-600 text-lg mt-1">
                    Community-driven emergency response for Manning Valley farmers
                  </p>
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
                    emergencyMode ? "animate-pulse" : "border-red-300 text-red-700 hover:bg-red-50"
                  }`}
                  style={
                    emergencyMode ? { background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "white" } : {}
                  }
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {emergencyMode ? "EMERGENCY ACTIVE" : "EMERGENCY"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Alert */}
        {emergencyMode && (
          <Alert
            className="border-red-300 shadow-xl animate-pulse"
            style={{ background: "linear-gradient(135deg, #fef2f2, #fed7d7)" }}
          >
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800 font-bold text-lg">EMERGENCY MODE ACTIVE</AlertTitle>
            <AlertDescription className="text-red-700 font-medium">
              All Manning Valley livestock locations are being monitored. Emergency services have been notified.
            </AlertDescription>
          </Alert>
        )}

        {/* Sponsored Services */}
        <Card
          className="border-0 shadow-xl"
          style={{ background: "linear-gradient(135deg, #dbeafe, #dcfce7, #fef3c7)" }}
        >
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl" style={{ color: "#1e40af" }}>
              <div className="p-2 rounded-full" style={{ backgroundColor: "#fbbf24" }}>
                <Star className="h-6 w-6" style={{ color: "#92400e" }} />
              </div>
              Manning Valley Emergency Services Available Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sponsoredServices.slice(0, 3).map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-4 p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderColor: "rgba(255, 255, 255, 0.4)" }}
                >
                  <div
                    className="p-3 rounded-full shadow-lg"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate text-slate-800">{service.name}</p>
                    <p className="text-xs text-slate-600">{service.responseTime} response</p>
                  </div>
                  <Button
                    size="sm"
                    className="text-white shadow-lg"
                    style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
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
              className={`shadow-xl border-0 ${alert.level === "EXTREME" ? "animate-pulse" : ""}`}
              style={{
                background:
                  alert.level === "EXTREME"
                    ? "linear-gradient(135deg, #fef2f2, #fed7d7)"
                    : "linear-gradient(135deg, #fef3c7, #fde68a)",
              }}
            >
              <div className="p-2 rounded-full w-fit" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                {alert.icon}
              </div>
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
          <TabsList
            className="grid w-full grid-cols-5 border-0 shadow-lg rounded-2xl p-2"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:text-white font-semibold rounded-xl"
              style={{
                background: "data-[state=active]:linear-gradient(135deg, #10b981, #3b82f6)",
              }}
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="safe-zones" className="data-[state=active]:text-white font-semibold rounded-xl">
              Safe Zones
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:text-white font-semibold rounded-xl">
              Services
            </TabsTrigger>
            <TabsTrigger value="evacuation" className="data-[state=active]:text-white font-semibold rounded-xl">
              Evacuation
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:text-white font-semibold rounded-xl">
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Property Selection */}
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <CardHeader>
                <CardTitle className="text-slate-800 text-xl">Manning Valley Property Overview</CardTitle>
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
                <Card
                  className="lg:col-span-2 border-0 shadow-xl rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                >
                  {/* Property Header */}
                  <div className="relative h-32" style={{ background: "linear-gradient(135deg, #dcfce7, #d1fae5)" }}>
                    <img
                      src="/placeholder.svg?height=150&width=600&text=Manning+Valley+Property"
                      alt="Property overview"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))" }}
                    ></div>
                  </div>

                  <CardHeader className="relative -mt-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-full shadow-lg border-4 border-white">
                        <MapPin className="h-6 w-6" style={{ color: "#10b981" }} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-slate-800">{currentProperty.name}</CardTitle>
                        <CardDescription className="text-slate-600 text-base">
                          {currentProperty.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-700">Risk Level:</span>
                        <Badge
                          className={`font-semibold px-3 py-1 ${
                            currentProperty.riskLevel === "HIGH" ? "text-white" : "text-white"
                          }`}
                          style={{
                            background:
                              currentProperty.riskLevel === "HIGH"
                                ? "linear-gradient(135deg, #ef4444, #dc2626)"
                                : "linear-gradient(135deg, #f59e0b, #d97706)",
                          }}
                        >
                          {currentProperty.riskLevel}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800 text-lg">Livestock Status</h4>
                        {currentProperty.livestock.map((animal, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-200 shadow-sm"
                            style={{ background: "linear-gradient(135deg, #f8fafc, #f0fdf4)" }}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="p-2 rounded-full"
                                style={{ background: "linear-gradient(135deg, #64748b, #10b981)" }}
                              >
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
                                  ? "text-white"
                                  : animal.status === "At Risk"
                                    ? "text-white"
                                    : "text-white"
                              }`}
                              style={{
                                background:
                                  animal.status === "Safe"
                                    ? "linear-gradient(135deg, #10b981, #059669)"
                                    : animal.status === "At Risk"
                                      ? "linear-gradient(135deg, #ef4444, #dc2626)"
                                      : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                              }}
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
                  <Card
                    className="border-0 shadow-xl rounded-2xl"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  >
                    <CardHeader>
                      <CardTitle className="text-slate-800">Current Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ background: "linear-gradient(135deg, #fef2f2, #fed7d7)" }}
                      >
                        <Thermometer className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium text-slate-700">Temperature: 38°C</span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}
                      >
                        <Wind className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">Wind: 45-60 km/h NW</span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}
                      >
                        <Droplets className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700">Humidity: 15%</span>
                      </div>
                      <div className="pt-4">
                        <Button
                          className="w-full text-white font-semibold rounded-xl"
                          style={{ background: "linear-gradient(135deg, #64748b, #475569)" }}
                        >
                          View Detailed Weather
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Services */}
                  <Card
                    className="border-0 shadow-xl rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold" style={{ color: "#92400e" }}>
                        Need Help?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs font-medium" style={{ color: "#a16207" }}>
                        Emergency transport available
                      </p>
                      <Button
                        className="w-full text-white font-semibold rounded-xl"
                        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                      >
                        <Truck className="h-3 w-3 mr-2" />
                        Call Transport
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="safe-zones" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeLocations.map((location) => (
                <Card
                  key={location.id}
                  className="border-0 shadow-xl rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <CardHeader
                    className="text-white"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                  >
                    <CardTitle className="flex items-center gap-3">
                      <MapPin className="h-5 w-5" />
                      {location.name}
                    </CardTitle>
                    <CardDescription className="text-emerald-100">
                      {location.type} • {location.distance}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
                      >
                        <p className="text-sm font-semibold" style={{ color: "#059669" }}>
                          {location.elevation}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800">Capacity Available:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded" style={{ backgroundColor: "#f8fafc" }}>
                            <span className="font-medium">Cattle:</span> {location.capacity.cattle.available}
                          </div>
                          <div className="p-2 rounded" style={{ backgroundColor: "#f8fafc" }}>
                            <span className="font-medium">Sheep:</span> {location.capacity.sheep.available}
                          </div>
                          <div className="p-2 rounded" style={{ backgroundColor: "#f8fafc" }}>
                            <span className="font-medium">Horses:</span> {location.capacity.horses.available}
                          </div>
                          <div className="p-2 rounded" style={{ backgroundColor: "#f8fafc" }}>
                            <span className="font-medium">Travel:</span> {location.travelTime}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800">Facilities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {location.facilities.map((facility, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">Contact:</span>
                          <Button
                            size="sm"
                            className="text-white"
                            style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{location.contact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {emergencyServices.map((service) => (
                <Card
                  key={service.id}
                  className="border-0 shadow-xl rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <CardHeader
                    className="text-white"
                    style={{
                      background: service.sponsored
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        {service.icon}
                        {service.name}
                      </CardTitle>
                      {service.sponsored && (
                        <Badge className="bg-yellow-400 text-yellow-900 font-bold">SPONSORED</Badge>
                      )}
                    </div>
                    <CardDescription className="text-blue-100">
                      {service.category} • {service.distance}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-slate-700">{service.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-slate-800">Response Time:</span>
                          <p className="text-slate-600">{service.responseTime}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Rating:</span>
                          <p className="text-slate-600">⭐ {service.rating}/5</p>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-800 text-sm">Services:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
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
                        <p className="text-xs font-medium text-slate-700">Capacity: {service.capacity}</p>
                        <p className="text-xs text-slate-600 mt-1">Pricing: {service.pricing}</p>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-slate-200">
                        <Button
                          className="flex-1 text-white font-semibold"
                          style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="border-slate-300 text-slate-600 bg-transparent">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evacuation" className="space-y-6">
            <Card className="border-0 shadow-xl rounded-2xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
              <CardHeader className="text-white" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
                <CardTitle className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6" />
                  Manning Valley Evacuation Planning
                </CardTitle>
                <CardDescription className="text-red-100">
                  Plan your livestock evacuation routes and safe locations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <Alert
                    className="border-orange-300"
                    style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}
                  >
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <AlertTitle className="text-orange-800 font-bold">Evacuation Priority</AlertTitle>
                    <AlertDescription className="text-orange-700">
                      Get livestock to high ground before roads flood. Manning Valley low-lying areas flood quickly
                      during heavy rain.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-slate-800">Recommended Evacuation Routes</h3>
                      <div className="space-y-3">
                        <div
                          className="p-4 rounded-lg border"
                          style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
                        >
                          <h4 className="font-semibold" style={{ color: "#059669" }}>
                            Route 1: To Wingham Showgrounds
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">Via Wingham Road - Usually clear during floods</p>
                          <p className="text-xs text-slate-500">15 minutes • 45m elevation</p>
                        </div>
                        <div
                          className="p-4 rounded-lg border"
                          style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
                        >
                          <h4 className="font-semibold" style={{ color: "#059669" }}>
                            Route 2: To Gloucester High Country
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">Via Gloucester Road - Best for large herds</p>
                          <p className="text-xs text-slate-500">35 minutes • 180m elevation</p>
                        </div>
                        <div
                          className="p-4 rounded-lg border"
                          style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
                        >
                          <h4 className="font-semibold" style={{ color: "#059669" }}>
                            Route 3: To Krambach Ridge
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            Via Back Roads - Alternative if main roads blocked
                          </p>
                          <p className="text-xs text-slate-500">20 minutes • 65m elevation</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-slate-800">Emergency Checklist</h3>
                      <div className="space-y-2">
                        {[
                          "Check weather and fire danger ratings",
                          "Contact transport services early",
                          "Prepare livestock for movement",
                          "Secure feed and water supplies",
                          "Notify safe location of incoming animals",
                          "Have emergency contact numbers ready",
                          "Check road conditions and closures",
                          "Prepare veterinary supplies",
                        ].map((item, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-3 p-2 rounded hover:bg-slate-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-slate-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <Button
                      className="w-full text-white font-bold py-3 text-lg"
                      style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
                    >
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Start Emergency Evacuation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl rounded-2xl"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="p-3 rounded-full"
                        style={{
                          background:
                            contact.type === "Emergency"
                              ? "linear-gradient(135deg, #ef4444, #dc2626)"
                              : contact.type === "Fire"
                                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                        }}
                      >
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{contact.name}</h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {contact.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: "#f8fafc" }}>
                        <p className="font-mono text-lg font-bold text-center" style={{ color: "#059669" }}>
                          {contact.number}
                        </p>
                      </div>
                      <Button
                        className="w-full text-white font-semibold"
                        style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
