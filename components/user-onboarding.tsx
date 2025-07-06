"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  X,
  Users,
  AlertTriangle,
  MapPin,
  MessageCircle,
  Shield,
  Smartphone,
  Bell,
  Settings,
  BookOpen,
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  content: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  completed: boolean
  required: boolean
}

interface TutorialStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  content: React.ReactNode
}

export function UserOnboardingSystem() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [userProgress, setUserProgress] = useState({
    profileComplete: false,
    emergencyPlanCreated: false,
    communityJoined: false,
    notificationsEnabled: false,
    firstPostMade: false,
  })

  const onboardingSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Rural Community Hub",
      description: "Let's get you set up to connect with your local rural community",
      icon: Users,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="h-10 w-10 text-teal-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Welcome to Rural Community Hub!</h3>
            <p className="text-slate-600 mb-4">
              You're joining 8,630+ rural families across Australia who are building stronger, more resilient
              communities.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mb-1" />
                <p className="font-medium">Emergency Preparedness</p>
                <p className="text-slate-600">Get help when disasters strike</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mb-1" />
                <p className="font-medium">Community Support</p>
                <p className="text-slate-600">Connect with local farmers</p>
              </div>
            </div>
          </div>
        </div>
      ),
      completed: false,
      required: true,
    },
    {
      id: "profile",
      title: "Complete Your Profile",
      description: "Tell us about your property and livestock so we can connect you with the right people",
      icon: Settings,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Complete Your Profile</h3>
          <p className="text-slate-600">
            Help your community understand how to help you in emergencies and what resources you can offer.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <MapPin className="h-5 w-5 text-slate-600" />
              <div>
                <p className="font-medium">Property Location</p>
                <p className="text-sm text-slate-600">Help neighbors find you</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <Users className="h-5 w-5 text-slate-600" />
              <div>
                <p className="font-medium">Livestock & Equipment</p>
                <p className="text-sm text-slate-600">What you have and what you need</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
              <Shield className="h-5 w-5 text-slate-600" />
              <div>
                <p className="font-medium">Emergency Contacts</p>
                <p className="text-sm text-slate-600">Who to contact in emergencies</p>
              </div>
            </div>
          </div>
        </div>
      ),
      action: {
        label: "Complete Profile",
        onClick: () => {
          setUserProgress((prev) => ({ ...prev, profileComplete: true }))
          setCurrentStep(currentStep + 1)
        },
      },
      completed: userProgress.profileComplete,
      required: true,
    },
    {
      id: "emergency-plan",
      title: "Create Your Emergency Plan",
      description: "Build a personalized emergency plan for your property and livestock",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Create Your Emergency Plan</h3>
          <p className="text-slate-600">
            Having a plan before disaster strikes can save lives - both human and animal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <h4 className="font-semibold">Bushfire Plan</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Evacuation routes, livestock safety, and property protection
              </p>
              <Badge className="bg-red-100 text-red-700">Most Popular</Badge>
            </div>
            <div className="p-4 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-semibold">Flood Plan</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3">Safe zones, evacuation timing, and community coordination</p>
              <Badge className="bg-blue-100 text-blue-700">Essential</Badge>
            </div>
          </div>
        </div>
      ),
      action: {
        label: "Create Emergency Plan",
        onClick: () => {
          setUserProgress((prev) => ({ ...prev, emergencyPlanCreated: true }))
          setCurrentStep(currentStep + 1)
        },
      },
      completed: userProgress.emergencyPlanCreated,
      required: true,
    },
    {
      id: "notifications",
      title: "Enable Emergency Notifications",
      description: "Get instant alerts for emergencies and community updates",
      icon: Bell,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Enable Emergency Notifications</h3>
          <p className="text-slate-600">
            Stay informed about emergencies, weather alerts, and community requests for help.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h4 className="font-semibold text-amber-800">Critical for Safety</h4>
            </div>
            <p className="text-sm text-amber-700">
              Emergency notifications can be the difference between safety and disaster. We recommend enabling all
              notification types.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-slate-600">Instant alerts on your device</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Recommended</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-slate-600">Text messages for critical alerts</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-700">Critical</Badge>
            </div>
          </div>
        </div>
      ),
      action: {
        label: "Enable Notifications",
        onClick: () => {
          setUserProgress((prev) => ({ ...prev, notificationsEnabled: true }))
          setCurrentStep(currentStep + 1)
        },
      },
      completed: userProgress.notificationsEnabled,
      required: true,
    },
    {
      id: "community",
      title: "Join Your Local Community",
      description: "Connect with farmers and rural families in your area",
      icon: Users,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Join Your Local Community</h3>
          <p className="text-slate-600">
            Connect with other rural families in your area. Share resources, ask for help, and build relationships
            before you need them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="font-semibold mb-1">Manning Valley</h4>
              <p className="text-sm text-slate-600">127 members</p>
              <Badge className="bg-green-100 text-green-700 mt-2">Your Area</Badge>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">Emergency Response</h4>
              <p className="text-sm text-slate-600">89 members</p>
              <Badge className="bg-red-100 text-red-700 mt-2">Critical</Badge>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-1">Equipment Sharing</h4>
              <p className="text-sm text-slate-600">156 members</p>
              <Badge className="bg-blue-100 text-blue-700 mt-2">Popular</Badge>
            </div>
          </div>
        </div>
      ),
      action: {
        label: "Join Communities",
        onClick: () => {
          setUserProgress((prev) => ({ ...prev, communityJoined: true }))
          setCurrentStep(currentStep + 1)
        },
      },
      completed: userProgress.communityJoined,
      required: false,
    },
    {
      id: "complete",
      title: "You're All Set!",
      description: "Welcome to the Rural Community Hub family",
      icon: CheckCircle,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Welcome to the Community!</h3>
            <p className="text-slate-600 mb-4">
              You're now connected with your local rural community. Here's what you can do next:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <MessageCircle className="h-5 w-5 text-blue-600 mb-1" />
                <p className="font-medium">Make Your First Post</p>
                <p className="text-slate-600">Introduce yourself to the community</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600 mb-1" />
                <p className="font-medium">Take the Tutorial</p>
                <p className="text-slate-600">Learn all the features</p>
              </div>
            </div>
          </div>
        </div>
      ),
      action: {
        label: "Start Tutorial",
        onClick: () => {
          setShowOnboarding(false)
          setShowTutorial(true)
        },
      },
      completed: false,
      required: false,
    },
  ]

  const tutorialSteps: TutorialStep[] = [
    {
      id: "navigation",
      title: "Navigation Menu",
      description: "Access all features from the main navigation",
      target: "nav-menu",
      position: "bottom",
      content: (
        <div>
          <p className="mb-2">Use the navigation menu to access:</p>
          <ul className="text-sm space-y-1">
            <li>• Community feed and discussions</li>
            <li>• Emergency alerts and planning</li>
            <li>• Resource marketplace</li>
            <li>• Weather and climate data</li>
          </ul>
        </div>
      ),
    },
    {
      id: "emergency-button",
      title: "Emergency Alert",
      description: "Quick access to emergency features",
      target: "emergency-btn",
      position: "left",
      content: (
        <div>
          <p className="mb-2">In an emergency, use this button to:</p>
          <ul className="text-sm space-y-1">
            <li>• Send emergency alerts to neighbors</li>
            <li>• Request immediate help</li>
            <li>• Access your emergency plan</li>
            <li>• Call emergency services</li>
          </ul>
        </div>
      ),
    },
    {
      id: "community-feed",
      title: "Community Feed",
      description: "Stay connected with your local community",
      target: "community-feed",
      position: "top",
      content: (
        <div>
          <p className="mb-2">The community feed shows:</p>
          <ul className="text-sm space-y-1">
            <li>• Local posts and updates</li>
            <li>• Help requests from neighbors</li>
            <li>• Equipment sharing opportunities</li>
            <li>• Weather and emergency alerts</li>
          </ul>
        </div>
      ),
    },
  ]

  const completedSteps = onboardingSteps.filter((step) => step.completed).length
  const totalSteps = onboardingSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    setShowOnboarding(false)
  }

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1)
    } else {
      setShowTutorial(false)
    }
  }

  const skipTutorial = () => {
    setShowTutorial(false)
  }

  if (showTutorial) {
    const currentTutorialStep = tutorialSteps[tutorialStep]
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{currentTutorialStep.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={skipTutorial}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-slate-600">{currentTutorialStep.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentTutorialStep.content}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">
                  {tutorialStep + 1} of {tutorialSteps.length}
                </span>
                <Progress value={((tutorialStep + 1) / tutorialSteps.length) * 100} className="w-20" />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={skipTutorial}>
                  Skip Tutorial
                </Button>
                <Button onClick={nextTutorialStep}>
                  {tutorialStep === tutorialSteps.length - 1 ? "Finish" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!showOnboarding) {
    return null
  }

  const currentOnboardingStep = onboardingSteps[currentStep]

  return (
    <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Getting Started</DialogTitle>
            <Button variant="ghost" size="sm" onClick={skipOnboarding}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Progress value={progressPercentage} className="flex-1" />
            <span className="text-sm text-slate-600">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-2">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep
                      ? "bg-teal-500 text-white"
                      : step.completed
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div className={`w-8 h-0.5 ${step.completed ? "bg-green-500" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">{currentOnboardingStep.content}</div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={skipOnboarding}>
                Skip Setup
              </Button>
              {currentStep > 0 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              {currentOnboardingStep.action ? (
                <Button onClick={currentOnboardingStep.action.onClick} className="bg-teal-500 hover:bg-teal-600">
                  {currentOnboardingStep.action.label}
                </Button>
              ) : (
                <Button onClick={nextStep} className="bg-teal-500 hover:bg-teal-600">
                  {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Continue"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function OnboardingProgress() {
  const [userProgress, setUserProgress] = useState({
    profileComplete: false,
    emergencyPlanCreated: false,
    communityJoined: false,
    notificationsEnabled: false,
    firstPostMade: false,
  })

  const tasks = [
    {
      id: "profile",
      title: "Complete your profile",
      description: "Add your property details and contact information",
      completed: userProgress.profileComplete,
      required: true,
    },
    {
      id: "emergency",
      title: "Create emergency plan",
      description: "Build a personalized emergency plan for your property",
      completed: userProgress.emergencyPlanCreated,
      required: true,
    },
    {
      id: "notifications",
      title: "Enable notifications",
      description: "Get alerts for emergencies and community updates",
      completed: userProgress.notificationsEnabled,
      required: true,
    },
    {
      id: "community",
      title: "Join local community",
      description: "Connect with farmers in your area",
      completed: userProgress.communityJoined,
      required: false,
    },
    {
      id: "post",
      title: "Make your first post",
      description: "Introduce yourself to the community",
      completed: userProgress.firstPostMade,
      required: false,
    },
  ]

  const completedTasks = tasks.filter((task) => task.completed).length
  const requiredTasks = tasks.filter((task) => task.required)
  const completedRequiredTasks = requiredTasks.filter((task) => task.completed).length

  if (completedRequiredTasks === requiredTasks.length && completedTasks === tasks.length) {
    return null // Hide when all tasks are complete
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Complete Your Setup</CardTitle>
          <Badge variant="secondary">
            {completedTasks}/{tasks.length} Complete
          </Badge>
        </div>
        <Progress value={(completedTasks / tasks.length) * 100} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks
            .filter((task) => !task.completed)
            .slice(0, 3)
            .map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Circle className="h-5 w-5 text-slate-400" />
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-slate-600">{task.description}</p>
                </div>
                {task.required && <Badge className="bg-red-100 text-red-700">Required</Badge>}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
