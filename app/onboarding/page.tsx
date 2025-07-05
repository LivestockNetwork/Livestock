"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Shield, Users, MapPin, Phone, Mail, CheckCircle } from "lucide-react"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    state: "",
    region: "",
    userType: "",
    interests: [] as string[],
    emergencyContact: "",
    notifications: {
      emergency: true,
      community: true,
      marketplace: false,
    },
  })

  const totalSteps = 5

  const states = [
    { code: "NSW", name: "New South Wales", regions: ["Manning Valley", "Hunter Valley", "Riverina", "Central West"] },
    { code: "QLD", name: "Queensland", regions: ["Darling Downs", "Wide Bay", "Central Queensland"] },
    { code: "VIC", name: "Victoria", regions: ["Goulburn Valley", "Western District", "Gippsland"] },
    { code: "WA", name: "Western Australia", regions: ["Wheatbelt", "Great Southern", "Pilbara"] },
    { code: "SA", name: "South Australia", regions: ["Barossa Valley", "Adelaide Hills", "Riverland"] },
    { code: "TAS", name: "Tasmania", regions: ["North West", "Central", "East Coast"] },
    { code: "NT", name: "Northern Territory", regions: ["Top End", "Central Australia", "Katherine"] },
    { code: "ACT", name: "Australian Capital Territory", regions: ["Canberra Region", "Surrounding Areas"] },
  ]

  const userTypes = [
    { id: "farmer", label: "🚜 Farmer/Grazier", description: "Crops, cattle, sheep, mixed farming" },
    { id: "horse-owner", label: "🐴 Horse Owner", description: "Horses, agistment, riding, breeding" },
    { id: "hobby-farmer", label: "🐓 Hobby Farmer", description: "Small acreage, chickens, goats, lifestyle" },
    { id: "rural-family", label: "🏡 Rural Family", description: "Living in rural area, community focused" },
    { id: "rural-business", label: "🔧 Rural Business", description: "Services, tourism, contractors" },
    { id: "other", label: "🌾 Other Rural", description: "Rural lifestyle, tree change, retiree" },
  ]

  const interests = [
    "Livestock",
    "Horses",
    "Equipment",
    "Transport",
    "Agistment",
    "Feed/Hay",
    "Emergency Prep",
    "Community Events",
    "Rural Tourism",
    "Pets",
    "Wildlife",
    "Farming Tips",
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Here we would save the user data and redirect to the main app
    console.log("User onboarding complete:", formData)
    window.location.href = "/"
  }

  const selectedState = states.find((s) => s.code === formData.state)

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-800">Join Rural Living Australia</h1>
              <Badge className="bg-slate-100 text-slate-600">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStep / totalSteps) * 100}%`,
                  background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)",
                }}
              ></div>
            </div>
          </div>

          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="p-4 rounded-full bg-red-100 w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Safety Matters</h2>
                <p className="text-lg text-slate-600">
                  In emergencies, we need to reach you quickly. Your contact details stay private and secure.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-xs text-slate-500 mt-1">For community updates and weekly digest</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="0400 000 000"
                  />
                  <p className="text-xs text-slate-500 mt-1">For emergency alerts only - we never spam</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="p-4 rounded-full bg-blue-100 w-fit mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Where Are You?</h2>
                <p className="text-lg text-slate-600">
                  We'll connect you with your local rural community and relevant emergency services.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Select Your State</label>
                  <div className="grid grid-cols-2 gap-3">
                    {states.map((state) => (
                      <Button
                        key={state.code}
                        variant={formData.state === state.code ? "default" : "outline"}
                        onClick={() => setFormData({ ...formData, state: state.code, region: "" })}
                        className={`p-4 h-auto text-left ${
                          formData.state === state.code
                            ? "bg-amber-500 text-white border-amber-500"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{state.code}</div>
                          <div className="text-xs opacity-80">{state.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedState && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Select Your Region</label>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedState.regions.map((region) => (
                        <Button
                          key={region}
                          variant={formData.region === region ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, region })}
                          className={`p-3 text-left ${
                            formData.region === region
                              ? "bg-amber-500 text-white border-amber-500"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {region}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: User Type */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="p-4 rounded-full bg-green-100 w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Tell Us About You</h2>
                <p className="text-lg text-slate-600">
                  This helps us show you the most relevant community content and connections.
                </p>
              </div>

              <div className="space-y-4">
                {userTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={formData.userType === type.id ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, userType: type.id })}
                    className={`w-full p-4 h-auto text-left ${
                      formData.userType === type.id
                        ? "bg-amber-500 text-white border-amber-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-lg">{type.label}</div>
                      <div className="text-sm opacity-80">{type.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Interests */}
          {currentStep === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">What Interests You?</h2>
                <p className="text-lg text-slate-600">
                  Select topics you'd like to see in your community feed. You can change these anytime.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <Button
                    key={interest}
                    variant={formData.interests.includes(interest) ? "default" : "outline"}
                    onClick={() => {
                      const newInterests = formData.interests.includes(interest)
                        ? formData.interests.filter((i) => i !== interest)
                        : [...formData.interests, interest]
                      setFormData({ ...formData, interests: newInterests })
                    }}
                    className={`p-3 text-sm ${
                      formData.interests.includes(interest)
                        ? "bg-amber-500 text-white border-amber-500"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Notifications & Complete */}
          {currentStep === 5 && (
            <div>
              <div className="text-center mb-8">
                <div className="p-4 rounded-full bg-amber-100 w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-amber-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Almost Done!</h2>
                <p className="text-lg text-slate-600">
                  Choose how you'd like to stay connected with your rural community.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Notification Preferences</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-xl">
                      <input
                        type="checkbox"
                        checked={formData.notifications.emergency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: { ...formData.notifications, emergency: e.target.checked },
                          })
                        }
                        className="text-red-500"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">🚨 Emergency Alerts</div>
                        <div className="text-sm text-slate-600">Bushfire, flood, and safety warnings</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-xl">
                      <input
                        type="checkbox"
                        checked={formData.notifications.community}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: { ...formData.notifications, community: e.target.checked },
                          })
                        }
                        className="text-blue-500"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">👥 Community Updates</div>
                        <div className="text-sm text-slate-600">New posts, help requests, local events</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-slate-300 rounded-xl">
                      <input
                        type="checkbox"
                        checked={formData.notifications.marketplace}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: { ...formData.notifications, marketplace: e.target.checked },
                          })
                        }
                        className="text-green-500"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">🛒 Marketplace</div>
                        <div className="text-sm text-slate-600">New listings in your interests</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-bold text-slate-800 mb-2">Your Community Summary</h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div>
                      <strong>Location:</strong> {formData.region}, {formData.state}
                    </div>
                    <div>
                      <strong>Type:</strong> {userTypes.find((t) => t.id === formData.userType)?.label}
                    </div>
                    <div>
                      <strong>Interests:</strong> {formData.interests.slice(0, 3).join(", ")}
                      {formData.interests.length > 3 ? "..." : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                  (currentStep === 2 && (!formData.state || !formData.region)) ||
                  (currentStep === 3 && !formData.userType)
                }
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
