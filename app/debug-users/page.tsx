"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, RefreshCw, Mail, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

interface DebugUser {
  id: string
  firstName: string
  lastName?: string
  email: string
  phone?: string
  location?: string
  propertyType?: string
  primaryInterest?: string
  state?: string
  createdAt: string
  lastLogin?: string
}

export default function DebugUsersPage() {
  const [users, setUsers] = useState<DebugUser[]>([])
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/debug/users")
      const data = await response.json()

      if (data.success) {
        setUsers(data.users)
        setUserCount(data.userCount)
      } else {
        setError(data.message || "Failed to fetch users")
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-8 w-8 text-green-600" />
                Debug Users
              </h1>
              <p className="text-gray-600 mt-2">View all registered users in the system</p>
            </div>
            <Button onClick={fetchUsers} disabled={loading} className="flex items-center gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userCount}</div>
                <div className="text-sm text-green-700">Total Users</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">Memory</div>
                <div className="text-sm text-blue-700">Storage Type</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">Temporary</div>
                <div className="text-sm text-yellow-700">Resets on Restart</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-800">
                <strong>Error:</strong> {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users List */}
        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Loading users...</p>
              </div>
            </CardContent>
          </Card>
        ) : userCount === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Users Found</h3>
                <p className="text-gray-600 mb-4">No users are currently registered in the system. This could mean:</p>
                <ul className="text-left text-gray-600 space-y-1 max-w-md mx-auto mb-6">
                  <li>• No one has registered yet</li>
                  <li>• The server was restarted (memory storage)</li>
                  <li>• Registration process isn't working</li>
                </ul>
                <div className="space-x-4">
                  <Link href="/register">
                    <Button className="bg-green-600 hover:bg-green-700">Register New User</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline">Try Login</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Registered Users ({userCount})</h2>
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <span className="text-sm text-gray-500">#{user.id.slice(-8)}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user.email}</span>
                        </div>

                        {user.location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {user.location} {user.state && `(${user.state})`}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          Registered: {new Date(user.createdAt).toLocaleDateString()}
                        </div>

                        {user.lastLogin && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            Last Login: {new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      {(user.propertyType || user.primaryInterest) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {user.propertyType && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {user.propertyType}
                            </span>
                          )}
                          {user.primaryInterest && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {user.primaryInterest}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">🔧 Debugging Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-700 space-y-2">
              <p>
                <strong>If you see users above:</strong> They should be able to log in with their registered email and
                password.
              </p>
              <p>
                <strong>If no users show:</strong> Everyone needs to register first using the registration form.
              </p>
              <p>
                <strong>Memory Storage:</strong> Users are stored in memory and will be lost when the server restarts.
              </p>
              <p>
                <strong>Login Issues:</strong> Make sure to use the exact email address that was registered.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
