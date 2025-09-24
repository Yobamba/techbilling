"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useBilling } from "../../context/billing-context"
import { FileCheck, AlertTriangle, Clock, TrendingUp } from "lucide-react"

export function ComplianceStats() {
  const { complianceRequirements } = useBilling()

  const totalRequirements = complianceRequirements.length
  const completedRequirements = complianceRequirements.filter((req) => req.completed).length
  const highPriorityPending = complianceRequirements.filter((req) => !req.completed && req.priority === "high").length
  const upcomingDeadlines = complianceRequirements.filter((req) => {
    const deadline = new Date(req.deadline)
    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    return !req.completed && deadline <= thirtyDaysFromNow
  }).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">Completed</CardTitle>
          <FileCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{completedRequirements}</div>
          <p className="text-xs text-green-600">
            {Math.round((completedRequirements / totalRequirements) * 100)}% completion rate
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-800">High Priority</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-700">{highPriorityPending}</div>
          <p className="text-xs text-orange-600">Require immediate attention</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">Due Soon</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{upcomingDeadlines}</div>
          <p className="text-xs text-blue-600">Within 30 days</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requirements</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{totalRequirements}</div>
          <p className="text-xs text-muted-foreground">Across all categories</p>
        </CardContent>
      </Card>
    </div>
  )
}
