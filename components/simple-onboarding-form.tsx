"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registerUser } from "@/app/actions/user-onboarding-simple"

export default function SimpleOnboardingForm() {
  const [state, formAction, isPending] = useFormState(registerUser, null)
  const [propertyType, setPropertyType] = useState("")
  const [primaryInterest, setPrimaryInterest] = useState("")

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🇦🇺 Join Rural Community Hub Australia</CardTitle>
            <p className="text-center text-gray-600">Connect with rural communities across the continent</p>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input name="firstName" required placeholder="Your first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input name="lastName" placeholder="Your last name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input name="email" type="email" required placeholder="your.email@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input name="location" placeholder="e.g., Tamworth, NSW" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cattle">Cattle Station</SelectItem>
                    <SelectItem value="sheep">Sheep Farm</SelectItem>
                    <SelectItem value="mixed">Mixed Farming</SelectItem>
                    <SelectItem value="cropping">Cropping</SelectItem>
                    <SelectItem value="dairy">Dairy Farm</SelectItem>
                    <SelectItem value="hobby">Hobby Farm</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="propertyType" value={propertyType} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Primary Interest</label>
                <Select value={primaryInterest} onValueChange={setPrimaryInterest}>
                  <SelectTrigger>
                    <SelectValue placeholder="What interests you most?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency Preparedness</SelectItem>
                    <SelectItem value="community">Community Events</SelectItem>
                    <SelectItem value="knowledge">Knowledge Sharing</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="resources">Resource Sharing</SelectItem>
                    <SelectItem value="support">Mutual Support</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="primaryInterest" value={primaryInterest} />
              </div>

              <Button type="submit" disabled={isPending} className="w-full bg-green-600 hover:bg-green-700">
                {isPending ? "🔄 Registering..." : "🚀 Join Community"}
              </Button>

              {state && (
                <div
                  className={`p-4 rounded-lg ${
                    state.success
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <p className="font-medium">{state.success ? "✅ Success!" : "❌ Error"}</p>
                  <p>{state.message}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
