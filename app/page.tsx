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
      topRegions: "Manning Valley, Hunter Valley, Riverina",
      description: "Australia's most active rural community",
    },
    {
      name: "Queensland",
      code: "QLD",
      regions: 8,
      members: "1,800+",
      featured: false,
      topRegions: "Darling Downs, Wide Bay, Central Queensland",
      description: "Diverse farming and cattle country",
    },
    {
      name: "Victoria",
      code: "VIC",
      regions: 10,
      members: "2,100+",
      featured: false,
      topRegions: "Goulburn Valley, Western District, Gippsland",
      description: "Dairy and mixed farming heartland",
    },
    {
      name: "Western Australia",
      code: "WA",
      regions: 7,
      members: "1,200+",
      featured: false,
      topRegions: "Wheatbelt, Great Southern, Pilbara",
      description: "Vast wheat and livestock regions",
    },
    {
      name: "South Australia",
      code: "SA",
      regions: 6,
      members: "900+",
      featured: false,
      topRegions: "Barossa Valley, Adelaide Hills, Riverland",
      description: "Wine country meets grain farming",
    },
    {
      name: "Tasmania",
      code: "TAS",
      regions: 4,
      members: "600+",
      featured: false,
      topRegions: "North West, Central, East Coast",
      description: "Island farming and forestry",
    },
  ]

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Connection",
      description: "Connect with neighbors, share transport, find local help",
      color: "#7EC9BB",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Rural Marketplace",
      description: "Buy and sell livestock, equipment, feed, and services",
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
      quote: "Finally, a platform that understands rural life. Found transport to sales and made new connections.",
      author: "Sarah M.",
      location: "Manning Valley, NSW",
      role: "Cattle Producer",
    },
    {
      quote: "Sold my tractor in 2 days. Much better than Facebook groups - real people, no trolls.",
      author: "Tom R.",
      location: "Darling Downs, QLD",
      role: "Mixed Farming",
    },
    {
      quote: "The community support during the floods was incredible. Neighbors helping neighbors.",
      author: "Lisa K.",
      location: "Goulburn Valley, VIC",
      role: "Dairy Farmer",
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
              className="border-0 shadow-2xl rounded-3xl overflow-hidden p-8"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Choose Your State</h3>
                <p className="text-xl text-slate-600">Join your local rural community across Australia</p>
              </div>

              {/* State Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {states.map((state, index) => (
                  <Card
                    key={index}
                    className={`border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform cursor-pointer ${
                      state.featured ? "ring-2 ring-amber-400" : ""
                    }`}
                    style={{
                      backgroundColor: state.featured ? "rgba(245, 158, 11, 0.1)" : "rgba(255, 255, 255, 0.9)",
                    }}
                    onClick={() => (window.location.href = `/states/${state.code.toLowerCase()}`)}
                  >
                    <CardContent className="p-6 text-center">
                      {state.featured && (
                        <Badge
                          className="text-white font-bold mb-4"
                          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                        >
                          🌟 Most Active
                        </Badge>
                      )}

                      <div
                        className="p-4 rounded-2xl mx-auto mb-4 w-fit hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundColor: state.featured ? "#f59e0b20" : "#7EC9BB20",
                        }}
                      >
                        <MapPin className="h-8 w-8" style={{ color: state.featured ? "#f59e0b" : "#7EC9BB" }} />
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-2">{state.name}</h3>
                      <div
                        className="text-3xl font-bold mb-2"
                        style={{ color: state.featured ? "#f59e0b" : "#7EC9BB" }}
                      >
                        {state.members}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{state.description}</p>

                      <div className="text-xs text-slate-500 mb-4">
                        <strong>Top Regions:</strong> {state.topRegions}
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>{state.regions} Regions</span>
                        <span>Active Community</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">
                  <strong>NSW</strong> leads Australia with the most active rural community platform
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                  >
                    47 Active Regions
                  </Badge>
                  <Badge
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    1,200+ Listings
                  </Badge>
                  <Badge
                    className="text-white font-semibold"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                  >
                    24/7 Community
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                8,100+
              </div>
              <div className="text-slate-600 font-medium">Rural Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#7EC9BB" }}>
                47
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

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Real Stories from Real Farmers</h2>
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
            Join thousands of farmers, graziers, and rural families building stronger communities together.
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
                Connecting rural communities across Australia. Built by farmers, for farmers.
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
    </div>
  )
}
