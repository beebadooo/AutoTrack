"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

const ownershipTransfers = [
  {
    id: "OT001",
    vehicle: "Tesla Model 3",
    from: "John Doe",
    to: "Jane Smith",
    date: "2024-10-20",
    status: "completed",
  },
  {
    id: "OT002",
    vehicle: "BMW X5",
    from: "Mike Johnson",
    to: "Sarah Williams",
    date: "2024-10-22",
    status: "pending",
  },
]

const pucCertificates = [
  {
    id: "PUC001",
    vehicle: "Tesla Model 3",
    issueDate: "2024-09-15",
    expiryDate: "2025-09-15",
    status: "valid",
  },
  {
    id: "PUC002",
    vehicle: "BMW X5",
    issueDate: "2024-08-10",
    expiryDate: "2025-08-10",
    status: "expiring",
  },
]

export default function RTODashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">RTO & Government Portal</h1>
        <p className="text-muted-foreground mt-2">Manage ownership transfers, PUC, and compliance</p>
      </div>

      {/* Ownership Transfers */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ownership Transfers</CardTitle>
              <CardDescription>Vehicle ownership change records</CardDescription>
            </div>
            <Button>New Transfer</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ownershipTransfers.map((transfer) => (
              <div key={transfer.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{transfer.vehicle}</p>
                    <p className="text-sm text-muted-foreground">
                      {transfer.from} → {transfer.to}
                    </p>
                  </div>
                  <Badge
                    className={
                      transfer.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{transfer.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PUC Certificates */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>PUC Certificates</CardTitle>
              <CardDescription>Pollution Under Control certificates</CardDescription>
            </div>
            <Button>Issue Certificate</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Certificate ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Issue Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Expiry Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {pucCertificates.map((cert) => (
                  <tr key={cert.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground font-medium">{cert.id}</td>
                    <td className="py-3 px-4 text-foreground">{cert.vehicle}</td>
                    <td className="py-3 px-4 text-foreground">{cert.issueDate}</td>
                    <td className="py-3 px-4 text-foreground">{cert.expiryDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          cert.status === "valid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }
                      >
                        {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
          <CardDescription>Government compliance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-foreground">All vehicles registered</span>
              </div>
              <span className="text-sm font-semibold">156/156</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-foreground">PUC certificates valid</span>
              </div>
              <span className="text-sm font-semibold">142/156</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-foreground">Pending ownership transfers</span>
              </div>
              <span className="text-sm font-semibold">8</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
