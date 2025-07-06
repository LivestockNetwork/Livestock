"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Flame, CloudRain, Wind, Zap } from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "fire" | "flood" | "storm" | "drought" | "general"
  severity: "low" | "medium" | "high" | "extreme"
  title: string
  location: string
  time: string
  description: string
}

const mockAlerts: EmergencyAlert[] = [
  {
    id: "1",
    type: "fire",
    severity: "high",
    title: "Bushfire Warning",
    location: "Blue Mountains, NSW",
    time: "2 hours ago",
    description: "Total fire ban in effect. Extreme fire danger conditions.",
  },
  {
    id: "2",
    type: "flood",
    severity: "medium",
    title: "Flood Watch",
    location: "Murray River, VIC",
    time: "4 hours ago",
    description: "Minor flooding expected in low-lying areas.",
  },
  {
    id: "3",
    type: "storm",
    severity: "high",
    title: "Severe Storm Warning",
    location: "Southeast QLD",
    time: "1 hour ago",
    description: "Damaging winds and large hail possible.",
  },
  {
    id: "4",
    type: "drought",
    severity: "medium",
    title: "Drought Conditions",
    location: "Central NSW",
    time: "6 hours ago",
    description: "Water restrictions in place. Livestock support available.",
  },
]

const getAlertIcon = (type: string) => {
  switch (type) {
    case "fire":
      return <Flame className="h-4 w-4" />
    case "flood":
      return <CloudRain className="h-4 w-4" />
    case "storm":
      return <Wind className="h-4 w-4" />
    case "drought":
      return <Zap className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "extreme":
      return "bg-red-600 text-white"
    case "high":
      return "bg-orange-500 text-white"
    case "medium":
      return "bg-yellow-500 text-black"
    case "low":
      return "bg-blue-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export default function EmergencyTicker() {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % mockAlerts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible || mockAlerts.length === 0) {
    return null
  }

  const currentAlert = mockAlerts[currentAlertIndex]

  return (
    <div className="bg-red-600 text-white py-2 px-4 relative overflow-hidden">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-shrink-0">
            {getAlertIcon(currentAlert.type)}
            <span className="font-semibold text-sm">EMERGENCY ALERT</span>
          </div>

          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(currentAlert.severity)}`}>
              {currentAlert.severity.toUpperCase()}
            </span>
            <div className="truncate">
              <span className="font-medium">{currentAlert.title}</span>
              <span className="mx-2">•</span>
              <span>{currentAlert.location}</span>
              <span className="mx-2">•</span>
              <span className="text-red-200">{currentAlert.time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
          <div className="flex space-x-1">
            {mockAlerts.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentAlertIndex ? "bg-white" : "bg-red-300"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-red-200 hover:text-white ml-2"
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-20 animate-pulse" />
    </div>
  )
}
