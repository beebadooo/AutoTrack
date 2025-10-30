"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

export default function DamageRecords() {
  const damages = [
    {
      date: "2024-09-05",
      type: "Minor Scratch",
      severity: "minor",
      location: "Front Bumper",
      status: "repaired",
      cost: "$200",
    },
    {
      date: "2024-07-12",
      type: "Dent",
      severity: "moderate",
      location: "Driver Side Door",
      status: "repaired",
      cost: "$500",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minor":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "moderate":
        return "bg-orange-500 hover:bg-orange-600"
      case "severe":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="space-y-4">
      {damages.length > 0 ? (
        damages.map((damage, i) => (
          <Card key={i} className="border-border/40 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getSeverityColor(damage.severity)} flex items-center justify-center flex-shrink-0`}
                  >
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{damage.type}</h4>
                    <p className="text-sm text-muted-foreground">{damage.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">{damage.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{damage.cost}</p>
                  <Badge className="mt-2 bg-green-500 hover:bg-green-600">
                    {damage.status.charAt(0).toUpperCase() + damage.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No damage records found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
