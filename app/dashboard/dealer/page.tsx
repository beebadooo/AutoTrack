"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, CheckCircle2, AlertCircle } from "lucide-react"
import DealerInventory from "@/components/dealer/dealer-inventory"
import DealerStats from "@/components/dealer/dealer-stats"
import SalesRecords from "@/components/dealer/sales-records"

export default function DealerDashboard() {
  const [activeTab, setActiveTab] = useState("inventory")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Dealer Portal</h1>
          </div>
          <Button variant="outline" size="sm">
            Disconnect Wallet
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <DealerStats />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="sales">Sales Records</TabsTrigger>
            <TabsTrigger value="conditions">Proof of Condition</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-6">
            <DealerInventory />
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <SalesRecords />
          </TabsContent>

          <TabsContent value="conditions" className="mt-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">Proof of Condition Records</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Vehicle condition documentation at time of sale
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      vin: "WBADT43452G915187",
                      vehicle: "2024 BMW 3 Series",
                      condition: "Excellent",
                      mileage: "12,450 km",
                      date: "2024-10-15",
                      status: "verified",
                    },
                    {
                      vin: "JTHBP5C20A5034921",
                      vehicle: "2023 Toyota Camry",
                      condition: "Good",
                      mileage: "28,900 km",
                      date: "2024-10-10",
                      status: "verified",
                    },
                    {
                      vin: "1HGCV1F32LA123456",
                      vehicle: "2023 Honda Accord",
                      condition: "Good",
                      mileage: "35,200 km",
                      date: "2024-10-05",
                      status: "pending",
                    },
                  ].map((record, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-border/40 rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{record.vehicle}</h4>
                        <p className="text-sm text-muted-foreground">VIN: {record.vin}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Condition: {record.condition}</span>
                          <span>Mileage: {record.mileage}</span>
                          <span>{record.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {record.status === "verified" ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-green-500">Verified</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm text-yellow-500">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/40 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-foreground">Sales Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border/40">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="text-2xl font-bold text-foreground">12 vehicles</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border/40">
                    <span className="text-muted-foreground">This Quarter</span>
                    <span className="text-2xl font-bold text-foreground">34 vehicles</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <span className="text-2xl font-bold text-foreground">$425,000</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-foreground">Inventory Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border/40">
                    <span className="text-muted-foreground">Average Days in Stock</span>
                    <span className="text-2xl font-bold text-foreground">18 days</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border/40">
                    <span className="text-muted-foreground">Turnover Rate</span>
                    <span className="text-2xl font-bold text-foreground">2.1x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg Profit Margin</span>
                    <span className="text-2xl font-bold text-foreground">8.5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
