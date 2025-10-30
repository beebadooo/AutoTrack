// POST /api/auth/register - Register a new user with wallet
import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUserByWallet, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, role, email } = await request.json()

    if (!walletAddress || !role) {
      return NextResponse.json({ error: "Missing required fields: walletAddress, role" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = getUserByWallet(walletAddress)
    if (existingUser) {
      return NextResponse.json({ error: "User already registered with this wallet" }, { status: 409 })
    }

    // Create new user
    const user = createUser(walletAddress, role, email)
    const { token, expiresAt } = createSession(user.id)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          role: user.role,
          email: user.email,
        },
        token,
        expiresAt,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
