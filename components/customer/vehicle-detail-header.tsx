"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, Calendar } from "lucide-react"

export default function VehicleDetailHeader() {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">2024 BMW 3 Series</h1>
              <p className="text-muted-foreground mt-1">VIN: WBADT43452G915187</p>
              <div className="flex gap-2 mt-3">
                <Badge className="bg-blue-500 hover:bg-blue-600">Active</Badge>
                <Badge variant="outline">Owned 9 months</Badge>
              </div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 justify-end text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Registered</span>
            </div>
            <div className="flex items-center gap-2 justify-end text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Since Feb 2024</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
