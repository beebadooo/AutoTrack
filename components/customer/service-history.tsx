"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench } from "lucide-react"

export default function ServiceHistory() {
  const services = [
    {
      date: "2024-10-15",
      type: "Regular Maintenance",
      provider: "Authorized Service Center",
      cost: "$150",
      items: ["Oil Change", "Filter Replacement", "Fluid Check"],
    },
    {
      date: "2024-08-20",
      type: "Inspection",
      provider: "Authorized Service Center",
      cost: "$50",
      items: ["Safety Inspection", "Brake Check"],
    },
    {
      date: "2024-06-10",
      type: "Regular Maintenance",
      provider: "Authorized Service Center",
      cost: "$200",
      items: ["Tire Rotation", "Alignment Check", "Suspension Inspection"],
    },
  ]

  return (
    <div className="space-y-4">
      {services.map((service, i) => (
        <Card key={i} className="border-border/40 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{service.type}</h4>
                  <p className="text-sm text-muted-foreground">{service.provider}</p>
                  <p className="text-xs text-muted-foreground mt-1">{service.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{service.cost}</p>
                <Badge className="mt-2 bg-green-500 hover:bg-green-600">Completed</Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.items.map((item, j) => (
                <Badge key={j} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
