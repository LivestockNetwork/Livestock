"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Flame,
  Droplets,
  Wind,
  Zap,
  Users,
  MapPin,
  Clock,
  Send,
  Bell,
  X,
  CheckCircle,
  Phone,
  Radio,
} from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "bushfire" | "flood" | "storm" | "evacuation" | "weather" | "community"
  severity: "low" | "moderate" | "high" | "extreme"
  title: string
  message: string
  location: string
  radius: number
  issuedBy: string
  timestamp: Date
  expiresAt: Date
  actionRequired: string[]
  contactInfo: string
  isActive: boolean
  affectedAreas: string[]
  evacuationZones?: string[]
  shelterLocations?: string[]
}

export default function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "1",
      type: "bushfire",
      severity: "extreme",
      title: "EMERGENCY WARNING - Bushfire Approaching Manning Valley",
      message:
        "A fast-moving bushfire is approaching Manning Valley from the west. Immediate action required for residents in affected areas. Conditions are extremely dangerous.",
      location: "Manning Valley, NSW",
      radius: 25,
      issuedBy: "NSW Rural Fire Service",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
      actionRequired: [
        "Evacuate immediately if in fire path",
        "Move livestock to safe areas",
        "Activate sprinkler systems",
        "Monitor emergency radio",
      ],
      contactInfo: "Emergency: 000 | RFS: 1800 679 737",
      isActive: true,
      affectedAreas: ["Taree", "Wingham", "Gloucester"],
      evacuationZones: ["Zone A: Taree West", "Zone B: Wingham Rural"],
      shelterLocations: ["Taree Showgrounds", "Wingham RSL"],
    },
    {
      id: "2",
      type: "flood",
      severity: "high",
      title: "FLOOD WARNING - Manning River Rising",
      message:
        "The Manning River is rising rapidly due to heavy rainfall upstream. Flooding expected in low-lying areas within 2-4 hours.",
      location: "Manning Valley, NSW",
      radius: 15,
      issuedBy: "Bureau of Meteorology",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      actionRequired: [
        "Move livestock to higher ground",
        "Secure loose items",
        "Prepare evacuation routes",
        "Monitor river levels",
      ],
      contactInfo: "SES: 132 500 | Emergency: 000",
      isActive: true,
      affectedAreas: ["Taree", "Krambach", "Cundletown"],
    },
    {
      id: "3",
      type: "weather",
      severity: "moderate",
      title: "Severe Weather Warning - Damaging Winds",
      message: "Damaging winds with gusts up to 90km/h expected. Risk of power outages and falling trees.",
      location: "Hunter Valley, NSW",
      radius: 50,
      issuedBy: "Bureau of Meteorology",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      actionRequired: [
        "Secure outdoor equipment",
        "Check generator fuel",
        "Shelter livestock",
        "Avoid travel if possible",
      ],
      contactInfo: "SES: 132 500",
      isActive: true,
      affectedAreas: ["Muswellbrook", "Singleton", "Cessnock"],
    },
  ])

  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false)
  const [newAlert, setNewAlert] = useState({
    type: "",
    severity: "",
    title: "",
    message: "",
    location: "",
    radius: 10,
    actionRequired: "",
    contactInfo: "",
    expiresIn: 6,
  })

  const alertTypes = {
    bushfire: { icon: Flame, color: "red", label: "Bushfire" },
    flood: { icon: Droplets, color: "blue", label: "Flood" },
    storm: { icon: Wind, color: "purple", label: "Storm" },
    evacuation: { icon: Users, color: "orange", label: "Evacuation" },
    weather: { icon: Zap, color: "yellow", label: "Weather" },
    community: { icon: Bell, color: "green", label: "Community" },
  }

  const severityColors = {
    low: "bg-green-100 text-green-800 border-green-300",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-300",
    high: "bg-orange-100 text-orange-800 border-orange-300",
    extreme: "bg-red-100 text-red-800 border-red-300 animate-pulse",
  }

  const createAlert = () => {
    const alert: EmergencyAlert = {
      id: Date.now().toString(),
      type: newAlert.type as any,
      severity: newAlert.severity as any,
      title: newAlert.title,
      message: newAlert.message,
      location: newAlert.location,
      radius: newAlert.radius,
      issuedBy: "Community Coordinator",
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + newAlert.expiresIn * 60 * 60 * 1000),
      actionRequired: newAlert.actionRequired.split("\n").filter((a) => a.trim()),
      contactInfo: newAlert.contactInfo,
      isActive: true,
      affectedAreas: [newAlert.location],
    }

    setAlerts([alert, ...alerts])
    setIsCreateAlertOpen(false)
    setNewAlert({
      type: "",
      severity: "",
      title: "",
      message: "",
      location: "",
      radius: 10,
      actionRequired: "",
      contactInfo: "",
      expiresIn: 6,
    })
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isActive: false } : alert)))
  }

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const getTimeUntilExpiry = (expiresAt: Date) => {
    const minutes = Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60))
    if (minutes < 60) return `${minutes}m remaining`
    const hours = Math.floor(minutes / 60)
    return `${hours}h remaining`
  }

  const activeAlerts = alerts.filter((alert) => alert.isActive)
  const expiredAlerts = alerts.filter((alert) => !alert.isActive)

  return (
    <div className="space-y-6">
      {/* Alert Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Emergency Alert System</h2>
            <p className="text-slate-600">
              {activeAlerts.length} active alert{activeAlerts.length !== 1 ? "s" : ""} in your area
            </p>
          </div>
        </div>

        <Button onClick={() => setIsCreateAlertOpen(true)} className="bg-red-500 hover:bg-red-600 text-white">
          <Bell className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-500" />
            Active Alerts
          </h3>

          {activeAlerts.map((alert) => {
            const AlertIcon = alertTypes[alert.type].icon
            return (
              <Card key={alert.id} className={`border-l-4 border-${alertTypes[alert.type].color}-500 shadow-lg`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-${alertTypes[alert.type].color}-100`}>
                        <AlertIcon className={`h-5 w-5 text-${alertTypes[alert.type].color}-600`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={severityColors[alert.severity]}>{alert.severity.toUpperCase()}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {alertTypes[alert.type].label}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">{alert.message}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {alert.location} ({alert.radius}km radius)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          Issued {getTimeAgo(alert.timestamp)} • {getTimeUntilExpiry(alert.expiresAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Radio className="h-4 w-4" />
                        <span>By {alert.issuedBy}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="h-4 w-4" />
                        <span>{alert.contactInfo}</span>
                      </div>
                      {alert.affectedAreas && (
                        <div className="text-sm text-slate-600">
                          <strong>Affected:</strong> {alert.affectedAreas.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>

                  {alert.actionRequired.length > 0 && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-800 mb-2">Action Required:</h4>
                      <ul className="space-y-1">
                        {alert.actionRequired.map((action, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(alert.evacuationZones || alert.shelterLocations) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {alert.evacuationZones && (
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">Evacuation Zones:</h4>
                          <ul className="space-y-1">
                            {alert.evacuationZones.map((zone, index) => (
                              <li key={index} className="text-sm text-orange-700">
                                • {zone}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {alert.shelterLocations && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Shelter Locations:</h4>
                          <ul className="space-y-1">
                            {alert.shelterLocations.map((shelter, index) => (
                              <li key={index} className="text-sm text-green-700">
                                • {shelter}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Phone className="h-3 w-3 mr-1" />
                      Call Emergency
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      Coordinate Response
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="h-3 w-3 mr-1" />
                      Share Alert
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Create Alert Modal */}
      {isCreateAlertOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-red-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Create Emergency Alert</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateAlertOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Alert Type</label>
                  <Select value={newAlert.type} onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(alertTypes).map(([key, type]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Severity</label>
                  <Select
                    value={newAlert.severity}
                    onValueChange={(value) => setNewAlert({ ...newAlert, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="extreme">Extreme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Alert Title</label>
                <Input
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                  placeholder="Brief, clear title for the alert"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Alert Message</label>
                <Textarea
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                  placeholder="Detailed information about the emergency"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <Input
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    placeholder="e.g., Manning Valley, NSW"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Radius (km)</label>
                  <Input
                    type="number"
                    value={newAlert.radius}
                    onChange={(e) => setNewAlert({ ...newAlert, radius: Number.parseInt(e.target.value) })}
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Action Required (one per line)</label>
                <Textarea
                  value={newAlert.actionRequired}
                  onChange={(e) => setNewAlert({ ...newAlert, actionRequired: e.target.value })}
                  placeholder="Evacuate immediately&#10;Move livestock to safety&#10;Monitor emergency radio"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Information</label>
                  <Input
                    value={newAlert.contactInfo}
                    onChange={(e) => setNewAlert({ ...newAlert, contactInfo: e.target.value })}
                    placeholder="Emergency: 000 | SES: 132 500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Expires In (hours)</label>
                  <Input
                    type="number"
                    value={newAlert.expiresIn}
                    onChange={(e) => setNewAlert({ ...newAlert, expiresIn: Number.parseInt(e.target.value) })}
                    placeholder="6"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={createAlert}
                  className="bg-red-500 hover:bg-red-600 text-white flex-1"
                  disabled={!newAlert.type || !newAlert.severity || !newAlert.title || !newAlert.message}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Alert
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateAlertOpen(false)}
                  className="border-slate-300 text-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Alerts */}
      {expiredAlerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Recent Alerts</h3>

          {expiredAlerts.slice(0, 3).map((alert) => {
            const AlertIcon = alertTypes[alert.type].icon
            return (
              <Card key={alert.id} className="border-slate-200 opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-slate-100`}>
                      <AlertIcon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {alertTypes[alert.type].label}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-slate-500">
                          Resolved
                        </Badge>
                      </div>
                      <h4 className="font-medium text-slate-700">{alert.title}</h4>
                      <p className="text-sm text-slate-500">
                        {alert.location} • {getTimeAgo(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
