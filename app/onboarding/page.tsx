import Link from "next/link"
import { Users } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-16 border-b border-b-slate-200 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
        </Link>
        <nav>{/* Navigation links will go here */}</nav>
      </header>

      <main className="flex-1 p-4">
        {/* Onboarding content will go here */}
        <h1>Onboarding Page</h1>
        <p>Welcome to the Rural Community Hub!</p>
      </main>

      <footer className="h-12 border-t border-t-slate-200 flex items-center justify-center">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Rural Community Hub. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
