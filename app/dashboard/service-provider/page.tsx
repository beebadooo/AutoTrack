"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"

const appointments = [
  {
    id: "APT001",
    customer: "John Doe",
    vehicle: "Tesla Model 3",
    service: "Regular Maintenance",
    date: "2024-10-25",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "APT002",
    customer: "Jane Smith",
    vehicle: "BMW X5",
    service: "Oil Change",
    date: "2024-10-26",
    time: "2:00 PM",
    status: "pending",
  },
  {
    id: "APT003",
    customer: "Mike Johnson",
    vehicle: "Audi A4",
    service: "Brake Inspection",
    date: "2024-10-24",
    time: "11:00 AM",
    status: "completed",
  },
]

const serviceRecords = [
  {
    id: "SR001",
    vehicle: "Tesla Model 3",
    service: "Regular Maintenance",
    date: "2024-10-20",
    cost: 5000,
    verified: true,
  },
  {
    id: "SR002",
    vehicle: "BMW X5",
    service: "Oil Change",
    date: "2024-10-18",
    cost: 3000,
    verified: true,
  },
  {
    id: "SR003",
    vehicle: "Audi A4",
    service: "Brake Inspection",
    date: "2024-10-15",
    cost: 4500,
    verified: false,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />
    case "pending":
      return <Clock className="w-4 h-4" />
    case "completed":
      return <CheckCircle className="w-4 h-4" />
    default:
      return null
  }
}

export default function ServiceProviderDashboard() {
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)

  const stats = [
    { label: "Total Appointments", value: "156", icon: "📅" },
    { label: "Completed Services", value: "142", icon: "✓" },
    { label: "Pending Verification", value: "8", icon: "⏳" },
    { label: "Avg Rating", value: "4.8/5", icon: "⭐" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Service Provider Portal</h1>
        <p className="text-muted-foreground mt-2">Manage appointments, service records, and RTO integration</p>
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

      {/* Appointments Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Scheduled service appointments</CardDescription>
            </div>
            <Button>Schedule New</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">{apt.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {apt.vehicle} • {apt.service}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {apt.date} at {apt.time}
                    </p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(apt.status)} flex items-center gap-1`}>
                  {getStatusIcon(apt.status)}
                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Records Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Service Records</CardTitle>
              <CardDescription>Blockchain-verified service history</CardDescription>
            </div>
            <Button>Add Record</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Record ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Service Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Cost</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedRecord(record.id)}
                  >
                    <td className="py-3 px-4 text-foreground font-medium">{record.id}</td>
                    <td className="py-3 px-4 text-foreground">{record.vehicle}</td>
                    <td className="py-3 px-4 text-foreground">{record.service}</td>
                    <td className="py-3 px-4 text-foreground">{record.date}</td>
                    <td className="py-3 px-4 text-foreground font-semibold">₹{record.cost.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={record.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                      >
                        {record.verified ? "Verified" : "Pending"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* RTO Integration Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>RTO Integration</CardTitle>
          <CardDescription>Government compliance and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-foreground">PUC Certificates</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Pollution Under Control certificates</p>
              <Button variant="outline" className="w-full bg-transparent">
                Manage PUC
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-foreground">Challans</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Traffic violations and fines</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Challans
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-foreground">Ownership Transfer</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">RTO ownership documentation</p>
              <Button variant="outline" className="w-full bg-transparent">
                Process Transfer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Record Details */}
      {selectedRecord && (
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardHeader>
            <CardTitle>Service Record Details: {selectedRecord}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Service Type</p>
                <p className="text-lg font-semibold">Regular Maintenance</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost</p>
                <p className="text-lg font-semibold">₹5,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blockchain Hash</p>
                <p className="text-xs font-mono">0x7f8a9b2c...</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verification Status</p>
                <Badge className="bg-green-100 text-green-800">Verified</Badge>
              </div>
            </div>
            <Button className="mt-4" onClick={() => setSelectedRecord(null)}>
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
