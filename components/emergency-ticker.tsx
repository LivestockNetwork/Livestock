"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Flame, CloudRain, Wind, Zap } from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "fire" | "flood" | "storm" | "power" | "general"
  message: string
  location: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
}

const mockAlerts: EmergencyAlert[] = [
  {
    id: "1",
    type: "fire",
    message: "Total Fire Ban declared for Hunter Valley region",
    location: "Hunter Valley, NSW",
    severity: "high",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "2",
    type: "flood",
    message: "Minor flooding expected along Manning River",
    location: "Manning Valley, NSW",
    severity: "medium",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  },
  {
    id: "3",
    type: "storm",
    message: "Severe thunderstorm warning issued for Central Coast",
    location: "Central Coast, NSW",
    severity: "high",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "4",
    type: "power",
    message: "Planned power outage scheduled for maintenance work",
    location: "Taree, NSW",
    severity: "low",
    timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
  },
]

const getAlertIcon = (type: EmergencyAlert["type"]) => {
  switch (type) {
    case "fire":
      return <Flame className="h-4 w-4" />
    case "flood":
      return <CloudRain className="h-4 w-4" />
    case "storm":
      return <Wind className="h-4 w-4" />
    case "power":
      return <Zap className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getSeverityColor = (severity: EmergencyAlert["severity"]) => {
  switch (severity) {
    case "critical":
      return "text-red-600 bg-red-100"
    case "high":
      return "text-orange-600 bg-orange-100"
    case "medium":
      return "text-yellow-600 bg-yellow-100"
    case "low":
      return "text-blue-600 bg-blue-100"
    default:
      return "text-gray-600 bg-gray-100"
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

export default function EmergencyTicker() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockAlerts)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly add new alerts occasionally
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const newAlert: EmergencyAlert = {
          id: Date.now().toString(),
          type: ["fire", "flood", "storm", "power", "general"][Math.floor(Math.random() * 5)] as any,
          message: "New emergency alert - check local conditions",
          location: "Your Area",
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
          timestamp: new Date(),
        }
        setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]) // Keep only 5 most recent
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (alerts.length === 0) {
    return null
  }

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden relative">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 flex items-center gap-2 bg-red-700">
          <AlertTriangle className="h-4 w-4 animate-pulse" />
          <span className="font-semibold text-sm">EMERGENCY ALERTS</span>
        </div>

        <div className="flex-1 relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div className={`flex items-center gap-8 ${isPaused ? "" : "animate-scroll"}`}>
            {alerts.concat(alerts).map((alert, index) => (
              <div key={`${alert.id}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}
                >
                  {getAlertIcon(alert.type)}
                  <span className="uppercase">{alert.severity}</span>
                </div>
                <span className="text-sm font-medium">{alert.message}</span>
                <span className="text-xs opacity-75">• {alert.location}</span>
                <span className="text-xs opacity-60">• {formatTimeAgo(alert.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  )
}
