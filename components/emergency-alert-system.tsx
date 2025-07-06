"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Flame, CloudRain, Wind, Bell, BellOff, MapPin, Clock, Phone, Mail } from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "bushfire" | "flood" | "storm" | "general"
  severity: "low" | "medium" | "high" | "extreme"
  title: string
  message: string
  location: string
  timestamp: Date
  isActive: boolean
  source: string
}

const mockAlerts: EmergencyAlert[] = [
  {
    id: "1",
    type: "bushfire",
    severity: "high",
    title: "Bushfire Watch - Central West NSW",
    message:
      "Extreme fire danger forecast for Central West NSW. Prepare your property and livestock evacuation plans. Monitor conditions closely.",
    location: "Central West NSW",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isActive: true,
    source: "NSW Rural Fire Service",
  },
  {
    id: "2",
    type: "flood",
    severity: "medium",
    title: "Flood Warning - Murray River",
    message: "Minor flooding expected along Murray River. Move livestock to higher ground and secure equipment.",
    location: "Murray River",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isActive: true,
    source: "Bureau of Meteorology",
  },
  {
    id: "3",
    type: "storm",
    severity: "medium",
    title: "Severe Weather Warning - Hunter Valley",
    message: "Damaging winds and large hail possible. Secure loose items and shelter animals.",
    location: "Hunter Valley",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    isActive: false,
    source: "Bureau of Meteorology",
  },
]

export default function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "bushfire":
        return Flame
      case "flood":
        return CloudRain
      case "storm":
        return Wind
      default:
        return AlertTriangle
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "bg-red-600 text-white"
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-orange-500 text-white"
      case "low":
        return "bg-yellow-500 text-black"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`
    }
  }

  const activeAlerts = alerts.filter((alert) => alert.isActive)
  const recentAlerts = alerts.filter((alert) => !alert.isActive).slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Alert Preferences</span>
          </CardTitle>
          <CardDescription>Configure how you want to receive emergency notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <Label htmlFor="notifications">Push Notifications</Label>
            </div>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <Label htmlFor="email">Email Alerts</Label>
            </div>
            <Switch id="email" checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <Label htmlFor="sms">SMS Alerts</Label>
            </div>
            <Switch id="sms" checked={smsAlerts} onCheckedChange={setSmsAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Active Emergency Alerts</span>
              <Badge variant="destructive">{activeAlerts.length}</Badge>
            </CardTitle>
            <CardDescription>Current emergency warnings affecting your area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type)
              return (
                <Alert key={alert.id} className="border-l-4 border-l-red-500">
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                      </div>
                      <AlertDescription className="text-gray-700 mb-3">{alert.message}</AlertDescription>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alert.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimestamp(alert.timestamp)}
                          </span>
                        </div>
                        <span className="text-xs">{alert.source}</span>
                      </div>
                    </div>
                  </div>
                </Alert>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Alerts</span>
          </CardTitle>
          <CardDescription>Previously issued emergency alerts for your area</CardDescription>
        </CardHeader>
        <CardContent>
          {recentAlerts.length > 0 ? (
            <div className="space-y-4">
              {recentAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type)
                return (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-gray-50">
                    <Icon className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {alert.location}
                        </span>
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BellOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent alerts</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>Important numbers for emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Emergency Services</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Emergency (Fire, Police, Ambulance)</span>
                  <span className="font-mono">000</span>
                </div>
                <div className="flex justify-between">
                  <span>NSW Rural Fire Service</span>
                  <span className="font-mono">1800 679 737</span>
                </div>
                <div className="flex justify-between">
                  <span>SES (Flood/Storm)</span>
                  <span className="font-mono">132 500</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Information Services</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Bureau of Meteorology</span>
                  <span className="font-mono">1900 937 107</span>
                </div>
                <div className="flex justify-between">
                  <span>NSW Emergency Info</span>
                  <span className="font-mono">1800 227 228</span>
                </div>
                <div className="flex justify-between">
                  <span>Animal Emergency Hotline</span>
                  <span className="font-mono">1800 814 647</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
