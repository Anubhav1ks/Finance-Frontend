"use client"

import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineStep {
  status: "completed" | "current" | "upcoming" | "rejected"
  title: string
  description: string
  date?: string
}

interface ApplicationTimelineProps {
  applicationStatus: "under_review" | "interview" | "accepted" | "rejected"
}

export function ApplicationTimeline({ applicationStatus }: ApplicationTimelineProps) {
  // Define timeline based on application status
  const getTimeline = (): TimelineStep[] => {
    const baseTimeline: TimelineStep[] = [
      {
        status: "completed",
        title: "Application Submitted",
        description: "Your application has been received",
        date: "Oct 12, 2025",
      },
    ]

    if (applicationStatus === "rejected") {
      return [
        ...baseTimeline,
        {
          status: "rejected",
          title: "Application Reviewed",
          description: "Unfortunately, we've decided not to move forward at this time",
          date: "Oct 15, 2025",
        },
      ]
    }

    if (applicationStatus === "under_review") {
      return [
        ...baseTimeline,
        {
          status: "current",
          title: "Under Review",
          description: "Our team is currently reviewing your application",
          date: "In Progress",
        },
        {
          status: "upcoming",
          title: "Interview",
          description: "If selected, you'll be invited for an interview",
        },
        {
          status: "upcoming",
          title: "Final Decision",
          description: "We'll notify you of the final decision",
        },
      ]
    }

    if (applicationStatus === "interview") {
      return [
        ...baseTimeline,
        {
          status: "completed",
          title: "Application Reviewed",
          description: "Your application has been reviewed and accepted",
          date: "Oct 14, 2025",
        },
        {
          status: "current",
          title: "Interview Scheduled",
          description: "Your interview is scheduled for Oct 20, 2025 at 10:00 AM",
          date: "Upcoming",
        },
        {
          status: "upcoming",
          title: "Final Decision",
          description: "We'll notify you of the final decision after the interview",
        },
      ]
    }

    if (applicationStatus === "accepted") {
      return [
        ...baseTimeline,
        {
          status: "completed",
          title: "Application Reviewed",
          description: "Your application has been reviewed and accepted",
          date: "Oct 14, 2025",
        },
        {
          status: "completed",
          title: "Interview Completed",
          description: "You successfully completed the interview process",
          date: "Oct 20, 2025",
        },
        {
          status: "completed",
          title: "Offer Extended",
          description: "Congratulations! We'd like to offer you this position",
          date: "Oct 22, 2025",
        },
      ]
    }

    return baseTimeline
  }

  const timeline = getTimeline()

  const getIcon = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-success" />
      case "current":
        return <Clock className="h-6 w-6 text-accent" />
      case "rejected":
        return <XCircle className="h-6 w-6 text-destructive" />
      case "upcoming":
        return <Circle className="h-6 w-6 text-muted-foreground" />
    }
  }

  const getStatusBadge = () => {
    switch (applicationStatus) {
      case "under_review":
        return <Badge variant="secondary">Under Review</Badge>
      case "interview":
        return <Badge className="bg-accent text-accent-foreground">Interview Scheduled</Badge>
      case "accepted":
        return <Badge className="bg-success text-success-foreground">Accepted</Badge>
      case "rejected":
        return <Badge variant="destructive">Not Selected</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Application Status</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          {timeline.map((step, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Timeline Line */}
              {index < timeline.length - 1 && (
                <div
                  className={`absolute left-3 top-10 w-0.5 h-full ${
                    step.status === "completed" ? "bg-success" : "bg-border"
                  }`}
                />
              )}

              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">{getIcon(step.status)}</div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold">{step.title}</h4>
                  {step.date && <span className="text-sm text-muted-foreground whitespace-nowrap">{step.date}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
