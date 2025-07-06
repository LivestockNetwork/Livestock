// Simple user storage system for development
// In production, replace with proper database

interface User {
  id: string
  firstName: string
  lastName?: string
  email: string
  phone?: string
  location?: string
  propertyType?: string
  primaryInterest?: string
  state?: string
  password: string
  createdAt: Date
  lastLogin?: Date
}

// In-memory storage (replace with database in production)
const users: User[] = []

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const user: User = {
    ...userData,
    id: generateUserId(),
    createdAt: new Date(),
  }

  users.push(user)
  console.log("User Storage - Created user:", user.email)
  console.log("User Storage - Total users:", users.length)
  console.log(
    "User Storage - All user emails:",
    users.map((u) => u.email),
  )

  return user
}

export function findUserByEmail(email: string): User | null {
  const cleanEmail = email.toLowerCase().trim()
  const user = users.find((u) => u.email.toLowerCase() === cleanEmail)
  console.log("User Storage - Finding user by email:", cleanEmail, user ? "Found" : "Not found")
  console.log(
    "User Storage - Available emails:",
    users.map((u) => u.email),
  )
  return user || null
}

export function validateUserCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    // Update last login
    user.lastLogin = new Date()
    console.log("User Storage - Login successful for:", email)
    return user
  }
  console.log("User Storage - Login failed for:", email, user ? "Wrong password" : "User not found")
  return null
}

export function getAllUsers(): User[] {
  console.log("User Storage - Getting all users, count:", users.length)
  return users
}

export function getUserCount(): number {
  return users.length
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// For debugging - log current users
export function debugUsers() {
  console.log("=== USER STORAGE DEBUG ===")
  console.log("Total users:", users.length)
  console.log(
    "Current users:",
    users.map((u) => ({
      email: u.email,
      firstName: u.firstName,
      createdAt: u.createdAt,
      hasPassword: !!u.password,
    })),
  )
  console.log("========================")
}

// Main userStorage object with all functions
export const userStorage = {
  createUser,
  findUserByEmail,
  validateUserCredentials,
  getAllUsers,
  getUserCount,
  debugUsers,
}

// Default export for convenience
export default userStorage
