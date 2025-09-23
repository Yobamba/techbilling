"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { useBilling } from "../../context/billing-context"
import { TrendingUp, Target, Zap } from "lucide-react"

export function MetricsOverview() {
  const { dashboardStats, selectedPeriod } = useBilling()

  const revenueTarget = selectedPeriod === "monthly" ? 150000 : 1500000
  const revenueProgress = (dashboardStats.revenue / revenueTarget) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-playfair">Revenue Performance</CardTitle>
            <CardDescription>Target vs Actual Revenue</CardDescription>
          </div>
          <Target className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress to Target</span>
              <span className="font-medium">{Math.round(revenueProgress)}%</span>
            </div>
            <Progress value={revenueProgress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                ${dashboardStats.revenue.toLocaleString()}
              </span>
              <span>${revenueTarget.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-playfair">Growth Metrics</CardTitle>
            <CardDescription>Revenue & Customer Growth</CardDescription>
          </div>
          <TrendingUp className="h-5 w-5 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Revenue Growth</span>
              <span className="text-lg font-bold text-secondary">+{Math.round(dashboardStats.revenueGrowth)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Customer Growth</span>
              <span className="text-lg font-bold text-accent">+{Math.round(dashboardStats.customerGrowth)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-playfair">Efficiency Score</CardTitle>
            <CardDescription>Overall System Performance</CardDescription>
          </div>
          <Zap className="h-5 w-5 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">92%</div>
              <div className="text-sm text-muted-foreground">Excellent Performance</div>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
