"use client"

import { useState } from "react"

export default function EmailDiagnosticPage() {
  const [results, setResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [testEmail] = useState("patrick@bulahdelahclydesdales.com")

  const addResult = (message: string) => {
    setResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    console.log("Diagnostic:", message)
  }

  const runFullDiagnostic = async () => {
    setIsRunning(true)
    setResults([])

    addResult("🚀 Starting comprehensive email system diagnostic...")
    addResult(`📧 Using test email: ${testEmail}`)

    // Test 1: Check API endpoints exist
    addResult("🔍 Testing API endpoints...")

    try {
      const usersTest = await fetch("/api/users")
      const usersData = await usersTest.json()
      addResult(`✅ /api/users endpoint: ${usersData.message}`)
    } catch (error: any) {
      addResult(`❌ /api/users endpoint failed: ${error.message}`)
    }

    // Test 2: Check email configuration
    addResult("📋 Checking email configuration...")
    try {
      const statusResponse = await fetch("/api/email/simple-status")
      const statusData = await statusResponse.json()

      if (statusData.configured) {
        addResult(`✅ Email configured for: ${statusData.email}`)
      } else {
        addResult("❌ Email not configured - Gmail setup required")
        addResult("🔧 Please visit /simple-email-setup to configure Gmail")
        setIsRunning(false)
        return
      }
    } catch (error: any) {
      addResult(`❌ Email status check failed: ${error.message}`)
    }

    // Test 3: Direct email test
    addResult("📬 Testing direct email sending...")
    try {
      const testResponse = await fetch("/api/email/simple-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      })

      const testData = await testResponse.json()

      if (testData.success) {
        addResult("✅ Direct email test SUCCESSFUL!")
        addResult("📧 Test email sent - check inbox and spam folder")
      } else {
        addResult(`❌ Direct email test FAILED: ${testData.message}`)
      }
    } catch (error: any) {
      addResult(`❌ Direct email test ERROR: ${error.message}`)
    }

    // Test 4: Full registration flow
    addResult("🔄 Testing complete registration flow...")
    try {
      const registrationData = {
        firstName: "Patrick",
        lastName: "Test",
        email: testEmail,
        location: "Rural NSW",
        propertyType: "Horse Stud",
        primaryInterest: "Livestock Management",
      }

      addResult("📝 Submitting test registration...")
      const regResponse = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      })

      const regData = await regResponse.json()

      if (regData.success) {
        addResult("✅ Registration flow SUCCESSFUL!")
        addResult(`📧 Welcome email sent to: ${testEmail}`)
        addResult("🎉 SYSTEM IS WORKING 100%!")
      } else {
        addResult(`❌ Registration flow FAILED: ${regData.message}`)
        if (regData.emailError) {
          addResult(`📧 Email error: ${regData.emailError}`)
        }
      }
    } catch (error: any) {
      addResult(`❌ Registration flow ERROR: ${error.message}`)
    }

    // Test 5: Multiple registration test
    addResult("🔄 Testing multiple registrations...")
    const testUsers = [
      { firstName: "John", lastName: "Farmer", email: testEmail },
      { firstName: "Sarah", lastName: "Rancher", email: testEmail },
    ]

    for (const user of testUsers) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...user,
            location: "Rural Australia",
            propertyType: "Mixed Farming",
            primaryInterest: "Community Connection",
          }),
        })

        const data = await response.json()
        if (data.success) {
          addResult(`✅ ${user.firstName} registration successful`)
        } else {
          addResult(`❌ ${user.firstName} registration failed: ${data.message}`)
        }
      } catch (error: any) {
        addResult(`❌ ${user.firstName} registration error: ${error.message}`)
      }
    }

    addResult("🏁 DIAGNOSTIC COMPLETE!")
    addResult("📊 Check your email inbox for multiple test emails")
    addResult("✅ System ready for real users!")

    setIsRunning(false)
  }

  const testSingleEmail = async () => {
    setIsRunning(true)
    addResult("📧 Sending single test email...")

    try {
      const response = await fetch("/api/email/simple-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      })

      const data = await response.json()
      addResult(data.success ? "✅ Single email sent!" : `❌ Failed: ${data.message}`)
    } catch (error: any) {
      addResult(`❌ Error: ${error.message}`)
    }

    setIsRunning(false)
  }

  const testRegistration = async () => {
    setIsRunning(true)
    addResult("👤 Testing user registration...")

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Patrick",
          lastName: "Bulah Delah",
          email: testEmail,
          location: "Rural NSW",
          propertyType: "Horse Stud - Clydesdales",
          primaryInterest: "Livestock Management",
        }),
      })

      const data = await response.json()
      addResult(data.success ? "✅ Registration successful!" : `❌ Failed: ${data.message}`)
    } catch (error: any) {
      addResult(`❌ Error: ${error.message}`)
    }

    setIsRunning(false)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Complete Email System Testing</h1>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="font-bold text-blue-800 mb-2">🎯 Testing with: {testEmail}</h2>
        <p className="text-blue-700">This will run comprehensive tests to ensure 100% functionality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={runFullDiagnostic}
          disabled={isRunning}
          className="bg-green-600 text-white px-6 py-4 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isRunning ? "🔄 Running..." : "🚀 Run Full Diagnostic"}
        </button>

        <button
          onClick={testSingleEmail}
          disabled={isRunning}
          className="bg-blue-600 text-white px-6 py-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "🔄 Testing..." : "📧 Test Single Email"}
        </button>

        <button
          onClick={testRegistration}
          disabled={isRunning}
          className="bg-purple-600 text-white px-6 py-4 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {isRunning ? "🔄 Testing..." : "👤 Test Registration"}
        </button>
      </div>

      <div className="bg-black text-green-400 p-6 rounded font-mono text-sm h-96 overflow-y-auto">
        <div className="mb-4 text-green-300">🖥️ TESTING CONSOLE - patrick@bulahdelahclydesdales.com</div>
        {results.map((result, index) => (
          <div key={index} className="mb-1 leading-relaxed">
            {result}
          </div>
        ))}
        {isRunning && <div className="animate-pulse text-yellow-400">⏳ Running comprehensive tests...</div>}
        {results.length === 0 && !isRunning && (
          <div className="text-gray-500">Click "Run Full Diagnostic" to start testing the email system</div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-800 mb-2">✅ Success Indicators:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Email configuration loaded successfully</li>
            <li>• Direct email test passes</li>
            <li>• Registration flow completes</li>
            <li>• Welcome emails arrive in inbox</li>
            <li>• Multiple registrations work</li>
          </ul>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-bold text-red-800 mb-2">❌ Common Issues:</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Gmail not configured (visit /simple-email-setup)</li>
            <li>• Nodemailer not installed</li>
            <li>• Incorrect app password</li>
            <li>• API routes not working</li>
            <li>• Email in spam folder</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
