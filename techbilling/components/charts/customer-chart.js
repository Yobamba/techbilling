"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { useBilling } from "../../context/billing-context"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const chartConfig = {
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-3))",
  },
}

export function CustomerChart() {
  const { revenueData } = useBilling()
  
  // Transform the data for customer growth visualization
  const chartData = revenueData?.monthly?.map(item => ({
    month: item.month,
    customers: item.customers || 0
  })) || []

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-playfair text-xl">Customer Growth</CardTitle>
        <CardDescription>Active customer count over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [value, "Active Customers"]} />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-3))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
