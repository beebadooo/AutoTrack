"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Plus, Factory, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

export default function ManufacturerDashboard() {
  const navItems = [
    { label: "Dashboard", href: "/dashboard/manufacturer", icon: Factory },
    { label: "Register Vehicle", href: "/dashboard/manufacturer/register", icon: Plus },
    { label: "Quality Checks", href: "/dashboard/manufacturer/quality", icon: CheckCircle2 },
    { label: "Recalls", href: "/dashboard/manufacturer/recalls", icon: AlertCircle },
  ]

  return (
    <DashboardLayout title="Manufacturer Portal" role="Manufacturer" navItems={navItems}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Vehicles Registered", value: "1,234", icon: Factory },
            { label: "Quality Checks", value: "98%", icon: CheckCircle2 },
            { label: "Active Recalls", value: "3", icon: AlertCircle },
            { label: "This Month", value: "156", icon: TrendingUp },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="border-border/40 bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className="w-8 h-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Register New Vehicle */}
        <Card className="border-border/40 bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground">Register New Vehicle</CardTitle>
            <CardDescription>Create digital identity for a new vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">VIN</label>
                  <input
                    type="text"
                    placeholder="Vehicle Identification Number"
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Make</label>
                  <input
                    type="text"
                    placeholder="e.g., Tesla"
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Model</label>
                  <input
                    type="text"
                    placeholder="e.g., Model 3"
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                  <input
                    type="number"
                    placeholder="2025"
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Register Vehicle on Blockchain</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        <Card className="border-border/40 bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { vin: "TESLA001", make: "Tesla", model: "Model 3", year: 2025, date: "2025-01-20" },
                { vin: "BMW001", make: "BMW", model: "X5", year: 2025, date: "2025-01-19" },
                { vin: "AUDI001", make: "Audi", model: "A4", year: 2025, date: "2025-01-18" },
              ].map((vehicle, i) => (
                <div key={i} className="border border-border/40 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-sm text-muted-foreground">VIN: {vehicle.vin}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{vehicle.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
