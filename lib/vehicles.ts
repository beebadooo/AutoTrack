// Vehicle management utilities
import crypto from "crypto"

export interface Vehicle {
  id: string
  vin: string
  make: string
  model: string
  year: number
  ownerWallet: string
  manufacturerWallet: string
  currentOwner: string
  status: "manufactured" | "in_transit" | "sold" | "in_service" | "retired"
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, any>
}

export interface VehicleRecord {
  id: string
  vehicleId: string
  recordType: "damage" | "service" | "ownership_transfer" | "inspection" | "insurance_claim"
  recordedBy: string
  timestamp: Date
  details: Record<string, any>
  blockchainHash?: string
}

// In-memory storage (replace with database in production)
const vehicles = new Map<string, Vehicle>()
const vehicleRecords = new Map<string, VehicleRecord[]>()

export function registerVehicle(
  vin: string,
  make: string,
  model: string,
  year: number,
  manufacturerWallet: string,
): Vehicle {
  const vehicle: Vehicle = {
    id: crypto.randomUUID(),
    vin,
    make,
    model,
    year,
    ownerWallet: manufacturerWallet,
    manufacturerWallet,
    currentOwner: manufacturerWallet,
    status: "manufactured",
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {},
  }
  vehicles.set(vehicle.id, vehicle)
  vehicleRecords.set(vehicle.id, [])
  return vehicle
}

export function getVehicle(vehicleId: string): Vehicle | undefined {
  return vehicles.get(vehicleId)
}

export function getVehicleByVIN(vin: string): Vehicle | undefined {
  return Array.from(vehicles.values()).find((v) => v.vin === vin)
}

export function getVehiclesByOwner(ownerWallet: string): Vehicle[] {
  return Array.from(vehicles.values()).filter((v) => v.currentOwner === ownerWallet.toLowerCase())
}

export function transferVehicleOwnership(
  vehicleId: string,
  newOwnerWallet: string,
  transferredBy: string,
): Vehicle | null {
  const vehicle = vehicles.get(vehicleId)
  if (!vehicle) return null

  vehicle.ownerWallet = newOwnerWallet.toLowerCase()
  vehicle.currentOwner = newOwnerWallet.toLowerCase()
  vehicle.updatedAt = new Date()
  vehicles.set(vehicleId, vehicle)

  addVehicleRecord(vehicleId, "ownership_transfer", transferredBy, {
    previousOwner: vehicle.ownerWallet,
    newOwner: newOwnerWallet.toLowerCase(),
  })

  return vehicle
}

export function updateVehicleStatus(vehicleId: string, status: Vehicle["status"], updatedBy: string): Vehicle | null {
  const vehicle = vehicles.get(vehicleId)
  if (!vehicle) return null

  vehicle.status = status
  vehicle.updatedAt = new Date()
  vehicles.set(vehicleId, vehicle)

  addVehicleRecord(vehicleId, "inspection", updatedBy, { newStatus: status })

  return vehicle
}

export function addVehicleRecord(
  vehicleId: string,
  recordType: VehicleRecord["recordType"],
  recordedBy: string,
  details: Record<string, any>,
): VehicleRecord {
  const record: VehicleRecord = {
    id: crypto.randomUUID(),
    vehicleId,
    recordType,
    recordedBy,
    timestamp: new Date(),
    details,
  }

  const records = vehicleRecords.get(vehicleId) || []
  records.push(record)
  vehicleRecords.set(vehicleId, records)

  return record
}

export function getVehicleHistory(vehicleId: string): VehicleRecord[] {
  return vehicleRecords.get(vehicleId) || []
}
