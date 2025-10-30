// POST /api/auth/login - Login with wallet address
import { type NextRequest, NextResponse } from "next/server"
import { getUserByWallet, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ error: "Missing required field: walletAddress" }, { status: 400 })
    }

    // Find user by wallet
    const user = getUserByWallet(walletAddress)
    if (!user) {
      return NextResponse.json({ error: "User not found. Please register first." }, { status: 404 })
    }

    // Create session
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
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
