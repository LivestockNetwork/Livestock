"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Flame,
  CloudRain,
  Wind,
  Zap,
  Bell,
  MapPin,
  Clock,
  Phone,
  Shield,
  Users,
  ExternalLink,
} from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "fire" | "flood" | "storm" | "drought" | "general"
  severity: "low" | "medium" | "high" | "extreme"
  title: string
  description: string
  location: string
  affectedAreas: string[]
  timestamp: string
  expiresAt: string
  actions: string[]
  contacts: Array<{
    name: string
    phone: string
    type: "emergency" | "local" | "support"
  }>
  resources: Array<{
    title: string
    url: string
    type: "evacuation" | "shelter" | "info"
  }>
}

const mockAlerts: EmergencyAlert[] = [
  {
    id: "1",
    type: "fire",
    severity: "high",
    title: "Bushfire Emergency Warning",
    description:
      "A fast-moving bushfire is threatening properties in the Blue Mountains area. Immediate action required for residents in affected zones.",
    location: "Blue Mountains, NSW",
    affectedAreas: ["Katoomba", "Leura", "Wentworth Falls", "Blackheath"],
    timestamp: "2024-01-15T14:30:00Z",
    expiresAt: "2024-01-16T06:00:00Z",
    actions: [
      "Evacuate immediately if in the fire path",
      "Monitor RFS updates continuously",
      "Prepare your emergency kit",
      "Check on neighbors and livestock",
    ],
    contacts: [
      { name: "Emergency Services", phone: "000", type: "emergency" },
      { name: "RFS Blue Mountains", phone: "1800-679-737", type: "local" },
      { name: "Evacuation Support", phone: "1800-227-228", type: "support" },
    ],
    resources: [
      { title: "Evacuation Routes Map", url: "/evacuation-map", type: "evacuation" },
      { title: "Emergency Shelters", url: "/shelters", type: "shelter" },
      { title: "RFS Fire Updates", url: "https://fires.nsw.gov.au", type: "info" },
    ],
  },
  {
    id: "2",
    type: "flood",
    severity: "medium",
    title: "Flood Watch - Murray River",
    description:
      "Minor to moderate flooding is possible along the Murray River system. Monitor conditions and prepare for potential evacuation.",
    location: "Murray River, VIC/NSW",
    affectedAreas: ["Albury", "Wodonga", "Echuca", "Swan Hill"],
    timestamp: "2024-01-15T10:00:00Z",
    expiresAt: "2024-01-17T18:00:00Z",
    actions: [
      "Monitor river levels closely",
      "Prepare sandbags if available",
      "Move livestock to higher ground",
      "Review evacuation plans",
    ],
    contacts: [
      { name: "Emergency Services", phone: "000", type: "emergency" },
      { name: "SES Murray River", phone: "132-500", type: "local" },
      { name: "Flood Information", phone: "1300-659-210", type: "support" },
    ],
    resources: [
      { title: "River Level Monitoring", url: "/river-levels", type: "info" },
      { title: "Flood Safety Guide", url: "/flood-safety", type: "info" },
      { title: "Emergency Shelters", url: "/shelters", type: "shelter" },
    ],
  },
]

const getAlertIcon = (type: string) => {
  switch (type) {
    case "fire":
      return <Flame className="h-5 w-5" />
    case "flood":
      return <CloudRain className="h-5 w-5" />
    case "storm":
      return <Wind className="h-5 w-5" />
    case "drought":
      return <Zap className="h-5 w-5" />
    default:
      return <AlertTriangle className="h-5 w-5" />
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "extreme":
      return "bg-red-600 text-white border-red-600"
    case "high":
      return "bg-orange-500 text-white border-orange-500"
    case "medium":
      return "bg-yellow-500 text-black border-yellow-500"
    case "low":
      return "bg-blue-500 text-white border-blue-500"
    default:
      return "bg-gray-500 text-white border-gray-500"
  }
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts)
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  useEffect(() => {
    // Check if notifications are supported and enabled
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted")
    }
  }, [])

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationsEnabled(permission === "granted")
    }
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
    if (selectedAlert?.id === alertId) {
      setSelectedAlert(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            Emergency Alert System
          </h1>
          <p className="text-gray-600 mt-2">Real-time emergency alerts for your area</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className={`${alerts.length > 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
            {alerts.length} Active Alert{alerts.length !== 1 ? "s" : ""}
          </Badge>
          {!notificationsEnabled && (
            <Button onClick={requestNotificationPermission} variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Enable Notifications
            </Button>
          )}
        </div>
      </div>

      {/* Active Alerts Overview */}
      {alerts.length > 0 ? (
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.severity === "extreme"
                  ? "border-l-red-600"
                  : alert.severity === "high"
                    ? "border-l-orange-500"
                    : alert.severity === "medium"
                      ? "border-l-yellow-500"
                      : "border-l-blue-500"
              } cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => setSelectedAlert(alert)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        alert.severity === "extreme"
                          ? "bg-red-100 text-red-600"
                          : alert.severity === "high"
                            ? "bg-orange-100 text-orange-600"
                            : alert.severity === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                      }`}
                    >
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
                          {formatTime(alert.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                      Affected: {alert.affectedAreas.slice(0, 2).join(", ")}
                      {alert.affectedAreas.length > 2 ? ` +${alert.affectedAreas.length - 2} more` : ""}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        acknowledgeAlert(alert.id)
                      }}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Alerts</h3>
            <p className="text-gray-600">
              Your area is currently clear of emergency alerts. We'll notify you immediately if any situations develop.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Detailed Alert Modal/Panel */}
      {selectedAlert && (
        <Card className="border-2 border-orange-200">
          <CardHeader className="bg-orange-50">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl flex items-center">
                  {getAlertIcon(selectedAlert.type)}
                  <span className="ml-2">{selectedAlert.title}</span>
                </CardTitle>
                <CardDescription className="mt-2 text-base">{selectedAlert.description}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(null)}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Actions */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Recommended Actions
                </h4>
                <ul className="space-y-2">
                  {selectedAlert.actions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacts */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Contacts
                </h4>
                <div className="space-y-2">
                  {selectedAlert.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{contact.name}</div>
                        <div className="text-xs text-gray-600 capitalize">{contact.type}</div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-3 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Additional Resources
                </h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {selectedAlert.resources.map((resource, index) => (
                    <Button key={index} variant="outline" size="sm" asChild className="justify-start bg-transparent">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.title}
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Affected Areas */}
              <div className="md:col-span-2">
                <h4 className="font-semibold mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Affected Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.affectedAreas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                Close
              </Button>
              <Button onClick={() => acknowledgeAlert(selectedAlert.id)}>Acknowledge Alert</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Alert System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Online</div>
              <div className="text-sm text-gray-600">System Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15,247</div>
              <div className="text-sm text-gray-600">Properties Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Active Alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
