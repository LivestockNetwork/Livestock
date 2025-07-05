import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="grid h-screen place-items-center bg-gray-100">
      <Card className="w-[450px] shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
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
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  Login
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
          </div>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email address and we will send you a reset link.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Send Reset Link</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
