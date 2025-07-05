import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <header className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/about">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                About
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button
                size="sm"
                className="text-white font-semibold"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                Join Now
              </Button>
            </Link>
          </div>
        </header>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>

        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password" className="mt-1" />
          </div>
          <div>
            <Button className="w-full" style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}>
              Login
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link href="/register" className="text-sm text-gray-600 hover:text-gray-800">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  )
}
