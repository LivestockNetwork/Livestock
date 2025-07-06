"use client"

import { useState } from "react"

const emergencyAlerts = [
  "🚨 ONGOING: Texas, USA Flooding - 72hrs isolated • 1000+ livestock at risk",
  "🚨 ACTIVE: Queensland, AUS Bushfires - 3 communities evacuated • Rural families displaced",
  "🚨 CRITICAL: UK Countryside Storm damage - 48hrs no power • Livestock stranded",
  "🚨 WATCH: Victoria Drought conditions - Water restrictions in effect • Cattle relocation needed",
  "🚨 ALERT: New Zealand Earthquake - Rural roads blocked • Emergency supplies needed",
]

export default function EmergencyTicker() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className="bg-red-600 text-white relative overflow-hidden">
      <div className="flex items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-red-700 flex-shrink-0">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-sm">LIVE</span>
          </div>
        </div>

        <div
          className="flex-1 py-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {isExpanded ? (
            <div className="px-4 space-y-1">
              {emergencyAlerts.map((alert, index) => (
                <div key={index} className="text-sm">
                  {alert}
                </div>
              ))}
            </div>
          ) : (
            <div className="whitespace-nowrap">
              <div
                className={`inline-block text-sm ${isPaused ? "" : "animate-scroll"}`}
                style={{
                  animationDuration: "60s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "linear",
                }}
              >
                {emergencyAlerts.join(" • ")} • {emergencyAlerts.join(" • ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
