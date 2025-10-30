// POST /api/vehicles/register - Register a new vehicle
import { type NextRequest, NextResponse } from "next/server"
import { registerVehicle } from "@/lib/vehicles"
import { validateSession, getUserById } from "@/lib/auth"

export async function POST(request: NextRequest) {
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
    if (!user || user.role !== "manufacturer") {
      return NextResponse.json({ error: "Only manufacturers can register vehicles" }, { status: 403 })
    }

    const { vin, make, model, year } = await request.json()

    if (!vin || !make || !model || !year) {
      return NextResponse.json({ error: "Missing required fields: vin, make, model, year" }, { status: 400 })
    }

    const vehicle = registerVehicle(vin, make, model, year, user.walletAddress)

    return NextResponse.json(
      {
        success: true,
        vehicle: {
          id: vehicle.id,
          vin: vehicle.vin,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          status: vehicle.status,
          createdAt: vehicle.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Vehicle registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
