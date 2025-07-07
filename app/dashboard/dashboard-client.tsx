"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Shield,
  MessageSquare,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Plus,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

interface DashboardClientProps {
  user: User
  profile: any
  emergencyPlans: any[]
  communityPosts: any[]
}

export default function DashboardClient({ user, profile, emergencyPlans, communityPosts }: DashboardClientProps) {
  const { signOut } = useAuth()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut()
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>{getInitials(profile?.full_name || user.email?.charAt(0) || "U")}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{profile?.full_name || "User"}</p>
                  <p className="text-xs text-gray-500">{profile?.state || "Australia"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isSigningOut}>
                <LogOut className="h-4 w-4 mr-2" />
                {isSigningOut ? "Signing out..." : "Sign out"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.full_name || "User"}!</h1>
          <p className="text-gray-600 mt-2">
            Manage your emergency preparedness and connect with your rural community.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Emergency Plans</p>
                  <p className="text-2xl font-bold text-gray-900">{emergencyPlans.length}</p>
                </div>
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Community Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{communityPosts.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Network</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Plans */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Emergency Plans</CardTitle>
                    <CardDescription>Your emergency preparedness plans and protocols</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {emergencyPlans.length > 0 ? (
                  <div className="space-y-4">
                    {emergencyPlans.slice(0, 3).map((plan) => (
                      <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{plan.plan_name}</h4>
                          <p className="text-sm text-gray-600">{plan.emergency_type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={plan.status === "complete" ? "default" : "secondary"}>{plan.status}</Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No emergency plans yet</h3>
                    <p className="text-gray-600 mb-4">
                      Create your first emergency plan to get started with preparedness.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Emergency Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Community Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Community Activity</CardTitle>
                <CardDescription>Recent posts from your local community</CardDescription>
              </CardHeader>
              <CardContent>
                {communityPosts.length > 0 ? (
                  <div className="space-y-4">
                    {communityPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(post.user_profiles?.full_name || "U")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">
                                {post.user_profiles?.full_name || "Anonymous"}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {post.user_profiles?.state}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{post.content.substring(0, 100)}...</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No community posts</h3>
                    <p className="text-gray-600 mb-4">Be the first to share with your community.</p>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and features to help you get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Shield className="h-6 w-6" />
                  <span>Create Emergency Plan</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <MessageSquare className="h-6 w-6" />
                  <span>Join Community</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <MapPin className="h-6 w-6" />
                  <span>Find Local Resources</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
