"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  Flame,
  CloudRain,
  Wind,
  Zap,
  Phone,
  MessageSquare,
  Share2,
  MapPin,
  Clock,
  CheckCircle,
  X,
} from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "fire" | "flood" | "storm" | "power" | "general"
  title: string
  message: string
  location: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  actions: string[]
  isActive: boolean
}

const mockAlerts: EmergencyAlert[] = [
  {
    id: "1",
    type: "fire",
    title: "Total Fire Ban",
    message:
      "Total Fire Ban declared for Hunter Valley region. No fires permitted. Extreme fire danger conditions expected.",
    location: "Hunter Valley, NSW",
    severity: "critical",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    actions: ["Prepare evacuation plan", "Check water supplies", "Clear property of flammable materials"],
    isActive: true,
  },
  {
    id: "2",
    type: "flood",
    title: "Flood Warning",
    message: "Minor flooding expected along Manning River. Water levels rising. Move livestock to higher ground.",
    location: "Manning Valley, NSW",
    severity: "medium",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    actions: ["Move livestock to safety", "Secure loose items", "Monitor water levels"],
    isActive: true,
  },
  {
    id: "3",
    type: "storm",
    title: "Severe Weather Warning",
    message: "Severe thunderstorms with damaging winds and large hail possible. Secure outdoor equipment.",
    location: "Central Coast, NSW",
    severity: "high",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    actions: ["Secure loose objects", "Shelter animals", "Avoid travel if possible"],
    isActive: true,
  },
]

const getAlertIcon = (type: EmergencyAlert["type"]) => {
  switch (type) {
    case "fire":
      return <Flame className="h-5 w-5" />
    case "flood":
      return <CloudRain className="h-5 w-5" />
    case "storm":
      return <Wind className="h-5 w-5" />
    case "power":
      return <Zap className="h-5 w-5" />
    default:
      return <AlertTriangle className="h-5 w-5" />
  }
}

const getSeverityColor = (severity: EmergencyAlert["severity"]) => {
  switch (severity) {
    case "critical":
      return "border-red-500 bg-red-50 text-red-900"
    case "high":
      return "border-orange-500 bg-orange-50 text-orange-900"
    case "medium":
      return "border-yellow-500 bg-yellow-50 text-yellow-900"
    case "low":
      return "border-blue-500 bg-blue-50 text-blue-900"
    default:
      return "border-gray-500 bg-gray-50 text-gray-900"
  }
}

const getSeverityBadgeColor = (severity: EmergencyAlert["severity"]) => {
  switch (severity) {
    case "critical":
      return "bg-red-600 text-white"
    case "high":
      return "bg-orange-600 text-white"
    case "medium":
      return "bg-yellow-600 text-white"
    case "low":
      return "bg-blue-600 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}h ago`
  }
}

export default function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts)
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  const activeAlerts = alerts.filter((alert) => alert.isActive && !dismissedAlerts.includes(alert.id))

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId])
  }

  const acknowledgeAlert = (alertId: string) => {
    // In a real app, this would send acknowledgment to the server
    console.log(`Alert ${alertId} acknowledged`)
  }

  const shareAlert = (alert: EmergencyAlert) => {
    if (navigator.share) {
      navigator.share({
        title: alert.title,
        text: alert.message,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${alert.title}: ${alert.message}`)
    }
  }

  const callEmergencyServices = () => {
    window.location.href = "tel:000"
  }

  if (activeAlerts.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-green-800">
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-medium">No active emergency alerts for your area</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Emergency Alerts</h2>
        <Badge className="bg-red-600 text-white">
          {activeAlerts.length} Active Alert{activeAlerts.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Critical Actions */}
      {activeAlerts.some((alert) => alert.severity === "critical") && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Critical Alert Active:</strong> Immediate action may be required.
            <Button size="sm" className="ml-4 bg-red-600 hover:bg-red-700" onClick={callEmergencyServices}>
              <Phone className="h-4 w-4 mr-1" />
              Call 000
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Alert Cards */}
      <div className="space-y-4">
        {activeAlerts.map((alert) => (
          <Card key={alert.id} className={`border-2 ${getSeverityColor(alert.severity)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getSeverityBadgeColor(alert.severity)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {alert.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTimeAgo(alert.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityBadgeColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{alert.message}</p>

              {/* Recommended Actions */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Recommended Actions:</h4>
                <ul className="space-y-1">
                  {alert.actions.map((action, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Acknowledge
                </Button>
                <Button size="sm" variant="outline" onClick={() => shareAlert(alert)}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={`sms:?body=${encodeURIComponent(`${alert.title}: ${alert.message}`)}`}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Send SMS
                  </a>
                </Button>
                {alert.severity === "critical" && (
                  <Button size="sm" variant="destructive" onClick={callEmergencyServices}>
                    <Phone className="h-4 w-4 mr-1" />
                    Call 000
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>Quick access to important emergency numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col bg-transparent" asChild>
              <a href="tel:000">
                <Phone className="h-6 w-6 mb-2 text-red-600" />
                <span className="font-semibold">Emergency Services</span>
                <span className="text-sm text-gray-600">000</span>
              </a>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col bg-transparent" asChild>
              <a href="tel:132500">
                <Flame className="h-6 w-6 mb-2 text-orange-600" />
                <span className="font-semibold">Fire & Rescue</span>
                <span className="text-sm text-gray-600">132 500</span>
              </a>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col bg-transparent" asChild>
              <a href="tel:132625">
                <Wind className="h-6 w-6 mb-2 text-blue-600" />
                <span className="font-semibold">SES</span>
                <span className="text-sm text-gray-600">132 625</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
