"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useBilling } from "../../context/billing-context"
import { ComplianceStats } from "@/components/compliance/compliance-stats"
import { RequirementCard } from "@/components/compliance/requirement-card"
import { AlertTriangle, CheckCircle, Clock, FileCheck, Filter } from "lucide-react"
import { useState } from "react"

export default function CompliancePage() {
  const { complianceRequirements, billingData } = useBilling()

  if (!billingData) {
    return <div className="flex min-h-screen bg-background justify-center items-center">Loading...</div>
  }
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filteredRequirements = complianceRequirements.filter((req) => {
    const categoryMatch = filterCategory === "all" || req.category === filterCategory
    const priorityMatch = filterPriority === "all" || req.priority === filterPriority
    return categoryMatch && priorityMatch
  })

  const completedCount = complianceRequirements.filter((req) => req.completed).length
  const totalCount = complianceRequirements.length
  const completionRate = Math.round((completedCount / totalCount) * 100)

  const upcomingDeadlines = complianceRequirements
    .filter((req) => !req.completed)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3)

  return (
    <div className="flex min-h-screen bg-background">
      <div className="sticky top-0 h-screen w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-playfair font-bold text-3xl text-foreground">Compliance Management</h1>
              <p className="text-muted-foreground">
                Track and manage your regulatory requirements, deadlines, and documentation
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Compliance Stats */}
          <ComplianceStats />

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{completionRate}%</div>
                <div className="mt-2">
                  <Progress value={completionRate} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {completedCount} of {totalCount} requirements completed
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{totalCount - completedCount}</div>
                <p className="text-xs text-muted-foreground">
                  {complianceRequirements.filter((req) => !req.completed && req.priority === "high").length} high
                  priority
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">0</div>
                <p className="text-xs text-muted-foreground">All requirements are on track</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Upcoming Deadlines</CardTitle>
              <CardDescription>Requirements that need attention soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((requirement) => (
                  <div
                    key={requirement.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          requirement.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : requirement.priority === "medium"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <FileCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{requirement.title}</p>
                        <p className="text-sm text-muted-foreground">{requirement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {/* <Badge
                        variant={
                          requirement.priority === "high"
                            ? "destructive"
                            : requirement.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {requirement.priority}
                      </Badge> */}
                      <p className="text-sm text-muted-foreground mt-1">
                        Due: {new Date(requirement.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">All Requirements</CardTitle>
              <CardDescription>Manage and track all compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Category:</span>
                  <div className="flex gap-1">
                    {["all", "tax", "audit", "documentation"].map((category) => (
                      <Button
                        key={category}
                        variant={filterCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterCategory(category)}
                        className="capitalize"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Priority:</span>
                  <div className="flex gap-1">
                    {["all", "high", "medium", "low"].map((priority) => (
                      <Button
                        key={priority}
                        variant={filterPriority === priority ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterPriority(priority)}
                        className="capitalize"
                      >
                        {priority}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredRequirements.map((requirement) => (
                  <RequirementCard key={requirement.id} requirement={requirement} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
