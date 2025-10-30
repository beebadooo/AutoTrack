// GET /api/vehicles/owner - Get all vehicles owned by authenticated user
import { type NextRequest, NextResponse } from "next/server"
import { getVehiclesByOwner } from "@/lib/vehicles"
import { validateSession, getUserById } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 })
    }

    const userId = validateSession(token)
    if (!userId) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const user = getUserById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const vehicles = getVehiclesByOwner(user.walletAddress)

    return NextResponse.json(
      {
        success: true,
        vehicles: vehicles.map((v) => ({
          id: v.id,
          vin: v.vin,
          make: v.make,
          model: v.model,
          year: v.year,
          status: v.status,
          createdAt: v.createdAt,
        })),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get owner vehicles error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
