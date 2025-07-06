"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function OnboardingRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new simple registration page
    router.replace("/register")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
        <p className="text-gray-600">Redirecting to registration...</p>
      </div>
    </div>
  )
}
