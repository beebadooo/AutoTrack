"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const dashboards = [
  {
    id: "customer",
    title: "Customer Dashboard",
    description: "View your vehicles, service history, and insurance details",
    icon: "🚗",
    href: "/dashboard/customer",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "manufacturer",
    title: "Manufacturer Portal",
    description: "Track vehicle production, quality checks, and recalls",
    icon: "🏭",
    href: "/dashboard/manufacturer",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "dealer",
    title: "Dealer Dashboard",
    description: "Manage inventory, sales, and vehicle conditions",
    icon: "🏪",
    href: "/dashboard/dealer",
    color: "from-green-500 to-green-600",
  },
  {
    id: "insurance",
    title: "Insurance Portal",
    description: "Process claims, assess risk, and manage policies",
    icon: "📋",
    href: "/dashboard/insurance",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "service",
    title: "Service Provider",
    description: "Manage appointments, service records, and RTO integration",
    icon: "🔧",
    href: "/dashboard/service-provider",
    color: "from-red-500 to-red-600",
  },
  {
    id: "rto",
    title: "RTO Portal",
    description: "Government compliance, ownership transfers, and PUC",
    icon: "🏛️",
    href: "/dashboard/rto",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Driving behavior analysis and performance metrics",
    icon: "📊",
    href: "/dashboard/analytics",
    color: "from-pink-500 to-pink-600",
  },
]

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">AutoTrack</h1>
          <p className="text-lg text-muted-foreground">Blockchain-Powered Unified Car Lifecycle Management</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard) => (
            <Card
              key={dashboard.id}
              className="border-0 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(dashboard.href)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{dashboard.icon}</div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">{dashboard.title}</CardTitle>
                <CardDescription>{dashboard.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => router.push(dashboard.href)}>
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Blockchain Security</h3>
            <p className="text-sm text-muted-foreground">Tamper-proof records on Polygon/Ethereum blockchain</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Multi-Stakeholder</h3>
            <p className="text-sm text-muted-foreground">Unified platform for all car lifecycle participants</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Real-Time Analytics</h3>
            <p className="text-sm text-muted-foreground">Driving behavior tracking and performance metrics</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Transparent History</h3>
            <p className="text-sm text-muted-foreground">Complete vehicle history from factory to customer</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Smart Claims</h3>
            <p className="text-sm text-muted-foreground">Automated insurance claims with verified data</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Government Integration</h3>
            <p className="text-sm text-muted-foreground">RTO compliance and regulatory documentation</p>
          </div>
        </div>
      </div>
    </div>
  )
}
