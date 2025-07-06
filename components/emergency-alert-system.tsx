"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertTriangle,
  Flame,
  CloudRain,
  Wind,
  Thermometer,
  Users,
  Send,
  Bell,
  Clock,
  MapPin,
  Phone,
  Mail,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "bushfire" | "flood" | "storm" | "heatwave" | "general"
  severity: "low" | "moderate" | "high" | "extreme"
  title: string
  message: string
  location: string
  state: string
  issuedAt: Date
  expiresAt?: Date
  isActive: boolean
  recipientCount: number
  sentBy: string
}

interface AlertSubscription {
  id: string
  userId: string
  alertTypes: string[]
  locations: string[]
  notificationMethods: ("email" | "sms" | "push")[]
  isActive: boolean
}

const alertTypeIcons = {
  bushfire: Flame,
  flood: CloudRain,
  storm: Wind,
  heatwave: Thermometer,
  general: AlertTriangle,
}

const alertTypeColors = {
  bushfire: "bg-red-100 text-red-800 border-red-200",
  flood: "bg-blue-100 text-blue-800 border-blue-200",
  storm: "bg-purple-100 text-purple-800 border-purple-200",
  heatwave: "bg-orange-100 text-orange-800 border-orange-200",
  general: "bg-gray-100 text-gray-800 border-gray-200",
}

const severityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  extreme: "bg-red-100 text-red-800 border-red-200",
}

const sampleAlerts: EmergencyAlert[] = [
  {
    id: "1",
    type: "bushfire",
    severity: "high",
    title: "Bushfire Watch - Blue Mountains",
    message:
      "Bushfire conditions are developing in the Blue Mountains area. Residents should prepare for possible evacuation. Monitor local radio and emergency services for updates.",
    location: "Blue Mountains",
    state: "NSW",
    issuedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
    isActive: true,
    recipientCount: 1247,
    sentBy: "NSW Rural Fire Service",
  },
  {
    id: "2",
    type: "flood",
    severity: "moderate",
    title: "Flood Warning - Hawkesbury River",
    message:
      "Minor to moderate flooding is expected along the Hawkesbury River. Low-lying areas may be affected. Avoid driving through flood water.",
    location: "Hawkesbury Region",
    state: "NSW",
    issuedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    isActive: true,
    recipientCount: 856,
    sentBy: "Bureau of Meteorology",
  },
  {
    id: "3",
    type: "storm",
    severity: "low",
    title: "Severe Weather Warning - Central Coast",
    message:
      "Severe thunderstorms with damaging winds and large hail are possible this afternoon. Secure loose items and avoid outdoor activities.",
    location: "Central Coast",
    state: "NSW",
    issuedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isActive: false,
    recipientCount: 2103,
    sentBy: "Bureau of Meteorology",
  },
]

export default function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(sampleAlerts)
  const [newAlert, setNewAlert] = useState({
    type: "general" as const,
    severity: "moderate" as const,
    title: "",
    message: "",
    location: "",
    state: "NSW",
  })
  const [subscription, setSubscription] = useState<AlertSubscription>({
    id: "user_sub_1",
    userId: "current_user",
    alertTypes: ["bushfire", "flood"],
    locations: ["Central Coast", "Blue Mountains"],
    notificationMethods: ["email", "push"],
    isActive: true,
  })

  const activeAlerts = alerts.filter((alert) => alert.isActive)
  const recentAlerts = alerts.slice(0, 5)

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) return "Less than 1 hour ago"
    if (diffInHours === 1) return "1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`

    if (diffInDays === 1) return "1 day ago"
    return `${diffInDays} days ago`
  }

  const handleSendAlert = async () => {
    if (!newAlert.title || !newAlert.message || !newAlert.location) {
      alert("Please fill in all required fields")
      return
    }

    const alertToSend: EmergencyAlert = {
      id: `alert_${Date.now()}`,
      ...newAlert,
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true,
      recipientCount: Math.floor(Math.random() * 2000) + 500,
      sentBy: "Rural Emergency Hub Admin",
    }

    setAlerts([alertToSend, ...alerts])
    setNewAlert({
      type: "general",
      severity: "moderate",
      title: "",
      message: "",
      location: "",
      state: "NSW",
    })

    // Simulate API call
    console.log("Sending emergency alert:", alertToSend)
  }

  const handleUpdateSubscription = () => {
    console.log("Updating alert subscription:", subscription)
    alert("Alert preferences updated successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <AlertTriangle className="h-10 w-10 text-red-600" />
            Emergency Alert System
          </h1>
          <p className="text-xl text-gray-600">Stay informed and keep your community safe</p>
        </div>

        {/* Active Alerts Banner */}
        {activeAlerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Active Emergency Alerts ({activeAlerts.length})
            </h2>
            <div className="space-y-4">
              {activeAlerts.map((alert) => {
                const AlertIcon = alertTypeIcons[alert.type]
                const alertColor = alertTypeColors[alert.type]
                const severityColor = severityColors[alert.severity]

                return (
                  <Alert key={alert.id} className="border-2 border-red-200 bg-red-50">
                    <AlertIcon className="h-5 w-5 text-red-600" />
                    <AlertTitle className="text-red-800 flex items-center gap-2">
                      {alert.title}
                      <Badge className={severityColor}>{alert.severity.toUpperCase()}</Badge>
                    </AlertTitle>
                    <AlertDescription className="text-red-700 mt-2">
                      <p className="mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}, {alert.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(alert.issuedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {alert.recipientCount.toLocaleString()} recipients
                        </span>
                      </div>
                    </AlertDescription>
                  </Alert>
                )
              })}
            </div>
          </div>
        )}

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              View Alerts
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Alert
            </TabsTrigger>
            <TabsTrigger value="subscribe" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentAlerts.map((alert) => {
                const AlertIcon = alertTypeIcons[alert.type]
                const alertColor = alertTypeColors[alert.type]
                const severityColor = severityColors[alert.severity]

                return (
                  <Card key={alert.id} className={`shadow-lg ${alert.isActive ? "ring-2 ring-red-200" : ""}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <AlertIcon className="h-6 w-6 text-gray-600" />
                          <div>
                            <CardTitle className="text-lg">{alert.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={alertColor}>{alert.type}</Badge>
                              <Badge className={severityColor}>{alert.severity}</Badge>
                            </div>
                          </div>
                        </div>
                        {alert.isActive ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-700 text-sm mb-4">{alert.message}</p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {alert.location}, {alert.state}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Issued {formatTimeAgo(alert.issuedAt)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {alert.recipientCount.toLocaleString()} recipients
                        </div>
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Sent by {alert.sentBy}
                        </div>
                      </div>

                      {alert.expiresAt && alert.isActive && (
                        <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-600 inline mr-1" />
                          Expires: {alert.expiresAt.toLocaleString()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card className="max-w-2xl mx-auto shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Send className="h-6 w-6" />
                  Send Emergency Alert
                </CardTitle>
                <CardDescription className="text-red-100">
                  Create and send emergency alerts to community members
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendAlert()
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="alertType" className="text-gray-700 font-medium">
                        Alert Type *
                      </Label>
                      <select
                        id="alertType"
                        value={newAlert.type}
                        onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value as any })}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="general">🚨 General Emergency</option>
                        <option value="bushfire">🔥 Bushfire</option>
                        <option value="flood">🌊 Flood</option>
                        <option value="storm">⛈️ Severe Weather</option>
                        <option value="heatwave">🌡️ Heatwave</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="severity" className="text-gray-700 font-medium">
                        Severity Level *
                      </Label>
                      <select
                        id="severity"
                        value={newAlert.severity}
                        onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value as any })}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="low">🟢 Low</option>
                        <option value="moderate">🟡 Moderate</option>
                        <option value="high">🟠 High</option>
                        <option value="extreme">🔴 Extreme</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="alertTitle" className="text-gray-700 font-medium">
                      Alert Title *
                    </Label>
                    <Input
                      id="alertTitle"
                      value={newAlert.title}
                      onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                      placeholder="e.g., Bushfire Watch - Blue Mountains"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="alertMessage" className="text-gray-700 font-medium">
                      Alert Message *
                    </Label>
                    <Textarea
                      id="alertMessage"
                      value={newAlert.message}
                      onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                      placeholder="Provide detailed information about the emergency situation, recommended actions, and any important updates..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="alertLocation" className="text-gray-700 font-medium">
                        Location *
                      </Label>
                      <Input
                        id="alertLocation"
                        value={newAlert.location}
                        onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                        placeholder="e.g., Blue Mountains"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="alertState" className="text-gray-700 font-medium">
                        State *
                      </Label>
                      <select
                        id="alertState"
                        value={newAlert.state}
                        onChange={(e) => setNewAlert({ ...newAlert, state: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Alert Guidelines</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Only send alerts for genuine emergency situations</li>
                      <li>• Provide clear, actionable information</li>
                      <li>• Include specific location details</li>
                      <li>• Use appropriate severity levels</li>
                      <li>• Follow up with updates as needed</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Emergency Alert
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribe">
            <Card className="max-w-2xl mx-auto shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Alert Preferences
                </CardTitle>
                <CardDescription>Customize which alerts you receive and how you're notified</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-700 font-medium mb-3 block">Alert Types</Label>
                  <div className="space-y-2">
                    {Object.entries(alertTypeIcons).map(([type, Icon]) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={type}
                          checked={subscription.alertTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSubscription({
                                ...subscription,
                                alertTypes: [...subscription.alertTypes, type],
                              })
                            } else {
                              setSubscription({
                                ...subscription,
                                alertTypes: subscription.alertTypes.filter((t) => t !== type),
                              })
                            }
                          }}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <Icon className="h-4 w-4 text-gray-600" />
                        <Label htmlFor={type} className="text-sm font-normal capitalize">
                          {type} Alerts
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 font-medium mb-3 block">Notification Methods</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="email"
                        checked={subscription.notificationMethods.includes("email")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSubscription({
                              ...subscription,
                              notificationMethods: [...subscription.notificationMethods, "email"],
                            })
                          } else {
                            setSubscription({
                              ...subscription,
                              notificationMethods: subscription.notificationMethods.filter((m) => m !== "email"),
                            })
                          }
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <Mail className="h-4 w-4 text-gray-600" />
                      <Label htmlFor="email" className="text-sm font-normal">
                        Email Notifications
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sms"
                        checked={subscription.notificationMethods.includes("sms")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSubscription({
                              ...subscription,
                              notificationMethods: [...subscription.notificationMethods, "sms"],
                            })
                          } else {
                            setSubscription({
                              ...subscription,
                              notificationMethods: subscription.notificationMethods.filter((m) => m !== "sms"),
                            })
                          }
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <Phone className="h-4 w-4 text-gray-600" />
                      <Label htmlFor="sms" className="text-sm font-normal">
                        SMS Notifications
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="push"
                        checked={subscription.notificationMethods.includes("push")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSubscription({
                              ...subscription,
                              notificationMethods: [...subscription.notificationMethods, "push"],
                            })
                          } else {
                            setSubscription({
                              ...subscription,
                              notificationMethods: subscription.notificationMethods.filter((m) => m !== "push"),
                            })
                          }
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <Bell className="h-4 w-4 text-gray-600" />
                      <Label htmlFor="push" className="text-sm font-normal">
                        Push Notifications
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="locations" className="text-gray-700 font-medium">
                    Alert Locations
                  </Label>
                  <Input
                    id="locations"
                    value={subscription.locations.join(", ")}
                    onChange={(e) =>
                      setSubscription({
                        ...subscription,
                        locations: e.target.value
                          .split(",")
                          .map((l) => l.trim())
                          .filter((l) => l),
                      })
                    }
                    placeholder="e.g., Central Coast, Blue Mountains, Hunter Valley"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter locations separated by commas</p>
                </div>

                <Button
                  onClick={handleUpdateSubscription}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Update Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Alert History</h2>
              <div className="grid gap-4">
                {alerts.map((alert) => {
                  const AlertIcon = alertTypeIcons[alert.type]
                  const alertColor = alertTypeColors[alert.type]
                  const severityColor = severityColors[alert.severity]

                  return (
                    <Card key={alert.id} className="shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <AlertIcon className="h-5 w-5 text-gray-600" />
                            <div>
                              <h3 className="font-semibold">{alert.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={alertColor}>{alert.type}</Badge>
                                <Badge className={severityColor}>{alert.severity}</Badge>
                                <Badge variant={alert.isActive ? "default" : "secondary"}>
                                  {alert.isActive ? "Active" : "Expired"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div>{formatTimeAgo(alert.issuedAt)}</div>
                            <div>{alert.recipientCount.toLocaleString()} recipients</div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mt-2">{alert.message}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Named export for compatibility
export { EmergencyAlertSystem }
