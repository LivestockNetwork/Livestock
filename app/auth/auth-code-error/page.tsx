import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-red-600">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Authentication Error</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, we couldn't authenticate you. This could be due to an expired or invalid link.
          </p>
          <div className="mt-6">
            <Link href="/auth/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Try signing in again</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
