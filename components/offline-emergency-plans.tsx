"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  Flame,
  Droplets,
  Clock,
  MapPin,
  Phone,
  Users,
  Truck,
  Home,
} from "lucide-react"

interface OfflinePlan {
  id: string
  type: "bushfire" | "flood" | "storm" | "general"
  title: string
  lastUpdated: Date
  isDownloaded: boolean
  size: string
  priority: "high" | "medium" | "low"
  sections: {
    evacuation: string[]
    contacts: { name: string; phone: string; role: string }[]
    livestock: string[]
    equipment: string[]
    routes: string[]
    shelters: string[]
  }
}

export default function OfflineEmergencyPlans() {
  const [isOnline, setIsOnline] = useState(true)
  const [downloadedPlans, setDownloadedPlans] = useState<string[]>(["1", "2"])
  const [selectedPlan, setSelectedPlan] = useState<OfflinePlan | null>(null)

  const plans: OfflinePlan[] = [
    {
      id: "1",
      type: "bushfire",
      title: "Bushfire Emergency Plan - Manning Valley",
      lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isDownloaded: true,
      size: "2.3 MB",
      priority: "high",
      sections: {
        evacuation: [
          "Monitor fire danger ratings daily during fire season",
          "Evacuate when fire danger reaches EXTREME",
          "Primary route: Manning River Drive to Taree",
          "Alternative route: Bucketts Way to Gloucester",
          "Assembly point: Taree Showgrounds",
        ],
        contacts: [
          { name: "Emergency Services", phone: "000", role: "Emergency" },
          { name: "NSW RFS", phone: "1800 679 737", role: "Fire Information" },
          { name: "Sarah Mitchell", phone: "0412 345 678", role: "Neighbor - Cattle Transport" },
          { name: "Tom Roberts", phone: "0423 456 789", role: "Neighbor - Equipment" },
        ],
        livestock: [
          "Move cattle to eastern paddock (higher ground)",
          "Ensure water troughs are full",
          "Prepare livestock transport if evacuation needed",
          "Contact Sarah Mitchell for emergency transport",
        ],
        equipment: [
          "Generator fueled and tested",
          "Water pumps operational",
          "Fire extinguishers checked",
          "Emergency radio with spare batteries",
        ],
        routes: [
          "Primary: Manning River Drive → Taree (15 minutes)",
          "Secondary: Bucketts Way → Gloucester (25 minutes)",
          "Emergency: Old Pacific Highway → Forster (45 minutes)",
        ],
        shelters: [
          "Taree Showgrounds - 500 capacity",
          "Wingham RSL - 200 capacity",
          "Gloucester Community Center - 150 capacity",
        ],
      },
    },
    {
      id: "2",
      type: "flood",
      title: "Flood Emergency Plan - Manning Valley",
      lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isDownloaded: true,
      size: "1.8 MB",
      priority: "high",
      sections: {
        evacuation: [
          "Monitor Manning River levels at Taree gauge",
          "Evacuate when river reaches 4.5m (moderate flood)",
          "Move to higher ground immediately",
          "Use boats if roads are cut",
        ],
        contacts: [
          { name: "Emergency Services", phone: "000", role: "Emergency" },
          { name: "SES", phone: "132 500", role: "Flood Rescue" },
          { name: "Tom Roberts", phone: "0423 456 789", role: "Neighbor - Has Boat" },
          { name: "David Chen", phone: "0434 567 890", role: "High Ground Property" },
        ],
        livestock: [
          "Move livestock to hill paddock immediately",
          "Prepare for emergency agistment at David Chen's",
          "Ensure livestock have access to high ground",
          "Contact Tom Roberts for boat evacuation if needed",
        ],
        equipment: [
          "Boat fueled and ready",
          "Life jackets accessible",
          "Waterproof emergency kit prepared",
          "Satellite phone charged",
        ],
        routes: [
          "High ground route: Hill Road → Wingham Heights",
          "Boat evacuation: Manning River → Taree Marina",
          "Emergency: Helicopter landing zone - Top Paddock",
        ],
        shelters: [
          "Wingham Heights Community Hall",
          "Taree High School (Evacuation Center)",
          "David Chen's Property (Livestock)",
        ],
      },
    },
    {
      id: "3",
      type: "storm",
      title: "Severe Storm Plan - Manning Valley",
      lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      isDownloaded: false,
      size: "1.2 MB",
      priority: "medium",
      sections: {
        evacuation: [],
        contacts: [],
        livestock: [],
        equipment: [],
        routes: [],
        shelters: [],
      },
    },
  ]

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const downloadPlan = (planId: string) => {
    // Simulate download
    setDownloadedPlans([...downloadedPlans, planId])

    // In a real app, this would download and cache the plan data
    console.log(`Downloading plan ${planId} for offline access`)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bushfire":
        return <Flame className="h-5 w-5 text-red-500" />
      case "flood":
        return <Droplets className="h-5 w-5 text-blue-500" />
      case "storm":
        return <AlertTriangle className="h-5 w-5 text-purple-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-slate-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Offline Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Emergency Plans</h2>
          <p className="text-slate-600">Offline-ready emergency plans for your property</p>
        </div>

        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center gap-2 text-green-600">
              <Wifi className="h-4 w-4" />
              <span className="text-sm font-medium">Online</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-medium">Offline</span>
            </div>
          )}
        </div>
      </div>

      {!isOnline && (
        <Card className="border-l-4 border-amber-500 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <WifiOff className="h-5 w-5 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">You're offline</h3>
                <p className="text-sm text-amber-700">
                  Only downloaded plans are available. Download plans while online for offline access.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plans List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Available Plans</h3>

          {plans.map((plan) => {
            const isDownloaded = downloadedPlans.includes(plan.id)
            const isAccessible = isOnline || isDownloaded

            return (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all ${
                  selectedPlan?.id === plan.id ? "ring-2 ring-teal-400" : ""
                } ${!isAccessible ? "opacity-50" : ""}`}
                onClick={() => isAccessible && setSelectedPlan(plan)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(plan.type)}
                      <div>
                        <h4 className="font-semibold text-slate-800">{plan.title}</h4>
                        <p className="text-sm text-slate-600">Updated {plan.lastUpdated.toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(plan.priority)}>{plan.priority}</Badge>
                      {isDownloaded && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{plan.size}</span>

                    {!isDownloaded && isOnline && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadPlan(plan.id)
                        }}
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    )}

                    {!isAccessible && (
                      <Badge variant="outline" className="text-slate-500">
                        Offline - Not Downloaded
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Plan Details */}
        <div>
          {selectedPlan ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {getTypeIcon(selectedPlan.type)}
                  <CardTitle className="text-lg">{selectedPlan.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    Last updated {selectedPlan.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Evacuation Procedures */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Evacuation Procedures
                  </h4>
                  <ul className="space-y-1">
                    {selectedPlan.sections.evacuation.map((step, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-teal-500 font-bold">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emergency Contacts */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    Emergency Contacts
                  </h4>
                  <div className="space-y-2">
                    {selectedPlan.sections.contacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{contact.name}</div>
                          <div className="text-xs text-slate-600">{contact.role}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => (window.location.href = `tel:${contact.phone}`)}
                          className="text-xs"
                        >
                          {contact.phone}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Livestock Actions */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    Livestock Actions
                  </h4>
                  <ul className="space-y-1">
                    {selectedPlan.sections.livestock.map((action, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Equipment Checklist */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-purple-500" />
                    Equipment Checklist
                  </h4>
                  <ul className="space-y-1">
                    {selectedPlan.sections.equipment.map((item, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Evacuation Routes */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    Evacuation Routes
                  </h4>
                  <ul className="space-y-1">
                    {selectedPlan.sections.routes.map((route, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                        <MapPin className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                        {route}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emergency Shelters */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-500" />
                    Emergency Shelters
                  </h4>
                  <ul className="space-y-1">
                    {selectedPlan.sections.shelters.map((shelter, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                        <Home className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        {shelter}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertTriangle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Select an Emergency Plan</h3>
                <p className="text-slate-600">
                  Choose a plan from the list to view detailed emergency procedures and contact information.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
