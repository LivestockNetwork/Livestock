"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Users,
  MapPin,
  AlertTriangle,
  Calendar,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  Flame,
} from "lucide-react"

interface User {
  email: string
  name: string
  property: string
  isLoggedIn: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rural Emergency Hub</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{user.property}</Badge>
              <Button variant="outline" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Status */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-lg">Current Emergency Status</CardTitle>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  MODERATE RISK
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Bushfire season is approaching. Your property has moderate risk factors that need attention.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-red-600 border-red-200">
                  <Flame className="h-3 w-3 mr-1" />
                  Fire Danger: High
                </Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  <CloudRain className="h-3 w-3 mr-1" />
                  Flood Risk: Low
                </Badge>
                <Badge variant="outline" className="text-gray-600 border-gray-200">
                  <Wind className="h-3 w-3 mr-1" />
                  Storm Risk: Moderate
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Emergency Plans</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-4">
                <Progress value={75} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">75% complete</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Community Connections</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-4">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Weather Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-xs text-gray-500 mt-4">Active warnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Plan Update</p>
                  <p className="text-2xl font-bold text-gray-900">5d</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 mt-4">Days ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Plans */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Your Emergency Plans</span>
                </CardTitle>
                <CardDescription>Manage and update your property emergency preparedness plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Flame className="h-8 w-8 text-red-500" />
                    <div>
                      <h3 className="font-medium">Bushfire Emergency Plan</h3>
                      <p className="text-sm text-gray-600">Last updated 5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">80% Complete</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/preparedness/bushfire">Update</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CloudRain className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Flood Emergency Plan</h3>
                      <p className="text-sm text-gray-600">Last updated 2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">65% Complete</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/preparedness/flood">Update</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Wind className="h-8 w-8 text-gray-500" />
                    <div>
                      <h3 className="font-medium">Severe Weather Plan</h3>
                      <p className="text-sm text-gray-600">Not started</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">0% Complete</Badge>
                    <Button variant="outline" size="sm">
                      Start Plan
                    </Button>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link href="/onboarding">Create New Emergency Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5" />
                  <span>Current Weather</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">24°C</div>
                  <div className="text-gray-600">Partly Cloudy</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-1" />
                      Feels like
                    </span>
                    <span>26°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Droplets className="h-4 w-4 mr-1" />
                      Humidity
                    </span>
                    <span>65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Wind className="h-4 w-4 mr-1" />
                      Wind
                    </span>
                    <span>15 km/h NE</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/weather">View Forecast</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/community">
                    <Users className="h-4 w-4 mr-2" />
                    Community Feed
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/marketplace">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Agistment
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/emergency-alerts">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency Alerts
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Plan Updated</div>
                  <div className="text-gray-600">Bushfire plan reviewed</div>
                  <div className="text-xs text-gray-500">5 days ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">New Connection</div>
                  <div className="text-gray-600">Connected with Smith Farm</div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Alert Received</div>
                  <div className="text-gray-600">Fire danger rating updated</div>
                  <div className="text-xs text-gray-500">2 weeks ago</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
