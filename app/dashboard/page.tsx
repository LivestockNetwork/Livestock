"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Users,
  MapPin,
  Bell,
  Settings,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  state: string
  location: string
  propertyType: string
  isDemo?: boolean
}

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
  forecast: string
}

interface EmergencyAlert {
  id: string
  type: "fire" | "flood" | "storm" | "drought"
  severity: "low" | "medium" | "high" | "extreme"
  title: string
  description: string
  location: string
  time: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    forecast: "Mild conditions expected",
  })
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "1",
      type: "fire",
      severity: "medium",
      title: "Fire Weather Warning",
      description: "Elevated fire danger conditions expected",
      location: "Your Area",
      time: "2 hours ago",
    },
  ])

  useEffect(() => {
    // In a real app, you would get user data from authentication context
    const demoUser: User = {
      id: "1",
      name: "Demo User",
      email: "demo@rural.com",
      state: "NSW",
      location: "Manning Valley",
      propertyType: "Mixed Farming",
      isDemo: true,
    }
    setUser(demoUser)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {user.state}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-gray-600">
            {user.propertyType} • {user.location}, {user.state}
          </p>
          {user.isDemo && <Badge className="mt-2 bg-blue-100 text-blue-800">Demo Account</Badge>}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/emergency-plan">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium">Emergency Plan</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium">Community</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/alerts">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Bell className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="font-medium">Alerts</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/map">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="font-medium">Emergency Map</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                  Active Alerts
                </CardTitle>
                <CardDescription>Emergency alerts affecting your area</CardDescription>
              </CardHeader>
              <CardContent>
                {alerts.length > 0 ? (
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <Alert key={alert.id} className="border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-orange-800">{alert.title}</p>
                              <p className="text-orange-700 text-sm">{alert.description}</p>
                              <p className="text-orange-600 text-xs mt-1">{alert.time}</p>
                            </div>
                            <Badge
                              className={`ml-2 ${
                                alert.severity === "high"
                                  ? "bg-red-100 text-red-800"
                                  : alert.severity === "medium"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p>No active alerts in your area</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Emergency plan updated</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Joined Manning Valley Community Group</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Weather alert received</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cloud className="h-5 w-5 text-blue-500 mr-2" />
                  Local Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">{weather.temperature}°C</div>
                  <div className="text-gray-600">{weather.condition}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Thermometer className="h-4 w-4 text-red-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Temp</div>
                    <div className="text-sm font-medium">{weather.temperature}°C</div>
                  </div>
                  <div>
                    <Droplets className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Humidity</div>
                    <div className="text-sm font-medium">{weather.humidity}%</div>
                  </div>
                  <div>
                    <Wind className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Wind</div>
                    <div className="text-sm font-medium">{weather.windSpeed}km/h</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">{weather.forecast}</p>
                </div>
              </CardContent>
            </Card>

            {/* Community Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
                  Community Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">New member joined</p>
                    <p className="text-xs text-gray-500">Sarah from Taree Cattle Station</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">Equipment sharing post</p>
                    <p className="text-xs text-gray-500">John offers hay baler rental</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">Weather discussion</p>
                    <p className="text-xs text-gray-500">Rain forecast for next week</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/community">View All Updates</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Emergency Plan</span>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Community Connections</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Alerts Received</span>
                    <span className="text-sm font-medium">3 this month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
