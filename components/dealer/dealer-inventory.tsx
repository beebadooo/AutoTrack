"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, MapPin, Calendar } from "lucide-react"

export default function DealerInventory() {
  const inventory = [
    {
      id: "1",
      vin: "WBADT43452G915187",
      make: "BMW",
      model: "3 Series",
      year: 2024,
      mileage: "12,450 km",
      condition: "Excellent",
      price: "$45,000",
      daysInStock: 5,
      status: "available",
    },
    {
      id: "2",
      vin: "JTHBP5C20A5034921",
      make: "Toyota",
      model: "Camry",
      year: 2023,
      mileage: "28,900 km",
      condition: "Good",
      price: "$28,500",
      daysInStock: 12,
      status: "available",
    },
    {
      id: "3",
      vin: "1HGCV1F32LA123456",
      make: "Honda",
      model: "Accord",
      year: 2023,
      mileage: "35,200 km",
      condition: "Good",
      price: "$26,000",
      daysInStock: 18,
      status: "pending_inspection",
    },
    {
      id: "4",
      vin: "5TDJKRFH8LS123456",
      make: "Toyota",
      model: "Highlander",
      year: 2022,
      mileage: "42,100 km",
      condition: "Fair",
      price: "$32,000",
      daysInStock: 25,
      status: "available",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500 hover:bg-green-600"
      case "pending_inspection":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "sold":
        return "bg-gray-500 hover:bg-gray-600"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  return (
    <div className="space-y-4">
      {inventory.map((vehicle) => (
        <Card
          key={vehicle.id}
          className="border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-all"
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm text-muted-foreground">VIN: {vehicle.vin}</p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{vehicle.mileage}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{vehicle.daysInStock} days in stock</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-3">
                <div>
                  <p className="text-2xl font-bold text-foreground">{vehicle.price}</p>
                  <Badge variant="outline" className="mt-1">
                    {vehicle.condition}
                  </Badge>
                </div>
                <Badge className={getStatusColor(vehicle.status)}>
                  {vehicle.status === "pending_inspection" ? "Pending Inspection" : "Available"}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
