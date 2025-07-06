"use client"

import BrowserEmailSetup from "@/components/browser-email-setup"

export default function BrowserEmailSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browser Email Setup</h1>
          <p className="text-gray-600">Configure Gmail for sending emails directly from the browser</p>
        </div>

        <BrowserEmailSetup />

        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3">🔒 Security Notes</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Credentials are stored locally in your browser</li>
              <li>• Use Gmail app passwords, not your regular password</li>
              <li>• App passwords are safer than regular passwords</li>
              <li>• You can revoke app passwords anytime in Google settings</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-3">📧 What This Enables</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Send welcome emails to new users</li>
              <li>• Test email functionality</li>
              <li>• Registration with email confirmation</li>
              <li>• Emergency notifications (future feature)</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center space-x-4">
          <a
            href="/browser-email-test"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            🧪 Test Email Sending
          </a>
          <a
            href="/browser-registration"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            👤 Registration Form
          </a>
          <a
            href="/complete-test"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            🚀 Complete Test
          </a>
        </div>
      </div>
    </div>
  )
}
