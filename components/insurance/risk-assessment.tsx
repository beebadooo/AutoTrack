"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react"

interface RiskAssessmentProps {
  customerId: string
  drivingScore: number
  accidentHistory: number
  claimHistory: number
  vehicleAge: number
}

export function RiskAssessment({
  customerId,
  drivingScore,
  accidentHistory,
  claimHistory,
  vehicleAge,
}: RiskAssessmentProps) {
  const calculateRiskLevel = () => {
    let riskScore = 0
    riskScore += (100 - drivingScore) * 0.4
    riskScore += accidentHistory * 5
    riskScore += claimHistory * 3
    riskScore += vehicleAge * 0.5

    if (riskScore < 20) return { level: "Low", color: "bg-green-100 text-green-800", icon: TrendingDown }
    if (riskScore < 50) return { level: "Medium", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle }
    return { level: "High", color: "bg-red-100 text-red-800", icon: TrendingUp }
  }

  const risk = calculateRiskLevel()
  const RiskIcon = risk.icon

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Risk Assessment</CardTitle>
        <CardDescription>Customer {customerId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-foreground font-medium">Overall Risk Level</span>
          <Badge className={`${risk.color} flex items-center gap-1`}>
            <RiskIcon className="w-4 h-4" />
            {risk.level}
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Driving Score</span>
              <span className="text-sm font-semibold">{drivingScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${drivingScore}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Accident History</span>
              <span className="text-sm font-semibold">{accidentHistory} incidents</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${Math.min(accidentHistory * 20, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Claim History</span>
              <span className="text-sm font-semibold">{claimHistory} claims</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${Math.min(claimHistory * 25, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Vehicle Age</span>
              <span className="text-sm font-semibold">{vehicleAge} years</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(vehicleAge * 10, 100)}%` }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
