"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, FileText, Shield, Clock } from "lucide-react"
import VehicleList from "@/components/customer/vehicle-list"
import VehicleStats from "@/components/customer/vehicle-stats"

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">My Vehicles</h1>
          </div>
          <Button variant="outline" size="sm">
            Disconnect Wallet
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <VehicleStats />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">My Vehicles</TabsTrigger>
            <TabsTrigger value="history">Full History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <VehicleList />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">Complete Vehicle History</CardTitle>
                <CardDescription className="text-muted-foreground">
                  All records from factory to current ownership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Manufactured",
                      date: "2024-01-15",
                      location: "Factory A",
                      icon: Car,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      type: "Quality Check Passed",
                      date: "2024-01-16",
                      location: "Quality Assurance",
                      icon: Shield,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      type: "Shipped to Dealer",
                      date: "2024-01-20",
                      location: "Dealer Network",
                      icon: Clock,
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      type: "Sold to Customer",
                      date: "2024-02-01",
                      location: "Dealership",
                      icon: FileText,
                      color: "from-orange-500 to-red-500",
                    },
                  ].map((event, i) => {
                    const Icon = event.icon
                    return (
                      <div key={i} className="flex gap-4 pb-4 border-b border-border/40 last:border-0">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{event.type}</h4>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">Important Documents</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Ownership certificates, service records, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Ownership Certificate", date: "2024-02-01", type: "Certificate" },
                    { name: "Service History", date: "2024-10-15", type: "Report" },
                    { name: "Insurance Policy", date: "2024-02-01", type: "Policy" },
                    { name: "Warranty Document", date: "2024-02-01", type: "Warranty" },
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-border/40 rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
