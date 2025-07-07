"use client"

import { useFormState } from "react-dom"
import { registerUser } from "@/app/actions/user-registration"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

const initialState = {
  success: false,
  error: null,
}

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
          <p className="text-center text-gray-600">Just name, email, state and password to get started</p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" type="text" required placeholder="Enter your full name" />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required placeholder="Enter your email" />
            </div>

            <div>
              <Label htmlFor="state">State/Territory</Label>
              <Select name="state" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">New South Wales</SelectItem>
                  <SelectItem value="VIC">Victoria</SelectItem>
                  <SelectItem value="QLD">Queensland</SelectItem>
                  <SelectItem value="WA">Western Australia</SelectItem>
                  <SelectItem value="SA">South Australia</SelectItem>
                  <SelectItem value="TAS">Tasmania</SelectItem>
                  <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                  <SelectItem value="NT">Northern Territory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Create a password"
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                minLength={6}
              />
            </div>

            {state?.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:text-green-500 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
