import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, FileCheck, FileText } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">Welcome to TechBilling</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Your comprehensive billing management solution. Track revenue, manage compliance, and generate invoices
              with our modern, data-driven platform.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
                    <CardDescription>Interactive charts and revenue insights</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View monthly and annual revenue trends, track customer growth, and analyze billing performance with
                  interactive visualizations.
                </p>
                <Button asChild className="w-full">
                  <Link href="/dashboard">
                    View Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <FileCheck className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Compliance Tracking</CardTitle>
                    <CardDescription>Manage requirements and deadlines</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Stay on top of tax reports, audits, and documentation requirements with our comprehensive compliance
                  management system.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/compliance">
                    Manage Compliance
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Invoice Simulator</CardTitle>
                    <CardDescription>Generate and preview invoices</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create professional invoice previews with our easy-to-use form. Perfect for testing and client
                  presentations.
                
                </p>
                <Button asChild variant="contained" className="w-full">
                  <Link href="/invoice">
                    Create Invoice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair">Quick Overview</CardTitle>
              <CardDescription>Your billing system at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$125K</div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">342</div>
                  <div className="text-sm text-muted-foreground">Invoices Issued</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">89</div>
                  <div className="text-sm text-muted-foreground">Active Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">+12.5%</div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
