"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Flame, CloudRain, Wind } from "lucide-react"

const emergencyAlerts = [
  {
    id: 1,
    type: "bushfire",
    icon: Flame,
    message:
      "BUSHFIRE WATCH: Extreme fire danger forecast for Central West NSW - Prepare your property and livestock evacuation plans",
    severity: "high",
    location: "Central West NSW",
  },
  {
    id: 2,
    type: "flood",
    icon: CloudRain,
    message: "FLOOD WARNING: Minor flooding expected along Murray River - Move livestock to higher ground",
    severity: "medium",
    location: "Murray River",
  },
  {
    id: 3,
    type: "storm",
    icon: Wind,
    message: "SEVERE WEATHER: Damaging winds and large hail possible - Secure loose items and shelter animals",
    severity: "medium",
    location: "Hunter Valley",
  },
  {
    id: 4,
    type: "general",
    icon: AlertTriangle,
    message: "DROUGHT UPDATE: Water restrictions in effect - Check bore water levels and stock water supplies",
    severity: "low",
    location: "Western NSW",
  },
]

export default function EmergencyTicker() {
  const [currentAlert, setCurrentAlert] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % emergencyAlerts.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const alert = emergencyAlerts[currentAlert]
  const Icon = alert.icon

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-600"
      case "medium":
        return "bg-orange-500"
      case "low":
        return "bg-yellow-500"
      default:
        return "bg-blue-600"
    }
  }

  return (
    <div className={`${getSeverityColor(alert.severity)} text-white py-2 overflow-hidden relative`}>
      <div className="ticker-container">
        <div className="ticker-content flex items-center space-x-4 animate-scroll">
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="font-semibold">EMERGENCY ALERT</span>
            <span className="text-sm opacity-90">|</span>
            <span className="text-sm">{alert.location}</span>
            <span className="text-sm opacity-90">|</span>
            <span>{alert.message}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-container {
          width: 100%;
          white-space: nowrap;
        }
        
        .ticker-content {
          display: inline-block;
          animation: scroll-left 30s linear infinite;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll-left 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
