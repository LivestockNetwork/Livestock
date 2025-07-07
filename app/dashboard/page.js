"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import ProtectedRoute from "../../components/ProtectedRoute"
import { useAuth } from "../../components/AuthContext"

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState(null)
  const [emergencyPlans, setEmergencyPlans] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)

      if (profileError) throw profileError
      setProfile(profileData?.[0] || null)

      // Fetch emergency plans
      const { data: plansData, error: plansError } = await supabase
        .from("emergency_plans")
        .select("*")
        .eq("user_id", user.id)

      if (plansError) throw plansError
      setEmergencyPlans(plansData || [])

      // Fetch active alerts
      const { data: alertsData, error: alertsError } = await supabase
        .from("emergency_alerts")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })

      if (alertsError) throw alertsError
      setAlerts(alertsData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              {profile ? (
                <div>
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

                  <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit Profile
                  </button>
                </div>
              ) : (
                <p>No profile information found.</p>
              )}
            </div>

            {/* Emergency Plans */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Emergency Plans</h2>
              {emergencyPlans.length > 0 ? (
                <ul className="space-y-2">
                  {emergencyPlans.map((plan) => (
                    <li key={plan.id} className="border-b pb-2">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium capitalize">{plan.plan_type} Plan</p>
                          <p className="text-sm text-gray-500">{plan.is_complete ? "Complete" : "Incomplete"}</p>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700">View</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <p className="mb-4">You haven't created any emergency plans yet.</p>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Create New Plan
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Alerts */}
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Active Emergency Alerts</h2>
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`border-l-4 p-4 ${
                        alert.severity === "extreme"
                          ? "border-red-500 bg-red-50"
                          : alert.severity === "high"
                            ? "border-orange-500 bg-orange-50"
                            : alert.severity === "medium"
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-blue-500 bg-blue-50"
                      }`}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-bold">{alert.title}</h3>
                        <span
                          className={`capitalize px-2 py-1 text-xs rounded-full ${
                            alert.severity === "extreme"
                              ? "bg-red-500 text-white"
                              : alert.severity === "high"
                                ? "bg-orange-500 text-white"
                                : alert.severity === "medium"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-blue-500 text-white"
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="mt-2">{alert.message}</p>
                      {alert.affected_areas && alert.affected_areas.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Affected areas:</p>
                          <p className="text-sm">{alert.affected_areas.join(", ")}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No active emergency alerts at this time.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
