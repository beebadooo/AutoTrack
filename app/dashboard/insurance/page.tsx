"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

const claimsData = [
  {
    id: "CLM001",
    customer: "John Doe",
    vehicle: "Tesla Model 3",
    amount: 45000,
    status: "approved",
    date: "2024-10-15",
    type: "accident",
  },
  {
    id: "CLM002",
    customer: "Jane Smith",
    vehicle: "BMW X5",
    amount: 32000,
    status: "pending",
    date: "2024-10-18",
    type: "damage",
  },
  {
    id: "CLM003",
    customer: "Mike Johnson",
    vehicle: "Audi A4",
    amount: 28000,
    status: "rejected",
    date: "2024-10-10",
    type: "fraud",
  },
  {
    id: "CLM004",
    customer: "Sarah Williams",
    vehicle: "Mercedes C-Class",
    amount: 55000,
    status: "approved",
    date: "2024-10-12",
    type: "accident",
  },
]

const drivingBehaviorData = [
  { month: "Jan", safeScore: 85, riskScore: 15 },
  { month: "Feb", safeScore: 88, riskScore: 12 },
  { month: "Mar", safeScore: 82, riskScore: 18 },
  { month: "Apr", safeScore: 90, riskScore: 10 },
  { month: "May", safeScore: 87, riskScore: 13 },
  { month: "Jun", safeScore: 92, riskScore: 8 },
]

const claimTypeDistribution = [
  { name: "Accident", value: 45, color: "#ef4444" },
  { name: "Damage", value: 30, color: "#f97316" },
  { name: "Theft", value: 15, color: "#eab308" },
  { name: "Other", value: 10, color: "#22c55e" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-4 h-4" />
    case "pending":
      return <Clock className="w-4 h-4" />
    case "rejected":
      return <AlertCircle className="w-4 h-4" />
    default:
      return null
  }
}

export default function InsuranceDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)

  const stats = [
    { label: "Total Claims", value: "24", icon: "📋", color: "from-blue-500 to-blue-600" },
    { label: "Approved", value: "18", icon: "✓", color: "from-green-500 to-green-600" },
    { label: "Pending", value: "4", icon: "⏳", color: "from-yellow-500 to-yellow-600" },
    { label: "Avg Safe Score", value: "88%", icon: "📊", color: "from-purple-500 to-purple-600" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Insurance & Claims</h1>
        <p className="text-muted-foreground mt-2">Manage claims, track driving behavior, and assess risk</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driving Behavior Trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Driving Behavior Trend</CardTitle>
            <CardDescription>Safe vs Risk Score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                safeScore: { label: "Safe Score", color: "#22c55e" },
                riskScore: { label: "Risk Score", color: "#ef4444" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={drivingBehaviorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="safeScore" stroke="#22c55e" name="Safe Score" />
                  <Line type="monotone" dataKey="riskScore" stroke="#ef4444" name="Risk Score" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Claim Type Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Claim Type Distribution</CardTitle>
            <CardDescription>Breakdown of claim types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                accident: { label: "Accident", color: "#ef4444" },
                damage: { label: "Damage", color: "#f97316" },
                theft: { label: "Theft", color: "#eab308" },
                other: { label: "Other", color: "#22c55e" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={claimTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {claimTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Claims Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>All insurance claims and their status</CardDescription>
            </div>
            <Button>New Claim</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Claim ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {claimsData.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedClaim(claim.id)}
                  >
                    <td className="py-3 px-4 text-foreground font-medium">{claim.id}</td>
                    <td className="py-3 px-4 text-foreground">{claim.customer}</td>
                    <td className="py-3 px-4 text-foreground">{claim.vehicle}</td>
                    <td className="py-3 px-4 text-foreground capitalize">{claim.type}</td>
                    <td className="py-3 px-4 text-foreground font-semibold">₹{claim.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(claim.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(claim.status)}
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{claim.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Claim Details Modal */}
      {selectedClaim && (
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardHeader>
            <CardTitle>Claim Details: {selectedClaim}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Claim Amount</p>
                <p className="text-lg font-semibold">₹45,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Driving Score</p>
                <p className="text-lg font-semibold">92%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fraud Risk</p>
                <p className="text-lg font-semibold">Low</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recommendation</p>
                <p className="text-lg font-semibold">Approve</p>
              </div>
            </div>
            <Button className="mt-4" onClick={() => setSelectedClaim(null)}>
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
