"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, FileText, AlertTriangle, Plus, Edit } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import Link from "next/link"

interface DashboardClientProps {
  user: SupabaseUser
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-emerald-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, {profile?.first_name || user.email?.split("@")[0]}</span>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile</p>
                  <p className="text-2xl font-bold text-gray-900">{profile ? "Complete" : "Incomplete"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Emergency Plans</p>
                  <p className="text-2xl font-bold text-gray-900">{emergencyPlans.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Preparedness</p>
                  <p className="text-2xl font-bold text-gray-900">{emergencyPlans.length > 0 ? "Active" : "Pending"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">First Name</p>
                      <p className="text-base text-gray-900">{profile.first_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Name</p>
                      <p className="text-base text-gray-900">{profile.last_name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base text-gray-900">{user.email}</p>
                  </div>
                  {profile.phone && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-base text-gray-900">{profile.phone}</p>
                    </div>
                  )}
                  {profile.location && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-base text-gray-900">{profile.location}</p>
                    </div>
                  )}
                  {profile.state && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">State</p>
                        <p className="text-base text-gray-900">{profile.state}</p>
                      </div>
                      {profile.postcode && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Postcode</p>
                          <p className="text-base text-gray-900">{profile.postcode}</p>
                        </div>
                      )}
                    </div>
                  )}
                  <Button variant="outline" className="w-full bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Complete Your Profile</h3>
                  <p className="text-gray-500 mb-4">
                    Add your details to get personalized emergency recommendations and connect with your local
                    community.
                  </p>
                  <Link href="/profile-setup">
                    <Button>Complete Profile</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emergency Plans Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Emergency Plans
                </div>
                <Link href="/emergency-plans/create">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Plan
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emergencyPlans.length > 0 ? (
                <div className="space-y-4">
                  {emergencyPlans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium capitalize">{plan.plan_type} Emergency Plan</h4>
                        <p className="text-sm text-gray-500">
                          Created {new Date(plan.created_at).toLocaleDateString()}
                        </p>
                        <Badge variant={plan.is_complete ? "default" : "secondary"} className="mt-1">
                          {plan.is_complete ? "Complete" : "In Progress"}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Plan
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Emergency Plans</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first emergency plan to protect your livestock and property.
                  </p>
                  <Link href="/emergency-plans/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Plan
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Alerts Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Active Emergency Alerts
            </CardTitle>
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
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{alert.title}</h4>
                          <p className="mt-1">{alert.message}</p>
                          {alert.affected_areas && alert.affected_areas.length > 0 && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Affected areas:</span> {alert.affected_areas.join(", ")}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">{new Date(alert.created_at).toLocaleString()}</p>
                        </div>
                        <Badge
                          variant={
                            alert.severity === "extreme" || alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="ml-4"
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                <p className="text-gray-500">
                  There are currently no emergency alerts for your area. We'll notify you immediately if any emergencies
                  arise.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/community">
              <Button variant="outline" className="w-full h-16 flex flex-col bg-transparent">
                <Shield className="h-6 w-6 mb-1" />
                Community
              </Button>
            </Link>
            <Link href="/emergency-alerts">
              <Button variant="outline" className="w-full h-16 flex flex-col bg-transparent">
                <AlertTriangle className="h-6 w-6 mb-1" />
                View All Alerts
              </Button>
            </Link>
            <Link href="/weather">
              <Button variant="outline" className="w-full h-16 flex flex-col bg-transparent">
                <svg className="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
                  />
                </svg>
                Weather
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" className="w-full h-16 flex flex-col bg-transparent">
                <svg className="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
