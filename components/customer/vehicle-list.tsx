"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, AlertCircle, CheckCircle2 } from "lucide-react"

export default function VehicleList() {
  // Mock data - replace with actual API call
  const vehicles = [
    {
      id: "1",
      vin: "WBADT43452G915187",
      make: "BMW",
      model: "3 Series",
      year: 2024,
      status: "active",
      lastService: "2024-10-15",
      nextService: "2025-04-15",
      issues: 0,
    },
    {
      id: "2",
      vin: "JTHBP5C20A5034921",
      make: "Toyota",
      model: "Camry",
      year: 2023,
      status: "active",
      lastService: "2024-09-20",
      nextService: "2025-03-20",
      issues: 1,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.id} href={`/dashboard/customer/vehicle/${vehicle.id}`}>
          <Card className="border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-all cursor-pointer h-full hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <Badge variant={vehicle.status === "active" ? "default" : "secondary"}>{vehicle.status}</Badge>
              </div>
              <CardTitle className="text-foreground">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </CardTitle>
              <CardDescription className="text-muted-foreground">VIN: {vehicle.vin}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last Service</span>
                  <span className="text-foreground font-medium">{vehicle.lastService}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Next Service Due</span>
                  <span className="text-foreground font-medium">{vehicle.nextService}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                  {vehicle.issues > 0 ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-destructive">{vehicle.issues} issue(s) detected</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">All systems normal</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
