// Authentication utilities
import crypto from "crypto"

export interface User {
  id: string
  walletAddress: string
  email?: string
  role: "customer" | "manufacturer" | "dealer" | "insurance" | "service" | "rto"
  createdAt: Date
  lastLogin?: Date
}

export interface AuthToken {
  token: string
  expiresAt: Date
}

// In-memory storage (replace with database in production)
const users = new Map<string, User>()
const sessions = new Map<string, { userId: string; expiresAt: Date }>()

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function createUser(walletAddress: string, role: User["role"], email?: string): User {
  const user: User = {
    id: crypto.randomUUID(),
    walletAddress: walletAddress.toLowerCase(),
    email,
    role,
    createdAt: new Date(),
  }
  users.set(user.id, user)
  return user
}

export function getUserByWallet(walletAddress: string): User | undefined {
  return Array.from(users.values()).find((u) => u.walletAddress === walletAddress.toLowerCase())
}

export function getUserById(userId: string): User | undefined {
  return users.get(userId)
}

export function createSession(userId: string, expiresIn: number = 7 * 24 * 60 * 60 * 1000): AuthToken {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + expiresIn)
  sessions.set(token, { userId, expiresAt })
  return { token, expiresAt }
}

export function validateSession(token: string): string | null {
  const session = sessions.get(token)
  if (!session) return null
  if (session.expiresAt < new Date()) {
    sessions.delete(token)
    return null
  }
  return session.userId
}

export function revokeSession(token: string): void {
  sessions.delete(token)
}
