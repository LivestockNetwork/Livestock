"use client"

import SimpleOnboardingForm from "@/components/simple-onboarding-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🧪 Test Registration</h1>
          <p className="text-gray-600">Test the complete user registration and email flow</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">📧 Expected Outcome</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-700 text-sm">
                  If successful, you should receive a beautiful welcome email at patrick@bulahdelahclydesdales.com
                  within 30-60 seconds with Australian rural branding and community information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <SimpleOnboardingForm />
      </div>
    </div>
  )
}
