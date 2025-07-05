import Link from "next/link"
import { Users } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container py-12">
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
        </Link>

        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/community" className="text-slate-600 hover:text-slate-900 transition-colors">
                Community
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-slate-600 hover:text-slate-900 transition-colors">
                Events
              </Link>
            </li>
            <li>
              <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition-colors">
                Resources
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Community Page</h1>
        <p className="text-slate-700">
          Welcome to the community page! This is where you can connect with other members of our rural community.
        </p>
      </main>
    </div>
  )
}
