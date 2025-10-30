// GET /api/vehicles/[id] - Get vehicle details
import { type NextRequest, NextResponse } from "next/server"
import { getVehicle, getVehicleHistory } from "@/lib/vehicles"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const vehicle = getVehicle(id)

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }

    const history = getVehicleHistory(id)

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
          currentOwner: vehicle.currentOwner,
          createdAt: vehicle.createdAt,
          updatedAt: vehicle.updatedAt,
        },
        history: history.map((record) => ({
          id: record.id,
          recordType: record.recordType,
          timestamp: record.timestamp,
          details: record.details,
        })),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get vehicle error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
