"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { useBilling } from "../../context/billing-context"
import { RevenueChart } from "../../components/charts/revenue-chart"
import { InvoiceChart } from "../../components/charts/invoice-chart"
import { CustomerChart } from "../../components/charts/customer-chart"
import { MetricsOverview } from "../../components/dashboard/metrics-overview"
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Calendar } from "lucide-react"

export default function DashboardPage() {
  const { dashboardStats, selectedPeriod, setSelectedPeriod } = useBilling()

  if (!dashboardStats) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  const renderGrowth = (growth) => {
    const roundedGrowth = Math.round(growth);
    if (roundedGrowth > 0) {
      return <><TrendingUp className="h-3 w-3 text-green-500" />+{roundedGrowth}% from last period</>;
    } else if (roundedGrowth < 0) {
      return <><TrendingDown className="h-3 w-3 text-red-500" />{roundedGrowth}% from last period</>;
    } else {
      return <>No change from last period</>;
    }
  };

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
              <h1 className="font-playfair font-bold text-3xl text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive view of your billing performance and key metrics</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedPeriod === "monthly" ? "default" : "outline"}
                onClick={() => setSelectedPeriod("monthly")}
                size="sm"
              >
                Monthly
              </Button>
              <Button
                variant={selectedPeriod === "annual" ? "default" : "outline"}
                onClick={() => setSelectedPeriod("annual")}
                size="sm"
              >
                Annual
              </Button>
            </div>
          </div>

          {/* Metrics Overview */}
          <MetricsOverview />

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {selectedPeriod === "monthly" ? "Monthly" : "Annual"} Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${dashboardStats.revenue.toLocaleString() || '0'}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {renderGrowth(dashboardStats.revenueGrowth)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Invoices Issued</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{dashboardStats.invoices}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {renderGrowth(dashboardStats.invoiceGrowth)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{dashboardStats.customers}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {renderGrowth(dashboardStats.customerGrowth)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Invoice Value</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${Math.round(dashboardStats.avgInvoiceValue).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">For the period</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <InvoiceChart />
          </div>

          {/* Customer Growth Chart */}
          <CustomerChart />

          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Recent Activity</CardTitle>
              <CardDescription>Latest billing activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Invoice #INV-2025-001 generated</p>
                      <p className="text-sm text-muted-foreground">TechCorp Solutions - $5,250</p>
                    </div>
                  </div>
                  {/* <Badge variant="secondary">2 hours ago</Badge> */}
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payment received</p>
                      <p className="text-sm text-muted-foreground">InnovateTech Ltd - $3,800</p>
                    </div>
                  </div>
                  {/* <Badge variant="outline">5 hours ago</Badge> */}
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-full">
                      <Users className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">New customer added</p>
                      <p className="text-sm text-muted-foreground">Digital Works Inc</p>
                    </div>
                  </div>
                  {/* <Badge variant="outline">1 day ago</Badge> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
