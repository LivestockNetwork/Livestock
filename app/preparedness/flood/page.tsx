"use client"
import FloodWizard from "@/components/flood-wizard"
import EmergencyTicker from "@/components/emergency-ticker"

export default function FloodPreparednessPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f0f9ff 100%)" }}
    >
      <EmergencyTicker />

      <div className="py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Flood Preparedness Wizard</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get a personalized flood plan for your property, livestock, and family.
            <br />
            <strong>Because floods can happen anywhere, anytime.</strong>
          </p>
        </div>

        <FloodWizard />
      </div>
    </div>
  )
}
