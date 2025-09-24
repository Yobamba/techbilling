"use client"

import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { useBilling } from "../../context/billing-context"
import { Calendar, FileText, AlertTriangle, CheckCircle } from "lucide-react"

export function RequirementCard({ requirement }) {
  const { toggleRequirementCompletion } = useBilling()

  const isOverdue = new Date(requirement.deadline) < new Date() && !requirement.completed
  const isDueSoon = new Date(requirement.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const getCategoryIcon = (category) => {
    switch (category) {
      case "tax":
        return <FileText className="h-4 w-4" />
      case "audit":
        return <CheckCircle className="h-4 w-4" />
      case "documentation":
        return <Calendar className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "tax":
        return "bg-red-100 text-red-600"
      case "audit":
        return "bg-blue-100 text-blue-600"
      case "documentation":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <Card
      className={`border transition-all hover:shadow-md ${
        requirement.completed
          ? "bg-green-50/50 border-green-200"
          : isOverdue
            ? "bg-red-50/50 border-red-200"
            : isDueSoon
              ? "bg-orange-50/50 border-orange-200"
              : "border-border"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Checkbox
              checked={requirement.completed}
              onCheckedChange={() => toggleRequirementCompletion(requirement.id)}
              className="mt-1"
            />

            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      requirement.completed ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {requirement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{requirement.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  {isOverdue && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  {requirement.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-full ${getCategoryColor(requirement.category)}`}>
                    {getCategoryIcon(requirement.category)}
                  </div>
                  <span className="capitalize font-medium">{requirement.category}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(requirement.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    requirement.priority === "high"
                      ? "destructive"
                      : requirement.priority === "medium"
                        ? "secondary"
                        : "outline"
                  }
                  className="capitalize"
                >
                  {requirement.priority} Priority
                </Badge>

                {!requirement.completed && (
                  <Button size="sm" variant="outline" onClick={() => toggleRequirementCompletion(requirement.id)}>
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
