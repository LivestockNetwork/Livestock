"use client"
import { Users, Handshake, Shield, TrendingUp, Heart, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RuralLivingAustralia() {
  const states = [
    {
      name: "New South Wales",
      code: "NSW",
      regions: 12,
      members: "2,400+",
      featured: true,
      description: "Most active community",
    },
    {
      name: "Queensland",
      code: "QLD",
      regions: 8,
      members: "1,800+",
      featured: false,
      description: "Cattle & farming country",
    },
    {
      name: "Victoria",
      code: "VIC",
      regions: 10,
      members: "2,100+",
      featured: false,
      description: "Dairy & mixed farming",
    },
    {
      name: "Western Australia",
      code: "WA",
      regions: 7,
      members: "1,200+",
      featured: false,
      description: "Wheat & livestock",
    },
    {
      name: "South Australia",
      code: "SA",
      regions: 6,
      members: "900+",
      featured: false,
      description: "Wine & grain farming",
    },
    {
      name: "Tasmania",
      code: "TAS",
      regions: 4,
      members: "600+",
      featured: false,
      description: "Island farming",
    },
    {
      name: "Northern Territory",
      code: "NT",
      regions: 3,
      members: "350+",
      featured: false,
      description: "Cattle stations",
    },
    {
      name: "Australian Capital Territory",
      code: "ACT",
      regions: 2,
      members: "180+",
      featured: false,
      description: "Rural communities",
    },
  ]

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Connection",
      description: "Connect with rural neighbors, share transport, find local services",
      color: "#7EC9BB",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Rural Marketplace",
      description: "Buy and sell animals, equipment, feed, and rural services",
      color: "#f59e0b",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety Preparedness",
      description: "Bushfire and flood planning, emergency coordination",
      color: "#ef4444",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Local Knowledge",
      description: "Weather updates, market prices, farming insights",
      color: "#3b82f6",
    },
  ]

  const testimonials = [
    {
      quote:
        "Finally, a platform that understands rural life. Found transport for my horses and connected with local agistment providers.",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      role: "Horse Owner",
    },
    {
      quote:
        "Sold my old tractor in 2 days and found someone to help with my alpacas. Much better than Facebook groups.",
      author: "Tom R.",
      location: "Darling Downs, QLD",
      role: "Hobby Farmer",
    },
    {
      quote: "The community support during the floods was incredible. Rural neighbors helping rural neighbors.",
      author: "Lisa K.",
      location: "Goulburn Valley, VIC",
      role: "Rural Family",
    },
  ]

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop&auto=format"
            alt="Australian rural landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="mb-12">
            <Badge
              className="text-white font-semibold px-4 py-2 text-sm mb-6"
              style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
            >
              🇦🇺 Proudly Australian • Built for Rural Communities
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6">
              Rural Living
              <span className="block" style={{ color: "#7EC9BB" }}>
                Australia
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              <strong>Rural people don't wait for help, they ARE the help.</strong>
              <br />
              Connect with your community. Share resources. Build resilience together.
            </p>
          </div>

          {/* Choose Your State Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card
              className="border-0 shadow-2xl rounded-3xl overflow-hidden p-6"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Choose Your State</h3>
                <p className="text-lg text-slate-600">Join your local rural community</p>
              </div>

              {/* Compact State Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {states.map((state, index) => (
                  <Card
                    key={index}
                    className={`border-0 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 transform cursor-pointer ${
                      state.featured ? "ring-2 ring-amber-400" : ""
                    }`}
                    style={{
                      backgroundColor: state.featured ? "rgba(245, 158, 11, 0.1)" : "rgba(255, 255, 255, 0.9)",
                    }}
                    onClick={() => (window.location.href = `/states/${state.code.toLowerCase()}`)}
                  >
                    <CardContent className="p-4 text-center">
                      {state.featured && (
                        <Badge
                          className="text-white font-bold text-xs mb-2"
                          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                        >
                          🌟 Featured
                        </Badge>
                      )}

                      <div
                        className="p-2 rounded-xl mx-auto mb-3 w-fit hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundColor: state.featured ? "#f59e0b20" : "#7EC9BB20",
                        }}
                      >
                        <MapPin className="h-6 w-6" style={{ color: state.featured ? "#f59e0b" : "#7EC9BB" }} />
                      </div>

                      <h3 className="text-lg font-bold text-slate-800 mb-1">{state.name}</h3>
                      <div
                        className="text-2xl font-bold mb-2"
                        style={{ color: state.featured ? "#f59e0b" : "#7EC9BB" }}
                      >
                        {state.members}
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{state.description}</p>

                      <div className="text-xs text-slate-500">{state.regions} Regions</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-slate-600 mb-3">
                  <strong>NSW</strong> leads with the most active rural community
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge
                    className="text-white font-semibold text-xs"
                    style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                  >
                    52 Regions
                  </Badge>
                  <Badge
                    className="text-white font-semibold text-xs"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    1,200+ Listings
                  </Badge>
                  <Badge
                    className="text-white font-semibold text-xs"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                  >
                    24/7 Support
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                8,630+
              </div>
              <div className="text-slate-600 font-medium">Rural Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                52
              </div>
              <div className="text-slate-600 font-medium">Regions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                1,200+
              </div>
              <div className="text-slate-600 font-medium">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                24/7
              </div>
              <div className="text-slate-600 font-medium">Community Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Built for Rural Life</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to connect, trade, and thrive in rural Australia
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-2xl mx-auto mb-4 w-fit" style={{ backgroundColor: `${feature.color}20` }}>
                  <div style={{ color: feature.color }}>{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Moments Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Community Moments</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Share your rural life - new arrivals, farm updates, and community stories
          </p>

          <Button
            size="lg"
            className="text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all mb-8"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            onClick={() => document.getElementById("video-upload-modal")?.classList.remove("hidden")}
          >
            <Users className="h-5 w-5 mr-2" />
            Share Your Moment
          </Button>
        </div>

        {/* Video Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Business Post */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden ring-2 ring-amber-400">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop&auto=format"
                alt="New Clydesdale foal"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  className="text-white font-bold text-xs"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                >
                  🌟 Featured Business
                </Badge>
              </div>
              <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-3 left-3 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                2:34
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Bulahdelah Clydesdales</div>
                  <div className="text-sm text-slate-600">Manning Valley, NSW</div>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Meet our newest arrival! 🐴</h3>
              <p className="text-slate-600 text-sm mb-4">
                "Beautiful filly born this morning. Come visit us for tours and demonstrations with our gentle giants!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" /> 47
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> 12 comments
                  </span>
                </div>
                <Button
                  size="sm"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  className="text-white"
                >
                  Book Tour
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Regular Community Post */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop&auto=format"
                alt="Cattle in field"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-3 left-3 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                1:12
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Sarah M.</div>
                  <div className="text-sm text-slate-600">Hunter Valley, NSW</div>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Cattle looking good after the rain! 🌧️</h3>
              <p className="text-slate-600 text-sm mb-4">
                "Finally got some decent rain. The paddocks are greening up nicely and the cattle are happy."
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> 23
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> 8 comments
                </span>
                <span>2 hours ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Help Request Post */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden border-l-4 border-red-400">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop&auto=format"
                alt="Horse in field"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-red-500 text-white font-bold text-xs">🚨 Need Help</Badge>
              </div>
              <div className="absolute bottom-3 left-3 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                0:45
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-red-100">
                  <Shield className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Tom R.</div>
                  <div className="text-sm text-slate-600">Riverina, NSW</div>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Mare seems off - any advice? 🐎</h3>
              <p className="text-slate-600 text-sm mb-4">
                "She's not eating well and seems lethargic. Vet is 2 hours away. Anyone seen this before?"
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> 15
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> 18 comments
                </span>
                <span>45 minutes ago</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-8 py-4 text-lg rounded-xl bg-transparent"
          >
            View All Community Posts
          </Button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Real Stories from Rural Folk</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how Rural Living Australia is making a difference in communities across the country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl rounded-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-slate-700 mb-6 italic">"{testimonial.quote}"</blockquote>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=400&fit=crop&auto=format"
            alt="Rural community"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Connect with Your Rural Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of rural families, horse owners, and country folk building stronger communities together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-xl bg-transparent"
            >
              <Heart className="h-5 w-5 mr-2" />
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#7EC9BB" }}>
                Rural Living Australia
              </h3>
              <p className="text-slate-300">
                Connecting rural communities across Australia. Built by rural folk, for rural communities.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <p className="text-slate-300 mb-4">Join our community and stay updated with rural news and events.</p>
              <Button
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                Join Newsletter
              </Button>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Rural Living Australia. Built with ❤️ for rural communities.</p>
          </div>
        </div>
      </footer>

      {/* Video Upload Modal */}
      <div
        id="video-upload-modal"
        className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Share Your Rural Moment</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.getElementById("video-upload-modal")?.classList.add("hidden")}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-3">What's happening?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 font-semibold bg-transparent"
                >
                  🐴 New Arrival
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold bg-transparent"
                >
                  🚜 Equipment Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 font-semibold bg-transparent"
                >
                  🌾 Farm Update
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-red-200 text-red-700 hover:bg-red-50 font-semibold bg-transparent"
                >
                  🚨 Need Help
                </Button>
              </div>
            </div>

            {/* Video Upload Area */}
            <div className="mb-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors">
                <div className="mb-4">
                  <div className="p-4 rounded-full bg-slate-100 w-fit mx-auto">
                    <Users className="h-8 w-8 text-slate-500" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-700 mb-2">Record or Upload Video</h4>
                <p className="text-slate-500 mb-4">Share what's happening on your property</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    📹 Record Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                  >
                    📁 Upload Video
                  </Button>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Tell your story</label>
              <textarea
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                rows={3}
                placeholder="What's happening? Share details, ask for advice, or just show off your rural life!"
              />
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-slate-600">Manning Valley, NSW</span>
                <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 ml-auto">
                  Change
                </Button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-3">Who can see this?</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input type="radio" name="privacy" value="local" defaultChecked className="text-amber-500" />
                  <span className="text-slate-700">Local community only</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="privacy" value="state" className="text-amber-500" />
                  <span className="text-slate-700">Entire state</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="privacy" value="australia" className="text-amber-500" />
                  <span className="text-slate-700">All of Australia</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="text-white font-bold px-8 py-3 text-lg rounded-xl shadow-xl flex-1"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                Share with Community
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-8 py-3 text-lg rounded-xl bg-transparent"
                onClick={() => document.getElementById("video-upload-modal")?.classList.add("hidden")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
