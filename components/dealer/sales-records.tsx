"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Calendar } from "lucide-react"

export default function SalesRecords() {
  const sales = [
    {
      id: "1",
      vehicle: "2024 BMW 3 Series",
      vin: "WBADT43452G915187",
      customer: "John Smith",
      saleDate: "2024-10-15",
      salePrice: "$45,000",
      profit: "$3,600",
      status: "completed",
    },
    {
      id: "2",
      vehicle: "2023 Toyota Camry",
      vin: "JTHBP5C20A5034921",
      customer: "Sarah Johnson",
      saleDate: "2024-10-12",
      salePrice: "$28,500",
      profit: "$2,100",
      status: "completed",
    },
    {
      id: "3",
      vehicle: "2023 Honda Accord",
      vin: "1HGCV1F32LA123456",
      customer: "Michael Chen",
      saleDate: "2024-10-08",
      salePrice: "$26,000",
      profit: "$1,800",
      status: "completed",
    },
    {
      id: "4",
      vehicle: "2022 Toyota Highlander",
      vin: "5TDJKRFH8LS123456",
      customer: "Emily Davis",
      saleDate: "2024-10-01",
      salePrice: "$32,000",
      profit: "$2,400",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-4">
      {sales.map((sale) => (
        <Card key={sale.id} className="border-border/40 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{sale.vehicle}</h3>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">VIN: {sale.vin}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium text-foreground">{sale.customer}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sale Date</p>
                    <div className="flex items-center gap-1 font-medium text-foreground">
                      <Calendar className="w-4 h-4" />
                      {sale.saleDate}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sale Price</p>
                    <p className="font-medium text-foreground">{sale.salePrice}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Profit</p>
                    <p className="font-medium text-green-500">{sale.profit}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
