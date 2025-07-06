import { NextResponse } from "next/server"
import { getAllUsers, getUserCount, debugUsers } from "@/lib/user-storage"

export async function GET() {
  try {
    console.log("Debug Users API - Fetching all users...")

    // Log users to console
    debugUsers()

    const users = getAllUsers()
    const userCount = getUserCount()

    // Return user info without passwords
    const safeUsers = users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      location: user.location,
      propertyType: user.propertyType,
      primaryInterest: user.primaryInterest,
      state: user.state,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    }))

    return NextResponse.json({
      success: true,
      userCount,
      users: safeUsers,
      message: `Found ${userCount} registered users`,
    })
  } catch (error: any) {
    console.error("Debug Users API - Error:", error)
    return NextResponse.json({
      success: false,
      message: `Error fetching users: ${error.message}`,
      userCount: 0,
      users: [],
    })
  }
}
