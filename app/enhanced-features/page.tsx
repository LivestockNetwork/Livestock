"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { PostLoadingSkeleton, LoadingSpinner, ProgressiveLoader } from "@/components/loading-states"
import { MobileResponsiveLayout, ResponsiveGrid, MobileCard } from "@/components/mobile-responsive-layout"
import { PostModerationSystem } from "@/components/post-moderation"
import { EnhancedChat } from "@/components/enhanced-chat"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Smartphone, Shield, MessageSquare, Loader2, CheckCircle, Zap, Users, Settings } from "lucide-react"

export default function EnhancedFeaturesPage() {
  return (
    <MobileResponsiveLayout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Enhanced Features</h1>
            <p className="text-muted-foreground">Advanced functionality for better user experience</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Feature Overview */}
        <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }}>
          <MobileCard>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Moon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">Dark Mode Support</h3>
                <p className="text-sm text-muted-foreground">System-wide theme switching</p>
              </div>
            </div>
          </MobileCard>

          <MobileCard>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Loader2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Advanced Loading</h3>
                <p className="text-sm text-muted-foreground">Smart loading states & skeletons</p>
              </div>
            </div>
          </MobileCard>

          <MobileCard>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Smartphone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">Mobile Responsive</h3>
                <p className="text-sm text-muted-foreground">Optimized for all devices</p>
              </div>
            </div>
          </MobileCard>

          <MobileCard>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold">Content Moderation</h3>
                <p className="text-sm text-muted-foreground">AI-powered content filtering</p>
              </div>
            </div>
          </MobileCard>

          <MobileCard>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold">Enhanced Chat</h3>
                <p className="text-sm text-muted-foreground">Real-time messaging with reactions</p>
              </div>
            </div>
          </MobileCard>

          <MobileCard>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold">Performance</h3>
                <p className="text-sm text-muted-foreground">Optimized for speed & reliability</p>
              </div>
            </div>
          </MobileCard>
        </ResponsiveGrid>

        {/* Feature Demos */}
        <Tabs defaultValue="dark-mode" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dark-mode">Dark Mode</TabsTrigger>
            <TabsTrigger value="loading">Loading States</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Layout</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="chat">Enhanced Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="dark-mode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5" />
                  <span>Dark Mode Support</span>
                  <Badge variant="secondary">New</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Complete dark mode implementation with system preference detection and manual toggle.
                </p>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <span className="text-sm">Try switching themes!</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• System preference detection</li>
                      <li>• Manual theme switching</li>
                      <li>• Persistent theme storage</li>
                      <li>• Smooth transitions</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Reduced eye strain</li>
                      <li>• Better battery life</li>
                      <li>• Professional appearance</li>
                      <li>• User preference respect</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loading" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Loader2 className="h-5 w-5" />
                  <span>Advanced Loading States</span>
                  <Badge variant="secondary">Enhanced</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Sophisticated loading indicators and skeleton screens for better user experience.
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold">Post Loading Skeleton</h4>
                  <PostLoadingSkeleton />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Progressive Loading</h4>
                  <ProgressiveLoader
                    steps={["Connecting to server...", "Loading user data...", "Preparing interface..."]}
                    currentStep={1}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Loading Spinner with Connection Status</h4>
                  <LoadingSpinner message="Syncing emergency data..." showConnection={true} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Loading Types:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Skeleton screens</li>
                      <li>• Progressive indicators</li>
                      <li>• Connection status</li>
                      <li>• Contextual messages</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">User Benefits:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Perceived performance</li>
                      <li>• Clear expectations</li>
                      <li>• Reduced anxiety</li>
                      <li>• Better engagement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Mobile Responsive Layout</span>
                  <Badge variant="secondary">Optimized</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Fully responsive design with mobile-first approach and adaptive navigation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MobileCard padding="sm">
                    <div className="text-center">
                      <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <h4 className="font-semibold">Mobile First</h4>
                      <p className="text-xs text-muted-foreground">Designed for touch interfaces</p>
                    </div>
                  </MobileCard>

                  <MobileCard padding="sm">
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <h4 className="font-semibold">Adaptive UI</h4>
                      <p className="text-xs text-muted-foreground">Adjusts to screen size</p>
                    </div>
                  </MobileCard>

                  <MobileCard padding="sm">
                    <div className="text-center">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <h4 className="font-semibold">Touch Optimized</h4>
                      <p className="text-xs text-muted-foreground">Finger-friendly controls</p>
                    </div>
                  </MobileCard>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Responsive Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <ul className="space-y-1">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Collapsible navigation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Touch-friendly buttons</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Adaptive grid layouts</span>
                      </li>
                    </ul>
                    <ul className="space-y-1">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Mobile-optimized forms</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Swipe gestures</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Responsive typography</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <PostModerationSystem />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Enhanced Real-Time Chat</span>
                  <Badge variant="secondary">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Advanced messaging system with real-time features, reactions, and emergency alerts.
                </p>
                <EnhancedChat />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Implementation Status */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Dark Mode Support</p>
                  <p className="text-sm text-muted-foreground">Complete with theme persistence</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Advanced Loading States</p>
                  <p className="text-sm text-muted-foreground">Skeleton screens & progress indicators</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Mobile Responsiveness</p>
                  <p className="text-sm text-muted-foreground">Adaptive layouts & touch optimization</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Content Moderation</p>
                  <p className="text-sm text-muted-foreground">AI-powered with manual review</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Enhanced Chat</p>
                  <p className="text-sm text-muted-foreground">Real-time with reactions & status</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Performance Optimized</p>
                  <p className="text-sm text-muted-foreground">Fast loading & smooth interactions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileResponsiveLayout>
  )
}
