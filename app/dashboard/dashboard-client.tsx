"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
import { Users, Shield, MapPin, MessageSquare, Settings, LogOut, Plus, FileText, Bell, Activity } from "lucide-react"
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
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      setIsSigningOut(false)
    }
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
          <div className="flex justify-between items-center py-4">
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

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-teal-100 text-teal-700">
                    {getInitials(profile?.full_name || user.email?.charAt(0).toUpperCase() || "U")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">{profile?.full_name || user.email}</span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={isSigningOut}>
                <LogOut className="h-4 w-4" />
                {isSigningOut ? "Signing out..." : "Sign out"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.full_name || user.email}</h1>
          <p className="text-gray-600 mt-2">
            Manage your livestock emergency preparedness and connect with your community.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="emergency-plans">Emergency Plans</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <p className="text-sm font-medium text-gray-600">Location</p>
                      <p className="text-lg font-semibold text-gray-900">{profile?.location || "Not set"}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Recent Emergency Plans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {emergencyPlans.length > 0 ? (
                    <div className="space-y-3">
                      {emergencyPlans.slice(0, 3).map((plan) => (
                        <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{plan.plan_type}</p>
                            <p className="text-sm text-gray-600">
                              Created {new Date(plan.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline">{plan.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No emergency plans yet</p>
                      <Button asChild>
                        <Link href="/preparedness/bushfire">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Plan
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Community Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {communityPosts.length > 0 ? (
                    <div className="space-y-3">
                      {communityPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-teal-100 text-teal-700">
                                {getInitials(post.user_profiles?.full_name || "U")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {post.user_profiles?.full_name || "Community Member"}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(post.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No community activity yet</p>
                      <Button asChild variant="outline">
                        <Link href="/community">Visit Community</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emergency-plans">
            <Card>
              <CardHeader>
                <CardTitle>Your Emergency Plans</CardTitle>
              </CardHeader>
              <CardContent>
                {emergencyPlans.length > 0 ? (
                  <div className="space-y-4">
                    {emergencyPlans.map((plan) => (
                      <div key={plan.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{plan.plan_type}</h3>
                            <p className="text-sm text-gray-600">
                              Created: {new Date(plan.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline">{plan.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Emergency Plans</h3>
                    <p className="text-gray-600 mb-6">Create your first emergency plan to get started.</p>
                    <div className="flex gap-4 justify-center">
                      <Button asChild>
                        <Link href="/preparedness/bushfire">Bushfire Plan</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/preparedness/flood">Flood Plan</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect with Your Community</h3>
                  <p className="text-gray-600 mb-6">
                    Share experiences, ask questions, and support fellow livestock owners.
                  </p>
                  <Button asChild>
                    <Link href="/community">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Visit Community
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-xl">
                        {getInitials(profile?.full_name || user.email?.charAt(0).toUpperCase() || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{profile?.full_name || "Name not set"}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <p className="text-gray-900">{profile?.location || "Not set"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <p className="text-gray-900">{profile?.property_type || "Not set"}</p>
                    </div>
                  </div>

                  <Button asChild>
                    <Link href="/profile">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
