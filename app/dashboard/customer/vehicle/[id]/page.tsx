"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import VehicleDetailHeader from "@/components/customer/vehicle-detail-header"
import ServiceHistory from "@/components/customer/service-history"
import DamageRecords from "@/components/customer/damage-records"

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard/customer" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Vehicles</span>
          </Link>
          <Button variant="outline" size="sm">
            Share Vehicle Info
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VehicleDetailHeader />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="service">Service History</TabsTrigger>
            <TabsTrigger value="damage">Damage Records</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/40 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-foreground">Vehicle Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "VIN", value: "WBADT43452G915187" },
                    { label: "Engine Number", value: "N52B30A" },
                    { label: "Chassis Number", value: "WBADT43452G915187" },
                    { label: "Color", value: "Alpine White" },
                    { label: "Manufactured Date", value: "2024-01-15" },
                    { label: "Registration Date", value: "2024-02-01" },
                  ].map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0"
                    >
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-foreground">Current Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <span className="text-foreground font-medium">Overall Health</span>
                    <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mileage</span>
                      <span className="font-medium text-foreground">12,450 km</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Service</span>
                      <span className="font-medium text-foreground">2024-10-15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Service</span>
                      <span className="font-medium text-foreground">2025-04-15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Warranty Status</span>
                      <span className="font-medium text-foreground">Active (24 months)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="service" className="mt-6">
            <ServiceHistory />
          </TabsContent>

          <TabsContent value="damage" className="mt-6">
            <DamageRecords />
          </TabsContent>

          <TabsContent value="insurance" className="mt-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">Insurance Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Current insurance policy and claims history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-border/40 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">Active Policy</h4>
                      <p className="text-sm text-muted-foreground">Policy #: INS-2024-001234</p>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider</span>
                      <span className="text-foreground">Premium Insurance Co.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage Type</span>
                      <span className="text-foreground">Comprehensive</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valid Until</span>
                      <span className="text-foreground">2025-02-01</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
