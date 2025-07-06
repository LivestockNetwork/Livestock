import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Shield, Flame, CloudRain, Wind, Phone, Mail, ExternalLink, AlertTriangle } from "lucide-react"

export default function NSWPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Rural Community Hub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            🏞️ New South Wales Rural Communities
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">NSW Emergency Planning & Rural Support</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with rural communities across New South Wales. From the Blue Mountains to the Murray River, be
            prepared for bushfires, floods, droughts, and storms with your local community network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Find My Rural Community
              </Button>
            </Link>
            <Link href="/preparedness/bushfire">
              <Button size="lg" variant="outline">
                NSW Fire Planning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NSW Specific Risks */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">NSW Rural Emergency Risks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Flame className="h-5 w-5" />
                  Bushfires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  High risk areas: Blue Mountains, Hunter Valley, Southern Highlands, Central West. Peak season:
                  October-March.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <CloudRain className="h-5 w-5" />
                  Floods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Risk areas: Murray River, Murrumbidgee, Hawkesbury-Nepean, Northern Rivers. La Niña years increase
                  risk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <Wind className="h-5 w-5" />
                  Severe Storms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Hail, damaging winds, tornadoes. Most common: Spring/Summer. Eastern slopes and tablelands
                  particularly vulnerable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="h-5 w-5" />
                  Drought
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Western NSW most affected. El Niño years worsen conditions. Livestock and crop management critical.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* NSW Regions */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">NSW Rural Regions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Central West
                </CardTitle>
                <CardDescription>Orange, Bathurst, Dubbo, Parkes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Mixed farming, livestock, orchards. Bushfire and drought risks. Strong agricultural communities.
                </p>
                <Link href="/register">
                  <Button size="sm" className="w-full">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Hunter Valley
                </CardTitle>
                <CardDescription>Muswellbrook, Singleton, Cessnock</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Wine country, coal mining, agriculture. Bushfire prone. Horse studs and vineyards.
                </p>
                <Link href="/register">
                  <Button size="sm" className="w-full">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Riverina
                </CardTitle>
                <CardDescription>Wagga Wagga, Griffith, Leeton</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Irrigation, rice, citrus. Murray River flooding risks. Major agricultural production.
                </p>
                <Link href="/register">
                  <Button size="sm" className="w-full">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  New England
                </CardTitle>
                <CardDescription>Armidale, Tamworth, Glen Innes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  High country, sheep, beef cattle. Cold winters, bushfire summers. Strong rural traditions.
                </p>
                <Link href="/register">
                  <Button size="sm" className="w-full">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Southern Highlands
                </CardTitle>
                <CardDescription>Goulburn, Bowral, Moss Vale</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Cool climate, dairy, lifestyle properties. Bushfire interface zones. Growing communities.
                </p>
                <Link href="/register">
                  <Button size="sm" className="w-full">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Far West
                </CardTitle>
                <CardDescription>Broken Hill, Bourke, Lightning Ridge</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Outback communities, mining, pastoral. Extreme weather, isolation challenges.
                </p>
                <Link href="/register">
                  <Button size="sm" className="w-full">
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* NSW Resources */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">NSW Emergency Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-600" />
                  NSW RFS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  Rural Fire Service - bushfire alerts, total fire bans, volunteer brigades.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.rfs.nsw.gov.au" target="_blank" rel="noopener noreferrer">
                    Visit RFS <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-blue-600" />
                  NSW SES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  State Emergency Service - flood rescue, storm damage, emergency assistance.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.ses.nsw.gov.au" target="_blank" rel="noopener noreferrer">
                    Visit SES <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Emergency Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">
                  Official emergency warnings sent to mobile phones in affected areas.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.emergencyalert.gov.au" target="_blank" rel="noopener noreferrer">
                    Learn More <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Your NSW Rural Community Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect with neighbors, share resources, and stay prepared for emergencies across New South Wales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Find My Rural Community
              </Button>
            </Link>
            <Link href="/preparedness/flood">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 bg-transparent">
                NSW Flood Planning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">Rural Community Hub</span>
              </div>
              <p className="text-gray-400">Connecting NSW rural communities for emergency preparedness.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">NSW Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="https://www.rfs.nsw.gov.au"
                    className="hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSW RFS
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ses.nsw.gov.au"
                    className="hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSW SES
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.bom.gov.au/nsw/"
                    className="hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NSW Weather
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency Contacts</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Emergency: 000
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  SES: 132 500
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  RFS: 1800 679 737
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  nsw@ruralcommunityhub.com.au
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rural Community Hub NSW. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
