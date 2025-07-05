"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Navigation,
  Users,
  AlertTriangle,
  Truck,
  Home,
  Share2,
  Target,
  Compass,
  Zap,
  Shield,
} from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: Date
  address?: string
}

interface NearbyItem {
  id: string
  name: string
  type: "member" | "emergency" | "equipment" | "shelter" | "business"
  distance: number
  bearing: number
  coordinates: [number, number]
  description: string
  status: "active" | "inactive" | "urgent"
}

export default function LocationServices() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | "unknown">("unknown")
  const [nearbyItems, setNearbyItems] = useState<NearbyItem[]>([])
  const [selectedRadius, setSelectedRadius] = useState(10) // km

  // Mock nearby items (in real app, would come from API)
  const mockNearbyItems: NearbyItem[] = [
    {
      id: "1",
      name: "Sarah Mitchell",
      type: "member",
      distance: 2.3,
      bearing: 45,
      coordinates: [-31.9, 152.5],
      description: "Cattle station - Emergency transport available",
      status: "active",
    },
    {
      id: "2",
      name: "Emergency Shelter",
      type: "shelter",
      distance: 5.7,
      bearing: 120,
      coordinates: [-31.89, 152.47],
      description: "Taree Showgrounds - 500 person capacity",
      status: "active",
    },
    {
      id: "3",
      name: "Bushfire Alert Zone",
      type: "emergency",
      distance: 8.2,
      bearing: 270,
      coordinates: [-31.85, 152.45],
      description: "High fire danger - Evacuation recommended",
      status: "urgent",
    },
    {
      id: "4",
      name: "Tom Roberts Farm",
      type: "member",
      distance: 12.1,
      bearing: 180,
      coordinates: [-31.95, 152.55],
      description: "Mixed farming - Has boat for flood rescue",
      status: "active",
    },
    {
      id: "5",
      name: "Manning Valley Machinery",
      type: "business",
      distance: 3.4,
      bearing: 90,
      coordinates: [-31.91, 152.48],
      description: "Equipment hire and repair - 24/7 emergency",
      status: "active",
    },
  ]

  useEffect(() => {
    // Check geolocation permission
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionStatus(result.state)
      })
    }

    // Filter nearby items based on selected radius
    const filtered = mockNearbyItems.filter((item) => item.distance <= selectedRadius)
    setNearbyItems(filtered)
  }, [selectedRadius])

  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.")
      return
    }

    setIsTracking(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
        }

        setLocation(locationData)
        setIsTracking(false)

        // In real app, would reverse geocode to get address
        locationData.address = "Manning Valley, NSW 2430"
      },
      (error) => {
        console.error("Error getting location:", error)
        setIsTracking(false)
        alert("Unable to get your location. Please check your browser settings.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  const shareLocation = () => {
    if (!location) return

    const locationText = `My location: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`

    if (navigator.share) {
      navigator.share({
        title: "My Location - Rural Community Hub",
        text: locationText,
        url: `https://maps.google.com/?q=${location.latitude},${location.longitude}`,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(locationText)
      alert("Location copied to clipboard!")
    }
  }

  const getDirections = (item: NearbyItem) => {
    if (!location) return

    const url = `https://maps.google.com/maps?saddr=${location.latitude},${location.longitude}&daddr=${item.coordinates[0]},${item.coordinates[1]}`
    window.open(url, "_blank")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "member":
        return <Users className="h-4 w-4 text-teal-600" />
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "equipment":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "shelter":
        return <Home className="h-4 w-4 text-green-600" />
      case "business":
        return <MapPin className="h-4 w-4 text-purple-600" />
      default:
        return <MapPin className="h-4 w-4 text-slate-600" />
    }
  }

  const getBearingDirection = (bearing: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(bearing / 45) % 8
    return directions[index]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Location Services</h2>
          <p className="text-slate-600">Find nearby community members and emergency resources</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedRadius}
            onChange={(e) => setSelectedRadius(Number(e.target.value))}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value={5}>5km radius</option>
            <option value={10}>10km radius</option>
            <option value={25}>25km radius</option>
            <option value={50}>50km radius</option>
          </select>
        </div>
      </div>

      {/* Location Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Your Location
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!location ? (
            <div className="text-center py-8">
              <Target className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Location Not Available</h3>
              <p className="text-slate-600 mb-4">
                Enable location services to find nearby community members and emergency resources.
              </p>

              <Button
                onClick={requestLocation}
                disabled={isTracking}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                {isTracking ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 mr-2" />
                    Get My Location
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Current Location</div>
                  <div className="text-sm text-slate-600">{location.address}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </div>
                  <div className="text-xs text-slate-500">
                    Accuracy: ±{Math.round(location.accuracy)}m • {location.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={shareLocation} className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={requestLocation}
                    className="border-slate-300 bg-transparent"
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{nearbyItems.length}</div>
                  <div className="text-xs text-slate-600">Nearby Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {nearbyItems.filter((i) => i.type === "member").length}
                  </div>
                  <div className="text-xs text-slate-600">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {nearbyItems.filter((i) => i.status === "urgent").length}
                  </div>
                  <div className="text-xs text-slate-600">Urgent</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nearby Items */}
      {location && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Nearby ({nearbyItems.length} within {selectedRadius}km)
          </h3>

          {nearbyItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Compass className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No items nearby</h3>
                <p className="text-slate-600">Try increasing the search radius to find more community members.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyItems.map((item) => (
                <Card
                  key={item.id}
                  className={`hover:shadow-lg transition-all ${
                    item.status === "urgent" ? "border-l-4 border-red-500" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <h4 className="font-semibold text-slate-800">{item.name}</h4>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>

                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.distance.toFixed(1)}km
                        </div>
                        <div className="flex items-center gap-1">
                          <Compass className="h-3 w-3" />
                          {getBearingDirection(item.bearing)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => getDirections(item)}
                          className="bg-teal-500 hover:bg-teal-600 text-white"
                        >
                          <Navigation className="h-3 w-3 mr-1" />
                          Directions
                        </Button>

                        {item.type === "member" && (
                          <Button size="sm" variant="outline" className="border-slate-300 bg-transparent">
                            Contact
                          </Button>
                        )}
                      </div>
                    </div>

                    {item.status === "urgent" && (
                      <div className="mt-3 p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 text-red-700">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="text-xs font-medium">Urgent attention required</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Emergency Location Sharing */}
      {location && (
        <Card className="border-l-4 border-red-500">
          <CardContent className="p-4">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-500" />
              Emergency Location Sharing
            </h3>

            <p className="text-sm text-slate-600 mb-4">
              In an emergency, your location can be automatically shared with emergency services and trusted community
              members.
            </p>

            <div className="flex gap-3">
              <Button
                size="sm"
                onClick={() => {
                  // In real app, would send location to emergency services
                  alert("Emergency location shared with local emergency services and community coordinators.")
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Share Emergency Location
              </Button>

              <Button size="sm" variant="outline" onClick={shareLocation} className="border-slate-300 bg-transparent">
                <Share2 className="h-3 w-3 mr-1" />
                Share with Community
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
