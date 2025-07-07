"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ArrowLeft, Settings } from "lucide-react"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      // Mock user check - replace with actual auth logic
      const mockUser = { email: "admin@example.com", id: "123" }
      setUser(mockUser)
      setIsAdmin(true)
    } catch (error) {
      console.error("Error checking admin access:", error)
      setError("Failed to verify admin access")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (error || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Shield className="h-6 w-6" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>{error || "You do not have admin privileges to access this page."}</AlertDescription>
              </Alert>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Current user:</strong> {user?.email || "Not logged in"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Admin status:</strong> {isAdmin ? "Yes" : "No"}
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => router.push("/dashboard")} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                {user && (
                  <Button onClick={handleSignOut} variant="outline">
                    Sign Out
                  </Button>
                )}
              </div>

              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  <strong>To become an admin:</strong>
                  <br />
                  1. Go to your Supabase dashboard
                  <br />
                  2. Run the admin setup SQL script with your user ID
                  <br />
                  3. Refresh this page
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Livestock Emergency Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button onClick={() => router.push("/dashboard")} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Manage emergency alerts and notifications</p>
              <Button className="w-full">Manage Alerts</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">View and manage user accounts</p>
              <Button className="w-full">Manage Users</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Moderate community posts and discussions</p>
              <Button className="w-full">Moderate Posts</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
