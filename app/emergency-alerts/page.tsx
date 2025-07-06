"use client"
import EmergencyAlertSystem from "@/components/emergency-alert-system"
import EmergencyTicker from "@/components/emergency-ticker"
import { Button } from "@/components/ui/button"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmergencyAlertsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <EmergencyTicker />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>

              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Rural Community Hub</h1>
                  <p className="text-sm text-slate-600">Emergency Alert System</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/community">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                  Community
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  size="sm"
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">{EmergencyAlertSystem()}</div>
    </div>
  )
}
