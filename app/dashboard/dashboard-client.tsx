"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { User } from "@supabase/supabase-js"

interface DashboardClientProps {
  user: User
  profile: any
  emergencyPlans: any[]
  alerts: any[]
}

export default function DashboardClient({ user, profile, emergencyPlans, alerts }: DashboardClientProps) {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile?.first_name || user.email}</p>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {profile ? (
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {profile.email}
                </p>
                {profile.phone && (
                  <p>
                    <span className="font-medium">Phone:</span> {profile.phone}
                  </p>
                )}
                {profile.location && (
                  <p>
                    <span className="font-medium">Location:</span> {profile.location}
                  </p>
                )}
                {profile.state && (
                  <p>
                    <span className="font-medium">State:</span> {profile.state}
                  </p>
                )}
                {profile.postcode && (
                  <p>
                    <span className="font-medium">Postcode:</span> {profile.postcode}
                  </p>
                )}
                <Button className="mt-4 bg-transparent" variant="outline">
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div>
                <p className="mb-4">Complete your profile to get personalized emergency recommendations.</p>
                <Button>Complete Profile</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Plans Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Emergency Plans</CardTitle>
          </CardHeader>
          <CardContent>
            {emergencyPlans.length > 0 ? (
              <div className="space-y-3">
                {emergencyPlans.map((plan) => (
                  <div key={plan.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium capitalize">{plan.plan_type} Plan</p>
                      <Badge variant={plan.is_complete ? "default" : "secondary"}>
                        {plan.is_complete ? "Complete" : "Incomplete"}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="mb-4">You haven't created any emergency plans yet.</p>
                <Button>Create New Plan</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Alerts Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Active Emergency Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    className={
                      alert.severity === "extreme"
                        ? "border-red-500 bg-red-50"
                        : alert.severity === "high"
                          ? "border-orange-500 bg-orange-50"
                          : alert.severity === "medium"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-blue-500 bg-blue-50"
                    }
                  >
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{alert.title}</h3>
                          <p className="mt-1">{alert.message}</p>
                          {alert.affected_areas && alert.affected_areas.length > 0 && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Affected areas:</span> {alert.affected_areas.join(", ")}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant={
                            alert.severity === "extreme"
                              ? "destructive"
                              : alert.severity === "high"
                                ? "destructive"
                                : alert.severity === "medium"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            ) : (
              <p>No active emergency alerts at this time.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
