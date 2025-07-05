"use client"
import BushfireWizard from "@/components/bushfire-wizard"
import EmergencyTicker from "@/components/emergency-ticker"

export default function BushfirePreparednessPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #fef2f2 50%, #fef7ed 100%)" }}
    >
      <EmergencyTicker />

      <div className="py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Bushfire Preparedness Wizard</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get a personalized bushfire plan for your property, livestock, and family.
            <br />
            <strong>Because every rural property is different.</strong>
          </p>
        </div>

        <BushfireWizard />
      </div>
    </div>
  )
}
