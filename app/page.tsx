"use client"
import { useState } from "react"
import { Users, Handshake, Shield, TrendingUp, Heart, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import VideoUploadModal from "@/components/video-upload-modal"
import VideoPost from "@/components/video-post"

export default function RuralLivingAustralia() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [videoPosts, setVideoPosts] = useState([
    {
      id: "1",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "new-arrival",
      caption: "Beautiful filly born this morning. Come visit us for tours and demonstrations with our gentle giants!",
      author: "Bulahdelah Clydesdales",
      location: "Manning Valley, NSW",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 47,
      comments: 12,
      isBusinessPost: true,
    },
    {
      id: "2",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "farm-update",
      caption: "Finally got some decent rain. The paddocks are greening up nicely and the cattle are happy.",
      author: "Sarah M.",
      location: "Hunter Valley, NSW",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      likes: 23,
      comments: 8,
      isBusinessPost: false,
    },
  ])

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

  const handleVideoPost = (videoData: any) => {
    setVideoPosts([videoData, ...videoPosts])
  }

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
          {/* Emergency Awareness Section */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Card
              className="border-0 shadow-2xl rounded-3xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
            >
              <CardContent className="p-8 md:p-12 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="bg-white/20 text-white font-bold mb-4 px-4 py-2">🚨 HAPPENING NOW</Badge>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Texas Floods - January 2025</h2>

                    <p className="text-xl mb-6 opacity-90">
                      Right now, rural communities in Texas are cut off by flooding. Livestock stranded. Roads
                      impassable. No way to call for help.
                      <strong> Neighbors can't find neighbors.</strong>
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">72 hrs</div>
                        <div className="text-sm opacity-80">Communities isolated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">1000+</div>
                        <div className="text-sm opacity-80">Livestock at risk</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">Zero</div>
                        <div className="text-sm opacity-80">Community connection</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">?</div>
                        <div className="text-sm opacity-80">Lives lost</div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                      <p className="text-lg font-semibold mb-2">
                        💔 "We had no way to know who needed help or who could help."
                      </p>
                      <p className="text-sm opacity-80">- Texas rancher, January 2025</p>
                    </div>

                    <h3 className="text-2xl font-bold mb-4" style={{ color: "#fbbf24" }}>
                      This Could Be YOU
                    </h3>

                    <p className="text-lg mb-6">
                      Your farm. Your livestock. Your family. When disaster strikes YOUR community, will you be
                      connected or cut off?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-white text-red-600 hover:bg-gray-100 font-bold px-6 py-4 text-base rounded-xl shadow-xl"
                        onClick={() => (window.location.href = "/onboarding")}
                      >
                        <Shield className="h-5 w-5 mr-2" />
                        Join Your Community Now
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white/10 font-bold px-6 py-4 text-base rounded-xl bg-transparent"
                      >
                        Learn More About Safety
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop&auto=format"
                      alt="Flood emergency in rural area"
                      className="w-full h-80 object-cover rounded-2xl shadow-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="font-bold text-lg">Rural Texas - January 2025</p>
                      <p className="text-sm opacity-90">Communities cut off by flooding</p>
                    </div>

                    {/* Live indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-bold">LIVE EMERGENCY</span>
                    </div>
                  </div>
                </div>

                {/* Recent Disasters Timeline */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Rural Disasters Don't Wait - Neither Should You
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2">January 2025</div>
                      <div className="text-sm opacity-80">Texas Floods</div>
                      <div className="text-xs opacity-60 mt-1">Communities isolated 72+ hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2">December 2024</div>
                      <div className="text-sm opacity-80">Australian Bushfires</div>
                      <div className="text-xs opacity-60 mt-1">Rural families evacuated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold mb-2">Next Time?</div>
                      <div className="text-sm opacity-80">YOUR Community</div>
                      <div className="text-xs opacity-60 mt-1">Will you be ready?</div>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-lg font-semibold" style={{ color: "#fbbf24" }}>
                      🚀 Build Your Network Today. Be Ready for Tomorrow.
                    </p>
                    <p className="text-sm opacity-80 mt-2">Every connected community is a safer community.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
            onClick={() => setIsVideoModalOpen(true)}
          >
            <Users className="h-5 w-5 mr-2" />
            Share Your Moment
          </Button>
        </div>

        {/* Video Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoPosts.map((post) => (
            <VideoPost key={post.id} post={post} />
          ))}
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
      <VideoUploadModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onVideoPost={handleVideoPost}
      />
    </div>
  )
}
