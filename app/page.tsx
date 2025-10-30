"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Lock, TrendingUp, Users, CheckCircle2 } from "lucide-react"

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "customer",
      title: "Customer",
      description: "View your car history, insurance, and service records",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      href: "/dashboard/customer",
    },
    {
      id: "manufacturer",
      title: "Manufacturer",
      description: "Register vehicles and track factory quality checks",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      href: "/dashboard/manufacturer",
    },
    {
      id: "dealer",
      title: "Dealer/Distributor",
      description: "Manage inventory and proof-of-condition records",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      href: "/dashboard/dealer",
    },
    {
      id: "insurance",
      title: "Insurance Company",
      description: "Access verified claims and driving behavior data",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      href: "/dashboard/insurance",
    },
    {
      id: "service",
      title: "Service Provider",
      description: "Record maintenance and service history",
      icon: CheckCircle2,
      color: "from-indigo-500 to-blue-500",
      href: "/dashboard/service",
    },
    {
      id: "rto",
      title: "RTO/Government",
      description: "Verify ownership and manage compliance",
      icon: Lock,
      color: "from-slate-500 to-gray-500",
      href: "/dashboard/rto",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">AutoTrack</h1>
          </div>
          <Button variant="outline" size="sm">
            Connect Wallet
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4 text-balance">
            Blockchain-Powered Car Lifecycle Platform
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Transparent, tamper-proof records for every vehicle from factory to customer. One platform for all
            stakeholders.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Shield, title: "Tamper-Proof", desc: "Immutable blockchain ledger" },
            { icon: Zap, title: "Real-Time", desc: "Instant damage & service tracking" },
            { icon: Lock, title: "Secure", desc: "Blockchain wallet authentication" },
          ].map((feature, i) => (
            <Card key={i} className="border-border/40 bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Select Your Role</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Link key={role.id} href={role.href}>
                  <Card className="border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-all cursor-pointer h-full hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-foreground">{role.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{role.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Why NanoSeconds?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Single platform for all car-related tasks",
                "Tamper-proof car history and ownership records",
                "Factory-to-customer damage tracking",
                "Verified service records prevent fraud",
                "Fair insurance claims with real driving data",
                "Smarter resale with complete verified history",
              ].map((benefit, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© 2025 AutoTrack. Blockchain-powered transparency for the automotive industry.</p>
        </div>
      </footer>
    </div>
  )
}
