import Link from "next/link"

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Authentication Error</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, we couldn't authenticate you. This could be due to an expired or invalid link.
          </p>
          <div className="mt-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Try signing in again
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
