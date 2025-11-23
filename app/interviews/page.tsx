"use client"

import React, { useEffect, useState } from "react"
import API from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Video, MapPin, CheckCircle2, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ScheduleInterviewDialog from "@/components/ScheduleInterviewDialog"

// Mock interview slots (kept as UI reference)
const mockInterviewSlots = [
  { date: new Date(2025, 10, 15), times: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
  { date: new Date(2025, 10, 16), times: ["09:00", "10:00", "13:00", "14:00", "16:00"] },
  { date: new Date(2025, 10, 18), times: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
  { date: new Date(2025, 10, 19), times: ["09:00", "11:00", "13:00", "15:00"] },
  { date: new Date(2025, 10, 20), times: ["09:00", "10:00", "11:00", "14:00"] },
]

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  // ================================
  // 🔥 Fetch Scheduled Interviews from API
  // ================================
  const loadInterviews = async () => {
    try {
      const res = await API.get("/api/interview")

      setInterviews(res.data.interviews || [])
    } catch (err: any) {
      toast({
        title: "Failed to load interviews",
        description: err?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    loadInterviews()
  }, [])

  // ================================
  // 🔥 Book an Interview Slot (POST API)
  // ================================
  const handleBookInterview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Fields",
        description: "Please select both date and time.",
        variant: "destructive",
      })
      return
    }

    try {
      await API.post("/api/interview/schedule", {
        interviewDate: selectedDate,
        interviewTime: selectedTime,
        interviewType: "virtual",
        notes: "",
      })

      setIsSubmitted(true)

      toast({
        title: "Interview Scheduled!",
        description: `${selectedDate.toLocaleDateString()} at ${selectedTime}`,
      })

      setTimeout(() => {
        setIsBookingOpen(false)
        setIsSubmitted(false)
        setSelectedDate(undefined)
        setSelectedTime(undefined)
        loadInterviews()
      }, 1500)
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Unable to schedule interview.",
        variant: "destructive",
      })
    }
  }

  const availableSlots = mockInterviewSlots.find(
    (slot) => selectedDate && slot.date.toDateString() === selectedDate.toDateString(),
  )

  const disabledDates = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return true
    return !mockInterviewSlots.some((slot) => slot.date.toDateString() === date.toDateString())
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ========================= HEADER ========================= */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Interview Scheduler</h1>
          <p className="text-primary-foreground/80">Manage and track your interview schedule</p>
        </div>
      </div>

      {/* ========================= BOOK INTERVIEW BUTTON ========================= */}
      <div className="container mx-auto px-4 py-6">
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground" size="lg">
              <CalendarIcon className="h-5 w-5 mr-2" /> Book Interview Slot
            </Button>
          </DialogTrigger>

          {/* ========================= BOOK INTERVIEW FORM ========================= */}
          <ScheduleInterviewDialog
            open={isBookingOpen}
            onOpenChange={setIsBookingOpen}
            // applicationId={selectedApplication}
          />
        </Dialog>
      </div>

      {/* ========================= UPCOMING INTERVIEWS ========================= */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Upcoming Interviews</h2>

        {loading ? (
          <p>Loading interviews...</p>
        ) : interviews.length === 0 ? (
          <p className="text-muted-foreground">No interviews scheduled.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {interviews.map((interview: any) => (
              <Card key={interview.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    {/* LEFT SECTION */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold">{interview?.Internship?.title}</h3>
                        <p className="text-muted-foreground">{interview?.Internship?.companyName}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* DATE & TIME */}
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">Date & Time</p>
                            <p className="font-medium">
                              {new Date(interview.interviewDate).toLocaleDateString("en-GB", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                            <p className="text-sm text-muted-foreground">{interview.interviewTime}</p>
                          </div>
                        </div>

                        {/* TYPE */}
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            {interview.interviewType === "virtual" ? (
                              <Video className="h-5 w-5 text-accent" />
                            ) : (
                              <MapPin className="h-5 w-5 text-accent" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p className="font-medium capitalize">{interview.interviewType}</p>
                          </div>
                        </div>

                      </div>

                      {/* NOTES */}
                      {interview.notes && (
                        <div className="p-4 rounded-lg bg-muted/40 border border-muted">
                          <p className="text-sm font-medium mb-1">Notes:</p>
                          <p className="text-sm text-muted-foreground">{interview.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* ACTION BUTTONS */}
                    {/* <div className="flex flex-col gap-3 w-full lg:w-40">
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Reschedule
                      </Button>

                      <Button variant="outline" className="w-full bg-transparent">
                        Add to Calendar
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent hover:text-destructive hover:border-destructive"
                      >
                        Cancel
                      </Button>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

            ))}
          </div>
        )}
      </div>
    </div>
  )
}
