"use client"
import { Users, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function NSWRegions() {
  const regions = [
    {
      name: "Manning Valley",
      code: "manning-valley",
      members: "450+",
      towns: "Taree, Wingham, Gloucester, Krambach",
      featured: true,
      description: "Our most active community with strong livestock and farming networks",
    },
    {
      name: "Hunter Valley",
      code: "hunter-valley",
      members: "380+",
      towns: "Muswellbrook, Singleton, Cessnock, Maitland",
      featured: false,
      description: "Wine country meets cattle country - diverse rural community",
    },
    {
      name: "Riverina",
      code: "riverina",
      members: "520+",
      towns: "Wagga Wagga, Griffith, Leeton, Narrandera",
      featured: false,
      description: "Rice, wheat and livestock hub of NSW",
    },
    {
      name: "New England",
      code: "new-england",
      members: "290+",
      towns: "Armidale, Tamworth, Glen Innes, Inverell",
      featured: false,
      description: "High country farming and livestock region",
    },
    {
      name: "Central West",
      code: "central-west",
      members: "340+",
      towns: "Orange, Bathurst, Dubbo, Parkes",
      featured: false,
      description: "Mixed farming and grazing heartland",
    },
    {
      name: "South Coast",
      code: "south-coast",
      members: "220+",
      towns: "Bega, Narooma, Moruya, Bateman's Bay",
      featured: false,
      description: "Coastal farming and dairy communities",
    },
  ]

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&auto=format"
            alt="NSW rural landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-white/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Australia
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Badge
              className="text-white font-semibold px-4 py-2 text-sm mb-6"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              🌾 New South Wales • Australia's Most Active Rural Community
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              Rural NSW
              <span className="block text-3xl md:text-4xl mt-2" style={{ color: "#f59e0b" }}>
                Choose Your Region
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              From the Manning Valley to the Riverina, connect with your local rural community.
              <br />
              <strong>2,400+ farmers, graziers, and rural families</strong> across NSW.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "#f59e0b" }}>
                  2,400+
                </div>
                <div className="text-slate-600 font-medium">NSW Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "#f59e0b" }}>
                  12
                </div>
                <div className="text-slate-600 font-medium">Active Regions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "#f59e0b" }}>
                  680+
                </div>
                <div className="text-slate-600 font-medium">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "#f59e0b" }}>
                  #1
                </div>
                <div className="text-slate-600 font-medium">Most Connected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive NSW Regional Map */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Click Your Region</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select your region on the NSW map to join your local rural community
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card
            className="border-0 shadow-2xl rounded-3xl overflow-hidden p-8"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <svg viewBox="0 0 1000 700" className="w-full h-auto cursor-pointer" style={{ maxHeight: "600px" }}>
              {/* Background */}
              <rect width="1000" height="700" fill="#f8fafc" />

              {/* New England (North) */}
              <path
                d="M400 50 L700 50 L700 200 L400 200 Z"
                fill="#7EC9BB"
                stroke="#6BB3A6"
                strokeWidth="3"
                className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                onClick={() => (window.location.href = "/regions/new-england")}
              />
              <text x="550" y="115" textAnchor="middle" className="fill-white font-bold text-lg pointer-events-none">
                New England
              </text>
              <text x="550" y="135" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                290+ Members
              </text>
              <text x="550" y="155" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                Armidale • Tamworth
              </text>

              {/* Hunter Valley (North East) */}
              <path
                d="M700 50 L900 50 L900 250 L700 250 Z"
                fill="#7EC9BB"
                stroke="#6BB3A6"
                strokeWidth="3"
                className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                onClick={() => (window.location.href = "/regions/hunter-valley")}
              />
              <text x="800" y="140" textAnchor="middle" className="fill-white font-bold text-lg pointer-events-none">
                Hunter Valley
              </text>
              <text x="800" y="160" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                380+ Members
              </text>
              <text x="800" y="180" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                Muswellbrook • Singleton
              </text>

              {/* Manning Valley (North East Coast) - FEATURED */}
              <path
                d="M700 250 L900 250 L900 350 L700 350 Z"
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="4"
                className="hover:fill-[#d97706] transition-all duration-300 cursor-pointer animate-pulse"
                onClick={() => (window.location.href = "/regions/manning-valley")}
              />
              <text x="800" y="290" textAnchor="middle" className="fill-white font-bold text-xl pointer-events-none">
                Manning Valley
              </text>
              <text x="800" y="315" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                450+ Members ⭐
              </text>
              <text x="800" y="335" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                Taree • Wingham • Gloucester
              </text>

              {/* Central West */}
              <path
                d="M200 200 L500 200 L500 400 L200 400 Z"
                fill="#7EC9BB"
                stroke="#6BB3A6"
                strokeWidth="3"
                className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                onClick={() => (window.location.href = "/regions/central-west")}
              />
              <text x="350" y="290" textAnchor="middle" className="fill-white font-bold text-lg pointer-events-none">
                Central West
              </text>
              <text x="350" y="310" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                340+ Members
              </text>
              <text x="350" y="330" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                Orange • Bathurst • Dubbo
              </text>

              {/* Riverina (South West) */}
              <path
                d="M50 400 L400 400 L400 600 L50 600 Z"
                fill="#7EC9BB"
                stroke="#6BB3A6"
                strokeWidth="3"
                className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                onClick={() => (window.location.href = "/regions/riverina")}
              />
              <text x="225" y="490" textAnchor="middle" className="fill-white font-bold text-lg pointer-events-none">
                Riverina
              </text>
              <text x="225" y="510" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                520+ Members
              </text>
              <text x="225" y="530" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                Wagga Wagga • Griffith
              </text>

              {/* South Coast */}
              <path
                d="M600 450 L900 450 L900 600 L600 600 Z"
                fill="#7EC9BB"
                stroke="#6BB3A6"
                strokeWidth="3"
                className="hover:fill-[#6BB3A6] transition-all duration-300 cursor-pointer"
                onClick={() => (window.location.href = "/regions/south-coast")}
              />
              <text x="750" y="515" textAnchor="middle" className="fill-white font-bold text-lg pointer-events-none">
                South Coast
              </text>
              <text x="750" y="535" textAnchor="middle" className="fill-white text-sm pointer-events-none">
                220+ Members
              </text>
              <text x="750" y="555" textAnchor="middle" className="fill-white text-xs pointer-events-none">
                Bega • Narooma
              </text>

              {/* Legend */}
              <g transform="translate(50, 50)">
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="130"
                  fill="rgba(255,255,255,0.95)"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  rx="10"
                />
                <text x="100" y="20" textAnchor="middle" className="fill-slate-800 font-bold text-sm">
                  NSW Rural Regions
                </text>

                <circle cx="20" cy="40" r="8" fill="#f59e0b" />
                <text x="35" y="45" className="fill-slate-700 text-xs">
                  Featured - Manning Valley
                </text>

                <circle cx="20" cy="65" r="8" fill="#7EC9BB" />
                <text x="35" y="70" className="fill-slate-700 text-xs">
                  Active Communities
                </text>

                <text x="100" y="95" textAnchor="middle" className="fill-slate-600 text-xs">
                  Click any region to join
                </text>
                <text x="100" y="110" textAnchor="middle" className="fill-slate-600 text-xs">
                  your local community
                </text>
              </g>

              {/* Featured Badge for Manning Valley */}
              <g transform="translate(720, 220)">
                <rect x="0" y="0" width="160" height="25" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="12" />
                <text x="80" y="17" textAnchor="middle" className="fill-white font-bold text-xs">
                  🌟 MOST ACTIVE REGION
                </text>
              </g>
            </svg>

            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">
                <strong>Manning Valley</strong> leads NSW with the most active rural community platform
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                >
                  Manning Valley - 450+ Members
                </Badge>
                <Badge
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                >
                  12 Active Regions
                </Badge>
                <Badge
                  className="text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                >
                  680+ Active Listings
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Featured Region Spotlight */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Region: Manning Valley</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our most connected and active rural community in NSW
          </p>
        </div>

        <Card
          className="border-0 shadow-2xl rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}
        >
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge
                  className="text-white font-bold mb-6"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                >
                  🌟 Most Active Community
                </Badge>

                <h3 className="text-3xl font-bold text-slate-800 mb-6">Manning Valley Rural Hub</h3>

                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  From Taree to Gloucester, our Manning Valley community leads the way in rural connection.
                  <strong>450+ active members</strong> sharing transport, trading livestock, and supporting each other
                  through droughts, floods, and everything in between.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                      450+
                    </div>
                    <div className="text-slate-600 text-sm">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                      180+
                    </div>
                    <div className="text-slate-600 text-sm">Current Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                      24/7
                    </div>
                    <div className="text-slate-600 text-sm">Community Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                      95%
                    </div>
                    <div className="text-slate-600 text-sm">Satisfaction Rate</div>
                  </div>
                </div>

                <Link href="/regions/manning-valley">
                  <Button
                    size="lg"
                    className="text-white font-bold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                    style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Join Manning Valley Community
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&auto=format"
                  alt="Manning Valley landscape"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-lg">Manning Valley</p>
                  <p className="text-sm opacity-90">Taree • Wingham • Gloucester • Krambach</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&auto=format"
            alt="NSW rural community"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join Your NSW Rural Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with neighbors, share resources, and build resilience together across NSW.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-slate-100 font-bold px-8 py-4 text-lg rounded-xl shadow-xl"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Choose Your Region
            </Button>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-xl bg-transparent"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Australia
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
