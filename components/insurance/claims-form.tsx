"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ClaimsForm() {
  const [formData, setFormData] = useState({
    claimType: "accident",
    description: "",
    amount: "",
    date: "",
    documents: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Claim submitted:", formData)
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>File New Claim</CardTitle>
        <CardDescription>Submit a new insurance claim with supporting documents</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="claimType">Claim Type</Label>
              <select
                id="claimType"
                className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background"
                value={formData.claimType}
                onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
              >
                <option value="accident">Accident</option>
                <option value="damage">Damage</option>
                <option value="theft">Theft</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="amount">Claim Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="date">Incident Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background"
              rows={4}
              placeholder="Describe the incident in detail"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="documents">Supporting Documents</Label>
            <input
              id="documents"
              type="file"
              multiple
              className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background"
              onChange={(e) => setFormData({ ...formData, documents: Array.from(e.target.files || []) })}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Claim
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
