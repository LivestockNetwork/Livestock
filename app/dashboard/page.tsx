"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  User,
  MapPin,
  AlertTriangle,
  Users,
  MessageSquare,
  Calendar,
  Flame,
  CloudRain,
  Wind,
  Thermometer,
  LogOut,
} from "lucide-react"
import Link from "next/link"

interface UserData {
  name: string
  email: string
  location: string
  propertyType: string
}

const stateRisks = {
  NSW: [
    { type: "bushfire", level: "high", description: "Bushfire season approaching" },
    { type: "flood", level: "moderate", description: "La Niña conditions possible" },
  ],
  VIC: [
    { type: "bushfire", level: "extreme", description: "Extreme fire danger period" },
    { type: "storm", level: "moderate", description: "Severe weather warnings" },
  ],
  QLD: [
    { type: "flood", level: "high", description: "Cyclone season active" },
    { type: "heatwave", level: "moderate", description: "Extended heat periods" },
  ],
}

const riskIcons = {
  bushfire: Flame,
  flood: CloudRain,
  storm: Wind,
  heatwave: Thermometer,
}

const riskColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  extreme: "bg-red-100 text-red-800 border-red-200",
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!currentUser || !isLoggedIn) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(currentUser)
      setUser(userData)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userState = user.location.split(", ").pop() || "NSW"
  const risks = stateRisks[userState as keyof typeof stateRisks] || stateRisks.NSW

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌾</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600">Here's what's happening in your rural community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Property:</span>
                    <Badge variant="secondary">{user.propertyType}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Email:</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Current Risk Assessment - {userState}
                </CardTitle>
                <CardDescription>Emergency risks for your area based on current conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {risks.map((risk, index) => {
                    const RiskIcon = riskIcons[risk.type as keyof typeof riskIcons]
                    const colorClass = riskColors[risk.level as keyof typeof riskColors]

                    return (
                      <Alert key={index} className="border-l-4">
                        <RiskIcon className="h-4 w-4" />
                        <AlertTitle className="flex items-center gap-2">
                          {risk.type.charAt(0).toUpperCase() + risk.type.slice(1)} Risk
                          <Badge className={colorClass}>{risk.level.toUpperCase()}</Badge>
                        </AlertTitle>
                        <AlertDescription>{risk.description}</AlertDescription>
                      </Alert>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/community">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Community Feed
                    </Button>
                  </Link>
                  <Link href="/preparedness/bushfire">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Flame className="h-4 w-4 mr-2" />
                      Emergency Plans
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Find Neighbors
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Local Events
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Community</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Local Members</span>
                    <span className="font-semibold">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Today</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Plans</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resources Shared</span>
                    <span className="font-semibold">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">New member joined</p>
                      <p className="text-gray-500">Sarah from Mudgee, NSW</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Emergency plan shared</p>
                      <p className="text-gray-500">Bushfire evacuation route</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Resource request</p>
                      <p className="text-gray-500">Hay bales needed urgently</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alert */}
            <Alert>
              <Wind className="h-4 w-4" />
              <AlertTitle>Weather Alert</AlertTitle>
              <AlertDescription>
                Strong winds expected tomorrow. Secure loose items and check livestock shelter.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}
