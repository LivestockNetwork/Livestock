import Link from "next/link"
import { Users } from "lucide-react"

export default function ProfileSetupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
        </Link>
        <div>{/* Add user profile or settings here */}</div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Profile Setup</h1>
        {/* Add profile setup form or content here */}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 h-16 flex items-center justify-center">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Rural Community Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}
