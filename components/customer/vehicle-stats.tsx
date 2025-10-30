"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Car, Wrench, AlertCircle, TrendingUp } from "lucide-react"

export default function VehicleStats() {
  const stats = [
    {
      label: "Total Vehicles",
      value: "2",
      icon: Car,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Services Completed",
      value: "8",
      icon: Wrench,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Active Issues",
      value: "1",
      icon: AlertCircle,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Fleet Health",
      value: "95%",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="border-border/40 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
