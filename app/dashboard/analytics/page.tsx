"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Award, AlertCircle } from "lucide-react"

const drivingScoreData = [
  { month: "Jan", score: 78, target: 85 },
  { month: "Feb", score: 82, target: 85 },
  { month: "Mar", score: 80, target: 85 },
  { month: "Apr", score: 88, target: 85 },
  { month: "May", score: 90, target: 85 },
  { month: "Jun", score: 92, target: 85 },
]

const metricsData = [
  { metric: "Speed Control", value: 88 },
  { metric: "Acceleration", value: 85 },
  { metric: "Braking", value: 92 },
  { metric: "Lane Discipline", value: 90 },
  { metric: "Traffic Compliance", value: 87 },
]

const dailyMetrics = [
  { day: "Mon", avgSpeed: 65, hardBrakes: 2, harshAccel: 1 },
  { day: "Tue", avgSpeed: 62, hardBrakes: 1, harshAccel: 0 },
  { day: "Wed", avgSpeed: 68, hardBrakes: 3, harshAccel: 2 },
  { day: "Thu", avgSpeed: 64, hardBrakes: 1, harshAccel: 1 },
  { day: "Fri", avgSpeed: 70, hardBrakes: 2, harshAccel: 1 },
  { day: "Sat", avgSpeed: 55, hardBrakes: 0, harshAccel: 0 },
  { day: "Sun", avgSpeed: 58, hardBrakes: 1, harshAccel: 0 },
]

const rewards = [
  { id: 1, title: "Safe Driver Badge", description: "30 days without violations", earned: true },
  { id: 2, title: "Eco Driver", description: "Efficient fuel consumption", earned: true },
  { id: 3, title: "Perfect Score", description: "100% driving score for a month", earned: false },
  { id: 4, title: "Zero Incidents", description: "1 year without accidents", earned: false },
]

export default function AnalyticsDashboard() {
  const currentScore = 92
  const scoreChange = 2
  const safeTrips = 156
  const totalTrips = 158

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Driving Behavior Analytics</h1>
        <p className="text-muted-foreground mt-2">Real-time metrics, driving scores, and rewards</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Score</p>
                <p className="text-3xl font-bold text-foreground mt-1">{currentScore}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +{scoreChange} this month
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Safe Trips</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {safeTrips}/{totalTrips}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((safeTrips / totalTrips) * 100)}% safety rate
                </p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Speed</p>
                <p className="text-3xl font-bold text-foreground mt-1">64 km/h</p>
                <p className="text-xs text-green-600 mt-1">Within limits</p>
              </div>
              <div className="text-4xl">🚗</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rewards Earned</p>
                <p className="text-3xl font-bold text-foreground mt-1">2</p>
                <p className="text-xs text-muted-foreground mt-1">2 more available</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driving Score Trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Driving Score Trend</CardTitle>
            <CardDescription>Monthly performance vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                score: { label: "Your Score", color: "#3b82f6" },
                target: { label: "Target", color: "#10b981" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={drivingScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" name="Your Score" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#10b981" name="Target" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Driving Metrics Radar */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Driving Metrics</CardTitle>
            <CardDescription>Performance across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Score", color: "#8b5cf6" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={metricsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Metrics */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Weekly Driving Metrics</CardTitle>
          <CardDescription>Daily average speed and incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              avgSpeed: { label: "Avg Speed (km/h)", color: "#3b82f6" },
              hardBrakes: { label: "Hard Brakes", color: "#ef4444" },
              harshAccel: { label: "Harsh Acceleration", color: "#f97316" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="avgSpeed" fill="#3b82f6" name="Avg Speed" />
                <Bar dataKey="hardBrakes" fill="#ef4444" name="Hard Brakes" />
                <Bar dataKey="harshAccel" fill="#f97316" name="Harsh Acceleration" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Rewards Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Achievements & Rewards</CardTitle>
          <CardDescription>Unlock rewards for safe driving</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`p-4 border rounded-lg ${reward.earned ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {reward.earned ? (
                        <Award className="w-5 h-5 text-amber-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <h3 className="font-semibold text-foreground">{reward.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                  </div>
                  <Badge className={reward.earned ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"}>
                    {reward.earned ? "Earned" : "Locked"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
