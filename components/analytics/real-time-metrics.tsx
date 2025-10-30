"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface RealTimeMetricsProps {
  currentSpeed: number
  speedLimit: number
  acceleration: number
  brakeForce: number
  isHarshBraking: boolean
  isHarshAcceleration: boolean
}

export function RealTimeMetrics({
  currentSpeed,
  speedLimit,
  acceleration,
  brakeForce,
  isHarshBraking,
  isHarshAcceleration,
}: RealTimeMetricsProps) {
  const speedPercentage = (currentSpeed / speedLimit) * 100
  const isExceedingLimit = currentSpeed > speedLimit

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Real-Time Metrics</CardTitle>
        <CardDescription>Current driving data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Speed */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Speed</span>
            <span className={`text-lg font-bold ${isExceedingLimit ? "text-red-600" : "text-green-600"}`}>
              {currentSpeed} km/h
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${isExceedingLimit ? "bg-red-500" : "bg-green-500"}`}
              style={{ width: `${Math.min(speedPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Limit: {speedLimit} km/h</p>
        </div>

        {/* Acceleration */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Acceleration</span>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">{acceleration.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">m/s²</span>
              {isHarshAcceleration && <AlertCircle className="w-4 h-4 text-orange-600" />}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${isHarshAcceleration ? "bg-orange-500" : "bg-blue-500"}`}
              style={{ width: `${Math.min((acceleration / 5) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Braking */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Brake Force</span>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">{brakeForce.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">m/s²</span>
              {isHarshBraking && <AlertCircle className="w-4 h-4 text-red-600" />}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${isHarshBraking ? "bg-red-500" : "bg-green-500"}`}
              style={{ width: `${Math.min((brakeForce / 8) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Warnings */}
        {(isExceedingLimit || isHarshBraking || isHarshAcceleration) && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 font-medium">⚠️ Driving Alerts</p>
            <ul className="text-xs text-orange-700 mt-2 space-y-1">
              {isExceedingLimit && <li>• Exceeding speed limit</li>}
              {isHarshBraking && <li>• Harsh braking detected</li>}
              {isHarshAcceleration && <li>• Harsh acceleration detected</li>}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
