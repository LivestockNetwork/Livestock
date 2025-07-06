"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Bell,
  Users,
  MapPin,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Flame,
  CloudRain,
  Wind,
  Plus,
  Eye,
  Edit,
  Share2,
  Download,
} from "lucide-react"

interface EmergencyPlan {
  id: string
  name: string
  type: "bushfire" | "flood" | "storm" | "general"
  status: "draft" | "complete" | "needs_update"
  lastUpdated: Date
  completionPercentage: number
}

interface RecentActivity {
  id: string
  type: "plan_created" | "alert_received" | "community_post" | "plan_shared"
  message: string
  timestamp: Date
}

const mockPlans: EmergencyPlan[] = [
  {
    id: "1",
    name: "Bushfire Emergency Plan",
    type: "bushfire",
    status: "complete",
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    completionPercentage: 100,
  },
  {
    id: "2",
    name: "Flood Response Plan",
    type: "flood",
    status: "draft",
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    completionPercentage: 65,
  },
  {
    id: "3",
    name: "Severe Weather Plan",
    type: "storm",
    status: "needs_update",
    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    completionPercentage: 85,
  },
]

const mockActivity: RecentActivity[] = [
  {
    id: "1",
    type: "alert_received",
    message: "Received bushfire watch alert for your area",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "plan_created",
    message: "Created new flood response plan",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "community_post",
    message: "New post in Hunter Valley Community Group",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
]

export default function DashboardPage() {
  const [plans, setPlans] = useState<EmergencyPlan[]>(mockPlans)
  const [activity, setActivity] = useState<RecentActivity[]>(mockActivity)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: EmergencyPlan["status"]) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "needs_update":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: EmergencyPlan["status"]) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4" />
      case "draft":
        return <Clock className="h-4 w-4" />
      case "needs_update":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPlanIcon = (type: EmergencyPlan["type"]) => {
    switch (type) {
      case "bushfire":
        return <Flame className="h-5 w-5 text-red-500" />
      case "flood":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "storm":
        return <Wind className="h-5 w-5 text-gray-500" />
      default:
        return <Shield className="h-5 w-5 text-green-500" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const days = Math.floor(diffInHours / 24)
      return `${days}d ago`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Shield className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">RuralGuard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/community">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your emergency preparedness.</p>
        </div>

        {/* Active Alerts */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Weather Alert:</strong> Severe weather warning issued for your area.
            <Link href="/weather" className="ml-2 underline font-medium">
              View details →
            </Link>
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Emergency Plans</p>
                      <p className="text-3xl font-bold text-gray-900">{plans.length}</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {plans.filter((p) => p.status === "complete").length} completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                      <p className="text-3xl font-bold text-gray-900">2</p>
                    </div>
                    <Bell className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">1 weather, 1 community</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Community</p>
                      <p className="text-3xl font-bold text-gray-900">24</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Connected neighbors</p>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Plans */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Emergency Plans</CardTitle>
                    <CardDescription>Manage and update your emergency response plans</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/plans/create">
                      <Plus className="h-4 w-4 mr-2" />
                      New Plan
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getPlanIcon(plan.type)}
                          <div>
                            <h3 className="font-medium text-gray-900">{plan.name}</h3>
                            <p className="text-sm text-gray-500">Updated {formatTimeAgo(plan.lastUpdated)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(plan.status)}>
                            {getStatusIcon(plan.status)}
                            <span className="ml-1 capitalize">{plan.status.replace("_", " ")}</span>
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Completion</span>
                          <span className="font-medium">{plan.completionPercentage}%</span>
                        </div>
                        <Progress value={plan.completionPercentage} className="h-2" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/plans/${plan.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/plans/${plan.id}/edit`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">22°C</div>
                  <p className="text-gray-600 mb-4">Partly Cloudy</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wind:</span>
                      <span>15 km/h NW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Humidity:</span>
                      <span>65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fire Danger:</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/weather">View Forecast</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{item.message}</p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(item.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/activity">View All Activity</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/emergency">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Emergency
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/community/post">
                    <Users className="h-4 w-4 mr-2" />
                    Post to Community
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/map">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Property Map
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
