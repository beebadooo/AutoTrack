"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Plus, Factory, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

interface FormData {
  vin: string
  make: string
  model: string
  year: string
  color: string
  bodyType: string
  engineType: string
  transmission: string
  fuelType: string
  seatingCapacity: string
  manufacturingDate: string
  specifications: string
}

interface RegistrationResponse {
  success: boolean
  vehicle?: {
    id: string
    vin: string
    make: string
    model: string
    year: number
    status: string
    createdAt: string
  }
  error?: string
}

export default function RegisterVehiclePage() {
  const [formData, setFormData] = useState<FormData>({
    vin: "",
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    color: "",
    bodyType: "sedan",
    engineType: "petrol",
    transmission: "automatic",
    fuelType: "petrol",
    seatingCapacity: "5",
    manufacturingDate: "",
    specifications: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [registeredVehicle, setRegisteredVehicle] = useState<RegistrationResponse["vehicle"]>(null)

  const navItems = [
    { label: "Dashboard", href: "/dashboard/manufacturer", icon: Factory },
    { label: "Register Vehicle", href: "/dashboard/manufacturer/register", icon: Plus },
    { label: "Quality Checks", href: "/dashboard/manufacturer/quality", icon: CheckCircle2 },
    { label: "Recalls", href: "/dashboard/manufacturer/recalls", icon: AlertCircle },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.vin.trim()) {
      setError("VIN is required")
      return false
    }
    if (formData.vin.length < 17) {
      setError("VIN must be at least 17 characters")
      return false
    }
    if (!formData.make.trim()) {
      setError("Make is required")
      return false
    }
    if (!formData.model.trim()) {
      setError("Model is required")
      return false
    }
    if (!formData.year) {
      setError("Year is required")
      return false
    }
    const year = Number.parseInt(formData.year)
    if (year < 1900 || year > new Date().getFullYear() + 1) {
      setError("Invalid year")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/vehicles/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
        body: JSON.stringify({
          vin: formData.vin.toUpperCase(),
          make: formData.make,
          model: formData.model,
          year: Number.parseInt(formData.year),
          color: formData.color,
          bodyType: formData.bodyType,
          engineType: formData.engineType,
          transmission: formData.transmission,
          fuelType: formData.fuelType,
          seatingCapacity: Number.parseInt(formData.seatingCapacity),
          manufacturingDate: formData.manufacturingDate,
          specifications: formData.specifications,
        }),
      })

      const data: RegistrationResponse = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to register vehicle")
        return
      }

      setSuccess(true)
      setRegisteredVehicle(data.vehicle)
      setFormData({
        vin: "",
        make: "",
        model: "",
        year: new Date().getFullYear().toString(),
        color: "",
        bodyType: "sedan",
        engineType: "petrol",
        transmission: "automatic",
        fuelType: "petrol",
        seatingCapacity: "5",
        manufacturingDate: "",
        specifications: "",
      })

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError("An error occurred while registering the vehicle")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title="Register New Vehicle" role="Manufacturer" navItems={navItems}>
      <div className="space-y-6">
        {/* Success Message */}
        {success && registeredVehicle && (
          <Card className="border-green-500/50 bg-green-500/10 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-700 dark:text-green-400">Vehicle Registered Successfully!</h3>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                    {registeredVehicle.year} {registeredVehicle.make} {registeredVehicle.model} (VIN:{" "}
                    {registeredVehicle.vin})
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300 mt-2">Vehicle ID: {registeredVehicle.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Card className="border-red-500/50 bg-red-500/10 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-700 dark:text-red-400">Registration Error</h3>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Registration Form */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Vehicle Registration Form</CardTitle>
            <CardDescription className="text-muted-foreground">
              Register a new vehicle on the blockchain. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vin" className="text-foreground">
                      VIN (Vehicle Identification Number) *
                    </Label>
                    <Input
                      id="vin"
                      name="vin"
                      placeholder="e.g., WBADT43452G915187"
                      value={formData.vin}
                      onChange={handleInputChange}
                      className="mt-2 uppercase"
                      maxLength={17}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Must be exactly 17 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="make" className="text-foreground">
                      Make (Manufacturer) *
                    </Label>
                    <Input
                      id="make"
                      name="make"
                      placeholder="e.g., BMW, Tesla, Toyota"
                      value={formData.make}
                      onChange={handleInputChange}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="model" className="text-foreground">
                      Model *
                    </Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="e.g., 3 Series, Model 3, Camry"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="year" className="text-foreground">
                      Year *
                    </Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      placeholder="2025"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="mt-2"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="color" className="text-foreground">
                      Color
                    </Label>
                    <Input
                      id="color"
                      name="color"
                      placeholder="e.g., Black, Silver, White"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="manufacturingDate" className="text-foreground">
                      Manufacturing Date
                    </Label>
                    <Input
                      id="manufacturingDate"
                      name="manufacturingDate"
                      type="date"
                      value={formData.manufacturingDate}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Specifications Section */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bodyType" className="text-foreground">
                      Body Type
                    </Label>
                    <select
                      id="bodyType"
                      name="bodyType"
                      value={formData.bodyType}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="coupe">Coupe</option>
                      <option value="wagon">Wagon</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                      <option value="convertible">Convertible</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="engineType" className="text-foreground">
                      Engine Type
                    </Label>
                    <select
                      id="engineType"
                      name="engineType"
                      value={formData.engineType}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="cng">CNG</option>
                      <option value="lpg">LPG</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="transmission" className="text-foreground">
                      Transmission
                    </Label>
                    <select
                      id="transmission"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="manual">Manual</option>
                      <option value="automatic">Automatic</option>
                      <option value="cvt">CVT</option>
                      <option value="semi-automatic">Semi-Automatic</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="fuelType" className="text-foreground">
                      Fuel Type
                    </Label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="cng">CNG</option>
                      <option value="lpg">LPG</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="seatingCapacity" className="text-foreground">
                      Seating Capacity
                    </Label>
                    <Input
                      id="seatingCapacity"
                      name="seatingCapacity"
                      type="number"
                      placeholder="5"
                      value={formData.seatingCapacity}
                      onChange={handleInputChange}
                      className="mt-2"
                      min="1"
                      max="9"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Additional Details</h3>
                <div>
                  <Label htmlFor="specifications" className="text-foreground">
                    Technical Specifications & Notes
                  </Label>
                  <textarea
                    id="specifications"
                    name="specifications"
                    placeholder="Enter any additional technical specifications, features, or notes about this vehicle..."
                    value={formData.specifications}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground min-h-24 resize-none"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-border/40">
                <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Register Vehicle on Blockchain
                    </>
                  )}
                </Button>
                <Link href="/dashboard/manufacturer" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground text-base">About Vehicle Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Each vehicle receives a unique digital identity on the blockchain from the factory gate</p>
            <p>• The VIN (Vehicle Identification Number) is the primary identifier and must be unique</p>
            <p>• All vehicle data is immutable and tamper-proof once registered</p>
            <p>• This registration creates the foundation for tracking the vehicle throughout its lifecycle</p>
            <p>• Quality checks, recalls, and ownership transfers will be recorded against this registration</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
