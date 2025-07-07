"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  AlertTriangle,
  MessageSquare,
  Shield,
  Settings,
  Database,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAlerts: 0,
    communityPosts: 0,
    emergencyPlans: 0,
  })

  useEffect(() => {
    checkAdminStatus()
    loadStats()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Check if user is admin (this would normally come from user metadata)
        const adminCheck = user.app_metadata?.is_admin === true
        setIsAdmin(adminCheck)
      }
    } catch (error) {
      console.error("Error checking admin status:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      // Load various statistics
      const [usersResult, alertsResult, postsResult, plansResult] = await Promise.all([
        supabase.from("user_profiles").select("count"),
        supabase.from("emergency_alerts").select("count").eq("active", true),
        supabase.from("community_posts").select("count"),
        supabase.from("emergency_plans").select("count"),
      ])

      setStats({
        totalUsers: usersResult.count || 0,
        activeAlerts: alertsResult.count || 0,
        communityPosts: postsResult.count || 0,
        emergencyPlans: plansResult.count || 0,
      })
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  const createEmergencyAlert = async () => {
    try {
      const { error } = await supabase.from("emergency_alerts").insert({
        title: "Test Emergency Alert",
        message: "This is a test emergency alert created by admin.",
        alert_type: "general",
        severity: "medium",
        active: true,
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error creating alert:", error)
      } else {
        alert("Emergency alert created successfully!")
        loadStats()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Alert className="max-w-2xl mx-auto mt-8">
        <XCircle className="h-4 w-4" />
        <AlertDescription>You must be logged in to access the admin dashboard. Please log in first.</AlertDescription>
      </Alert>
    )
  }

  if (!isAdmin) {
    return (
      <Alert className="max-w-2xl mx-auto mt-8 border-red-200 bg-red-50">
        <XCircle className="h-4 w-4" />
        <AlertDescription className="text-red-700">
          Access denied. You do not have administrator privileges.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Livestock Emergency System Administration</p>
          <Badge className="mt-2 bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Admin Access Granted
          </Badge>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">Emergency alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.communityPosts}</div>
              <p className="text-xs text-muted-foreground">Total posts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency Plans</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.emergencyPlans}</div>
              <p className="text-xs text-muted-foreground">Created plans</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Management
              </CardTitle>
              <CardDescription>Create and manage emergency alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={createEmergencyAlert} className="w-full">
                Create Test Alert
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                View All Users
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Manage Permissions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Content Moderation
              </CardTitle>
              <CardDescription>Moderate community posts and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                Review Posts
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Moderation Queue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Health
              </CardTitle>
              <CardDescription>Monitor system performance and health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                Database Status
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                System Logs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Management
              </CardTitle>
              <CardDescription>Configure and test email services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                Email Settings
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Send Test Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                General Settings
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current User Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Current Admin Session</CardTitle>
            <CardDescription>Your current administrative session details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>User ID:</strong> {user.id}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Admin Status:</strong> <Badge className="bg-green-100 text-green-800">Active</Badge>
              </p>
              <p>
                <strong>Last Login:</strong> {new Date(user.last_sign_in_at).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
