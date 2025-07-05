"use client"
import { useState } from "react"
import { X, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EmergencyTicker() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const emergencies = [
    {
      location: "Texas, USA",
      event: "Flooding",
      duration: "72hrs isolated",
      impact: "1000+ livestock at risk",
      status: "ONGOING",
    },
    {
      location: "Queensland, AUS",
      event: "Bushfires",
      duration: "3 communities evacuated",
      impact: "Rural families displaced",
      status: "ACTIVE",
    },
    {
      location: "UK Countryside",
      event: "Storm damage",
      duration: "48hrs no power",
      impact: "Livestock stranded",
      status: "CRITICAL",
    },
    {
      location: "New Zealand",
      event: "Cyclone aftermath",
      duration: "5 days cut off",
      impact: "No communication",
      status: "EMERGENCY",
    },
    {
      location: "Rural Canada",
      event: "Wildfire threat",
      duration: "Evacuation orders",
      impact: "Farms abandoned",
      status: "URGENT",
    },
  ]

  const tickerText = emergencies
    .map((e) => `🚨 ${e.status}: ${e.location} ${e.event} - ${e.duration} • ${e.impact}`)
    .join(" • ")

  return (
    <>
      {/* Emergency Ticker Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
        style={{ height: "40px" }}
      >
        <div className="flex items-center h-full">
          {/* LIVE Indicator */}
          <div className="flex items-center gap-2 px-4 bg-red-700 h-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs font-bold">LIVE</span>
          </div>

          {/* Scrolling Text Container */}
          <div
            className="flex-1 overflow-hidden cursor-pointer"
            onClick={() => setIsExpanded(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`whitespace-nowrap text-sm font-semibold py-2 ${isPaused ? "" : "animate-scroll"}`}
              style={{
                animation: isPaused ? "none" : "scroll 60s linear infinite",
              }}
            >
              {tickerText} • {tickerText} • {tickerText}
            </div>
          </div>

          {/* Expand Button */}
          <button onClick={() => setIsExpanded(true)} className="px-3 h-full hover:bg-red-700 transition-colors">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Spacer to push content down */}
      <div style={{ height: "40px" }}></div>

      {/* Expanded Emergency Details Modal */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl border-0 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div
              className="p-6 text-white relative"
              style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold">LIVE: Rural Emergencies Worldwide</h2>
              </div>

              <p className="text-lg mb-6 opacity-90">
                Right now, rural communities around the world are facing disasters.
                <strong> When disaster strikes YOUR community, will you be connected?</strong>
              </p>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencies.map((emergency, index) => (
                  <Card key={index} className="border-l-4 border-red-500 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-800">{emergency.location}</h3>
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                          {emergency.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-slate-600">
                        <div>
                          <strong>Event:</strong> {emergency.event}
                        </div>
                        <div>
                          <strong>Duration:</strong> {emergency.duration}
                        </div>
                        <div>
                          <strong>Impact:</strong> {emergency.impact}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  💔 "We had no way to know who needed help or who could help."
                </h3>
                <p className="text-slate-700 mb-4">- Texas rancher, January 2025. Don't let this be your story.</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-white font-bold"
                    style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                    onClick={() => {
                      setIsExpanded(false)
                      window.location.href = "/onboarding"
                    }}
                  >
                    Join Your Community Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsExpanded(false)}
                    className="border-slate-300 text-slate-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
    </>
  )
}
