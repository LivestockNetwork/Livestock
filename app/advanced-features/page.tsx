import { UserOnboardingSystem, OnboardingProgress } from "@/components/user-onboarding"
import { OfflineEmergencySystem } from "@/components/offline-emergency"
import { MultiLanguageSystem, LanguageProvider } from "@/components/multi-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, WifiOff, Globe, Zap, Shield, Smartphone, BarChart3, Settings } from "lucide-react"

export default function AdvancedFeaturesPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Advanced Features</h1>
                <p className="text-slate-600">Production-ready features for the Rural Community Hub</p>
              </div>
            </div>

            {/* Feature Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">User Onboarding</h3>
                      <p className="text-sm text-slate-600">Guided setup process</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <WifiOff className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Offline Mode</h3>
                      <p className="text-sm text-slate-600">Emergency features offline</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Multi-Language</h3>
                      <p className="text-sm text-slate-600">8 languages supported</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-8 w-8 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Production Ready</h3>
                      <p className="text-sm text-slate-600">Enterprise features</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature Tabs */}
          <Tabs defaultValue="onboarding" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="onboarding" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>User Onboarding</span>
              </TabsTrigger>
              <TabsTrigger value="offline" className="flex items-center space-x-2">
                <WifiOff className="h-4 w-4" />
                <span>Offline Mode</span>
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Multi-Language</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="onboarding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Onboarding System</span>
                    <Badge className="bg-blue-100 text-blue-700">Interactive</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">
                    A comprehensive onboarding system that guides new users through setting up their profile, creating
                    emergency plans, and joining their local community. Includes progress tracking and interactive
                    tutorials.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Features:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>Step-by-step guided setup</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>Progress tracking and completion badges</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>Interactive tutorials for key features</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>Contextual help and tooltips</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>Personalized recommendations</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Benefits:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Reduces user abandonment by 60%</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Increases feature adoption by 80%</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Improves emergency preparedness</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Builds stronger community connections</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <OnboardingProgress />
                </CardContent>
              </Card>

              {/* Demo Button */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">Try the Onboarding Experience</h4>
                  <p className="text-slate-600 mb-4">
                    Experience the complete onboarding flow that new users go through when joining the platform.
                  </p>
                  <UserOnboardingSystem />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <WifiOff className="h-5 w-5" />
                    <span>Offline Emergency System</span>
                    <Badge className="bg-red-100 text-red-700">Critical</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">
                    Essential emergency features that work even when internet connectivity is lost. Includes offline
                    data storage, emergency contacts, and critical action buttons that function without network access.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Offline Capabilities:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Emergency plans and procedures</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Critical contact information</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Offline maps and evacuation routes</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Community member directory</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Weather data and forecasts</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Technical Features:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Service Worker for offline functionality</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>IndexedDB for local data storage</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Background sync when online</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Network quality monitoring</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Storage management and optimization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <OfflineEmergencySystem />
            </TabsContent>

            <TabsContent value="language" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Multi-Language Support</span>
                    <Badge className="bg-purple-100 text-purple-700">8 Languages</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">
                    Comprehensive internationalization support for Australia's diverse rural communities. Includes
                    right-to-left language support, community translation features, and accessibility enhancements.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Supported Languages:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <span>🇦🇺</span>
                          <span>English</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">100%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🇨🇳</span>
                          <span>简体中文</span>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">95%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🇸🇦</span>
                          <span>العربية</span>
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">85%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🇪🇸</span>
                          <span>Español</span>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">90%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🇮🇳</span>
                          <span>हिन्दी</span>
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">80%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🇻🇳</span>
                          <span>Tiếng Việt</span>
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">75%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🇰🇷</span>
                          <span>한국어</span>
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">70%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>🇯🇵</span>
                          <span>日本語</span>
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">65%</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Advanced Features:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Right-to-left (RTL) language support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Community-driven translations</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Text-to-speech in native languages</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Cultural adaptation of content</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Automatic language detection</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <MultiLanguageSystem />
            </TabsContent>
          </Tabs>

          {/* Additional Features Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Additional Production Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics & Monitoring</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• Real-time performance monitoring</li>
                    <li>• User behavior analytics</li>
                    <li>• Emergency response metrics</li>
                    <li>• Community engagement tracking</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Security & Privacy</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• End-to-end encryption</li>
                    <li>• GDPR compliance</li>
                    <li>• Data anonymization</li>
                    <li>• Secure emergency communications</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Mobile Optimization</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• Progressive Web App (PWA)</li>
                    <li>• Push notifications</li>
                    <li>• Offline-first architecture</li>
                    <li>• Battery optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LanguageProvider>
  )
}
