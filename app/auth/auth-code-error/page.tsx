import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Authentication Error</CardTitle>
          <CardDescription>
            Sorry, we couldn't authenticate you. This could be due to an expired or invalid link.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>This might happen if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The confirmation link has expired</li>
              <li>The link has already been used</li>
              <li>There was an error with the authentication process</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <Button asChild>
              <Link href="/auth/login">Try Signing In Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/signup">Create New Account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
