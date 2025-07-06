"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function OnboardingRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new simple registration page
    router.replace("/register")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to registration...</p>
      </div>
    </div>
  )
}
