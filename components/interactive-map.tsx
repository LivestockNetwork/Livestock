"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  AlertTriangle,
  Truck,
  Home,
  Layers,
  Search,
  Navigation,
  Zap,
  Droplets,
  Flame,
} from "lucide-react"

interface MapLocation {
  id: string
  name: string
  type: "member" | "emergency" | "equipment" | "livestock" | "business" | "shelter"
  coordinates: [number, number]
  description: string
  status: "active" | "inactive" | "urgent"
  details: any
}

export default function InteractiveMap() {
  const [selectedLayer, setSelectedLayer] = useState<string[]>(["members", "emergencies"])
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const locations: MapLocation[] = [
    {
      id: "1",
      name: "Sarah Mitchell",
      type: "member",
      coordinates: [-31.9, 152.5],
      description: "Cattle Station - Available for emergency transport",
      status: "active",
      details: {
        propertyType: "Cattle Station",
        equipment: ["Cattle Truck", "Tractor"],
        emergencyContact: true,
      },
    },
    {
      id: "2",
      name: "Bushfire Alert Zone",
      type: "emergency",
      coordinates: [-31.85, 152.45],
      description: "High fire danger - Evacuation recommended",
      status: "urgent",
      details: {
        alertType: "bushfire",
        severity: "extreme",
        radius: 15,
      },
    },
    {
      id: "3",
      name: "Manning Valley Machinery",
      type: "business",
      coordinates: [-31.91, 152.48],
      description: "Equipment hire and repair services",
      status: "active",
      details: {
        services: ["Equipment Repair", "Parts Supply", "Emergency Callout"],
        hours: "24/7 Emergency",
      },
    },
    {
      id: "4",
      name: "Flood Warning Area",
      type: "emergency",
      coordinates: [-31.88, 152.52],
      description: "Manning River flooding expected",
      status: "urgent",
      details: {
        alertType: "flood",
        severity: "high",
        radius: 10,
      },
    },
    {
      id: "5",
      name: "Tom Roberts Farm",
      type: "member",
      coordinates: [-31.95, 152.55],
      description: "Mixed farming - Has boat for flood rescue",
      status: "active",
      details: {
        propertyType: "Mixed Farming",
        equipment: ["Header", "Boat", "Spray Rig"],
        specialties: ["Flood Response"],
      },
    },
    {
      id: "6",
      name: "Taree Showgrounds",
      type: "shelter",
      coordinates: [-31.89, 152.47],
      description: "Emergency evacuation center",
      status: "active",
      details: {
        capacity: 500,
        facilities: ["Livestock yards", "Accommodation", "Medical"],
      },
    },
  ]

  const layers = [
    { id: "members", label: "Community Members", icon: Users, color: "teal" },
    { id: "emergencies", label: "Emergency Alerts", icon: AlertTriangle, color: "red" },
    { id: "equipment", label: "Equipment Available", icon: Truck, color: "blue" },
    { id: "shelters", label: "Emergency Shelters", icon: Home, color: "green" },
    { id: "businesses", label: "Rural Businesses", icon: MapPin, color: "purple" },
  ]

  const getLocationIcon = (type: string, status: string) => {
    const iconClass = status === "urgent" ? "animate-pulse" : ""

    switch (type) {
      case "member":
        return <Users className={`h-4 w-4 text-teal-600 ${iconClass}`} />
      case "emergency":
        return <AlertTriangle className={`h-4 w-4 text-red-600 ${iconClass}`} />
      case "equipment":
        return <Truck className={`h-4 w-4 text-blue-600 ${iconClass}`} />
      case "business":
        return <MapPin className={`h-4 w-4 text-purple-600 ${iconClass}`} />
      case "shelter":
        return <Home className={`h-4 w-4 text-green-600 ${iconClass}`} />
      default:
        return <MapPin className={`h-4 w-4 text-slate-600 ${iconClass}`} />
    }
  }

  const getEmergencyIcon = (alertType: string) => {
    switch (alertType) {
      case "bushfire":
        return <Flame className="h-4 w-4 text-red-600" />
      case "flood":
        return <Droplets className="h-4 w-4 text-blue-600" />
      case "storm":
        return <Zap className="h-4 w-4 text-purple-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const toggleLayer = (layerId: string) => {
    setSelectedLayer((prev) => (prev.includes(layerId) ? prev.filter((id) => id !== layerId) : [...prev, layerId]))
  }

  const filteredLocations = locations.filter((location) => {
    const matchesLayer =
      (selectedLayer.includes("members") && location.type === "member") ||
      (selectedLayer.includes("emergencies") && location.type === "emergency") ||
      (selectedLayer.includes("equipment") && location.type === "equipment") ||
      (selectedLayer.includes("businesses") && location.type === "business") ||
      (selectedLayer.includes("shelters") && location.type === "shelter")

    const matchesSearch =
      searchQuery === "" ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesLayer && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Community Map</h2>
          <p className="text-slate-600">Interactive map of your rural community</p>
        </div>

        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <Navigation className="h-4 w-4 mr-2" />
          My Location
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls Sidebar */}
        <div className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>

          {/* Layer Controls */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {layers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <layer.icon className={`h-4 w-4 text-${layer.color}-600`} />
                    <span className="text-sm font-medium">{layer.label}</span>
                  </div>
                  <button
                    onClick={() => toggleLayer(layer.id)}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      selectedLayer.includes(layer.id) ? `bg-${layer.color}-500` : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        selectedLayer.includes(layer.id) ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Summary */}
          <Card className="border-l-4 border-red-500">
            <CardContent className="p-4">
              <h3 className="font-semibold text-red-800 mb-2">Active Emergencies</h3>
              <div className="space-y-2">
                {locations
                  .filter((l) => l.type === "emergency" && l.status === "urgent")
                  .map((emergency) => (
                    <div key={emergency.id} className="flex items-center gap-2 text-sm">
                      {getEmergencyIcon(emergency.details.alertType)}
                      <span className="text-slate-700">{emergency.name}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full relative">
              {/* Map Background */}
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
                {/* Grid overlay to simulate map */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Location Markers */}
                {filteredLocations.map((location, index) => (
                  <div
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${20 + Math.floor(index / 4) * 25}%`,
                    }}
                  >
                    <div
                      className={`p-2 rounded-full shadow-lg ${
                        location.status === "urgent"
                          ? "bg-red-500 animate-pulse"
                          : location.type === "member"
                            ? "bg-teal-500"
                            : location.type === "emergency"
                              ? "bg-red-500"
                              : location.type === "business"
                                ? "bg-purple-500"
                                : location.type === "shelter"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                      }`}
                    >
                      {getLocationIcon(location.type, location.status)}
                    </div>

                    {/* Location Label */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                        {location.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Legend</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                      <span>Community Members</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Emergency Alerts</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Emergency Shelters</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Rural Businesses</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Details Popup */}
              {selectedLocation && (
                <div className="absolute top-4 right-4 w-80">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getLocationIcon(selectedLocation.type, selectedLocation.status)}
                          <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>
                          ×
                        </Button>
                      </div>
                      <Badge
                        className={
                          selectedLocation.status === "urgent"
                            ? "bg-red-100 text-red-800"
                            : selectedLocation.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-slate-100 text-slate-800"
                        }
                      >
                        {selectedLocation.status}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="text-sm text-slate-700">{selectedLocation.description}</p>

                      {selectedLocation.type === "member" && (
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-semibold text-slate-600">Property Type:</span>
                            <p className="text-sm">{selectedLocation.details.propertyType}</p>
                          </div>
                          {selectedLocation.details.equipment && (
                            <div>
                              <span className="text-xs font-semibold text-slate-600">Equipment:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedLocation.details.equipment.map((eq: string) => (
                                  <Badge key={eq} variant="outline" className="text-xs">
                                    {eq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedLocation.type === "emergency" && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {getEmergencyIcon(selectedLocation.details.alertType)}
                            <span className="text-sm font-semibold capitalize">
                              {selectedLocation.details.alertType} Alert
                            </span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-600">Severity:</span>
                            <Badge
                              className={
                                selectedLocation.details.severity === "extreme"
                                  ? "bg-red-100 text-red-800 ml-2"
                                  : "bg-orange-100 text-orange-800 ml-2"
                              }
                            >
                              {selectedLocation.details.severity}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-600">Affected Radius:</span>
                            <p className="text-sm">{selectedLocation.details.radius}km</p>
                          </div>
                        </div>
                      )}

                      {selectedLocation.type === "shelter" && (
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-semibold text-slate-600">Capacity:</span>
                            <p className="text-sm">{selectedLocation.details.capacity} people</p>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-600">Facilities:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedLocation.details.facilities.map((facility: string) => (
                                <Badge key={facility} variant="outline" className="text-xs">
                                  {facility}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white flex-1">
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
