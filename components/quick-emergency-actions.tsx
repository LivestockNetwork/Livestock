"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Users, MapPin, Zap, Truck, Home, Radio, Heart, Shield, Clock, Send } from "lucide-react"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  color: string
  urgency: "immediate" | "urgent" | "important"
  action: () => void
}

export default function QuickEmergencyActions() {
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const executeAction = async (actionId: string, actionFn: () => void) => {
    setIsProcessing(true)
    setLastAction(actionId)

    // Simulate action processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    actionFn()
    setIsProcessing(false)

    // Clear last action after 3 seconds
    setTimeout(() => setLastAction(null), 3000)
  }

  const quickActions: QuickAction[] = [
    {
      id: "call-000",
      title: "Call 000",
      description: "Emergency services",
      icon: Phone,
      color: "bg-red-600 hover:bg-red-700",
      urgency: "immediate",
      action: () => {
        window.location.href = "tel:000"
      },
    },
    {
      id: "emergency-alert",
      title: "Send Emergency Alert",
      description: "Alert local community",
      icon: AlertTriangle,
      color: "bg-red-500 hover:bg-red-600",
      urgency: "immediate",
      action: () => {
        // Open emergency alert modal
        console.log("Opening emergency alert modal")
      },
    },
    {
      id: "request-help",
      title: "Request Help",
      description: "Ask locals for assistance",
      icon: Users,
      color: "bg-orange-500 hover:bg-orange-600",
      urgency: "urgent",
      action: () => {
        // Open help request form
        console.log("Opening help request form")
      },
    },
    {
      id: "share-location",
      title: "Share Location",
      description: "Send GPS coordinates",
      icon: MapPin,
      color: "bg-blue-500 hover:bg-blue-600",
      urgency: "urgent",
      action: () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            console.log(`Sharing location: ${latitude}, ${longitude}`)
            // In real app, would send to community
          })
        }
      },
    },
    {
      id: "evacuation-plan",
      title: "View Evacuation Plan",
      description: "Access offline emergency plan",
      icon: Shield,
      color: "bg-purple-500 hover:bg-purple-600",
      urgency: "urgent",
      action: () => {
        // Navigate to offline emergency plans
        window.location.href = "/emergency-plans"
      },
    },
    {
      id: "contact-neighbors",
      title: "Contact Neighbors",
      description: "Quick call emergency contacts",
      icon: Heart,
      color: "bg-green-500 hover:bg-green-600",
      urgency: "important",
      action: () => {
        // Open emergency contacts list
        console.log("Opening emergency contacts")
      },
    },
    {
      id: "equipment-request",
      title: "Need Equipment",
      description: "Request emergency equipment",
      icon: Truck,
      color: "bg-indigo-500 hover:bg-indigo-600",
      urgency: "important",
      action: () => {
        // Open equipment request form
        console.log("Opening equipment request")
      },
    },
    {
      id: "shelter-info",
      title: "Find Shelter",
      description: "Locate emergency shelters",
      icon: Home,
      color: "bg-teal-500 hover:bg-teal-600",
      urgency: "important",
      action: () => {
        // Show shelter locations
        console.log("Showing shelter locations")
      },
    },
    {
      id: "radio-check",
      title: "Radio Check",
      description: "Test emergency radio",
      icon: Radio,
      color: "bg-gray-500 hover:bg-gray-600",
      urgency: "important",
      action: () => {
        // Simulate radio check
        console.log("Performing radio check")
      },
    },
  ]

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return <Badge className="bg-red-100 text-red-800 text-xs">IMMEDIATE</Badge>
      case "urgent":
        return <Badge className="bg-orange-100 text-orange-800 text-xs">URGENT</Badge>
      case "important":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">IMPORTANT</Badge>
      default:
        return null
    }
  }

  const immediateActions = quickActions.filter((a) => a.urgency === "immediate")
  const urgentActions = quickActions.filter((a) => a.urgency === "urgent")
  const importantActions = quickActions.filter((a) => a.urgency === "important")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quick Emergency Actions</h2>
        <p className="text-slate-600">Instant access to emergency services and community help</p>
      </div>

      {/* Immediate Actions - Large Buttons */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-slate-800">Immediate Emergency</h3>
          <Badge className="bg-red-100 text-red-800 animate-pulse">CRITICAL</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {immediateActions.map((action) => (
            <Button
              key={action.id}
              onClick={() => executeAction(action.id, action.action)}
              disabled={isProcessing}
              className={`${action.color} text-white h-20 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all relative`}
            >
              <div className="flex items-center gap-3">
                <action.icon className="h-6 w-6" />
                <div className="text-left">
                  <div>{action.title}</div>
                  <div className="text-sm font-normal opacity-90">{action.description}</div>
                </div>
              </div>

              {lastAction === action.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Urgent Actions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-slate-800">Urgent Actions</h3>
          <Badge className="bg-orange-100 text-orange-800">HIGH PRIORITY</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {urgentActions.map((action) => (
            <Card
              key={action.id}
              className="cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
              onClick={() => executeAction(action.id, action.action)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${action.color.replace("hover:", "").replace("bg-", "bg-").replace("-500", "-100").replace("-600", "-100")}`}
                  >
                    <action.icon
                      className={`h-5 w-5 ${action.color.replace("bg-", "text-").replace("hover:bg-", "").replace("-500", "-600").replace("-600", "-700")}`}
                    />
                  </div>
                  {getUrgencyBadge(action.urgency)}
                </div>

                <h4 className="font-semibold text-slate-800 mb-1">{action.title}</h4>
                <p className="text-sm text-slate-600">{action.description}</p>

                {lastAction === action.id && (
                  <div className="mt-2 flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Action sent</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Actions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-slate-800">Important Actions</h3>
          <Badge className="bg-blue-100 text-blue-800">STANDARD</Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {importantActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              onClick={() => executeAction(action.id, action.action)}
              disabled={isProcessing}
              className="h-16 flex-col gap-1 border-slate-300 hover:bg-slate-50 bg-transparent relative"
            >
              <action.icon className="h-4 w-4 text-slate-600" />
              <span className="text-xs font-medium text-slate-700">{action.title}</span>

              {lastAction === action.id && (
                <div className="absolute top-1 right-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Emergency Contacts Quick Access */}
      <Card className="border-l-4 border-red-500">
        <CardContent className="p-4">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4 text-red-500" />
            Emergency Contacts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "tel:000")}
              className="justify-start border-red-200 hover:bg-red-50 bg-transparent"
            >
              <Phone className="h-4 w-4 mr-2 text-red-500" />
              <div className="text-left">
                <div className="font-medium">Emergency Services</div>
                <div className="text-xs text-slate-600">000</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "tel:132500")}
              className="justify-start border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              <Phone className="h-4 w-4 mr-2 text-blue-500" />
              <div className="text-left">
                <div className="font-medium">SES</div>
                <div className="text-xs text-slate-600">132 500</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "tel:1800679737")}
              className="justify-start border-orange-200 hover:bg-orange-50 bg-transparent"
            >
              <Phone className="h-4 w-4 mr-2 text-orange-500" />
              <div className="text-left">
                <div className="font-medium">NSW RFS</div>
                <div className="text-xs text-slate-600">1800 679 737</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Message */}
      {isProcessing && (
        <Card className="border-l-4 border-teal-500 bg-teal-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Send className="h-5 w-5 text-teal-600 animate-pulse" />
              <div>
                <h3 className="font-semibold text-teal-800">Processing Action</h3>
                <p className="text-sm text-teal-700">Your emergency action is being processed...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
