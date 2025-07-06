"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2, Wifi, WifiOff } from "lucide-react"
import { useState, useEffect } from "react"

// Post Loading Skeleton
export function PostLoadingSkeleton() {
  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[75%]" />
          <Skeleton className="h-48 w-full rounded-md" />
          <div className="flex space-x-4 pt-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-18" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Member Directory Loading
export function MemberLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-3 w-[120px]" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[80%]" />
          </div>
        </Card>
      ))}
    </div>
  )
}

// Emergency Alert Loading
export function EmergencyLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-6 w-6 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <div className="flex space-x-2 mt-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Spinner with Connection Status
export function LoadingSpinner({ message = "Loading...", showConnection = false }) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {showConnection && (
          <div className="absolute -top-1 -right-1">
            {isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
      {!isOnline && <p className="text-xs text-red-500">Connection lost - retrying...</p>}
    </div>
  )
}

// Progressive Loading Component
export function ProgressiveLoader({
  steps = ["Connecting...", "Loading data...", "Almost ready..."],
  currentStep = 0,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="w-64 space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div
              className={`h-3 w-3 rounded-full ${
                index < currentStep
                  ? "bg-green-500"
                  : index === currentStep
                    ? "bg-primary animate-pulse"
                    : "bg-gray-300"
              }`}
            />
            <span className={`text-sm ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="w-64 bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
