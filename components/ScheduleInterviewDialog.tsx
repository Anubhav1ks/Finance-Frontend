"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "@/lib/api"; // 🔥 IMPORTANT

// Mock slots (you can switch to API later)
const mockSlots = [
    { date: new Date(2025, 10, 21), times: ["09:00", "10:30", "12:00", "14:00"] },
    { date: new Date(2025, 10, 22), times: ["11:00", "13:00", "16:00"] },
    { date: new Date(2025, 10, 23), times: ["10:00", "12:00", "15:00", "17:00"] },
    { date: new Date(2025, 10, 24), times: ["09:00", "10:00", "11:00"] },
    { date: new Date(2025, 10, 25), times: ["14:00", "15:00", "16:00"] },
    { date: new Date(2025, 10, 216), times: ["09:00", "10:30", "12:00", "14:00"] },
    { date: new Date(2025, 10, 27), times: ["11:00", "13:00", "16:00"] },
    { date: new Date(2025, 10, 28), times: ["10:00", "12:00", "15:00", "17:00"] },
    { date: new Date(2025, 10, 29), times: ["09:00", "10:00", "11:00"] },
    { date: new Date(2025, 10, 30), times: ["14:00", "15:00", "16:00"] },
];

export default function ScheduleInterviewDialog({
    open,
    onOpenChange,
    applicationId,
}: any) {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const [interviewType, setInterviewType] = useState("virtual");
    const [notes, setNotes] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { toast } = useToast();

    // Available time slots for selected date
    const availableSlots = mockSlots.find(
        (slot) =>
            selectedDate &&
            slot.date.toDateString() === selectedDate.toDateString()
    );

    // Disable all days that are not in mockSlots
    const disabledDates = (date: Date) => {
        return !mockSlots.some(
            (slot) => slot.date.toDateString() === date.toDateString()
        );
    };

    // ============================================
    // 🔥 SUBMIT — CALL REAL API
    // ============================================
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!selectedDate || !selectedTime) {
            toast({
                title: "Missing Selection",
                description: "Please select both date and time.",
                variant: "destructive",
            });
            return;
        }

        try {
            // Prepare data
            const payload = {
                interviewDate: selectedDate.toISOString().split("T")[0],
                interviewTime: selectedTime,
                interviewType,
                notes,
            };

            // API CALL
            await API.post(`/api/interview/${applicationId}/schedule`, payload);

            // Success UI
            setIsSubmitted(true);
            toast({
                title: "Interview Scheduled",
                description: `${payload.interviewDate} at ${payload.interviewTime}`,
            });

            // Close after animation delay
            setTimeout(() => {
                onOpenChange(false);
                setIsSubmitted(false);
                setSelectedDate(undefined);
                setSelectedTime(undefined);
                setNotes("");
            }, 1500);
        } catch (error) {
            console.log("Interview API error:", error);

            toast({
                title: "Error",
                description: "Failed to schedule interview.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-xl rounded-xl shadow-xl"
                style={{ maxWidth: "40rem" }}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        Schedule Interview
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Choose a date, time and provide optional details.
                    </DialogDescription>
                </DialogHeader>

                {/* Success Screen */}
                {isSubmitted ? (
                    <div className="py-10 text-center">
                        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Interview Successfully Scheduled
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            A confirmation email has been sent to the applicant.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Date and Time section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Calendar */}
                            <div className="border rounded-lg p-4 bg-muted/20 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <CalendarIcon className="h-4 w-4 text-primary" />
                                    <Label className="font-medium">Select Date</Label>
                                </div>

                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={disabledDates}
                                    className="rounded-md"
                                />

                                {selectedDate && (
                                    <p className="text-sm text-muted-foreground mt-2 text-center">
                                        {selectedDate.toLocaleDateString("en-GB", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                )}
                            </div>

                            {/* Time Slots */}
                            <div className="border rounded-lg p-4 bg-muted/20 shadow-sm">
                                <Label className="font-medium">Available Time Slots</Label>

                                {!selectedDate ? (
                                    <p className="text-muted-foreground text-sm mt-4 text-center">
                                        Select a date to see available times
                                    </p>
                                ) : availableSlots ? (
                                    <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
                                        {availableSlots.times.map((time) => (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setSelectedTime(time)}
                                                className={`w-full flex items-center gap-2 p-3 rounded-lg border transition-all
                          ${selectedTime === time
                                                        ? "border-primary bg-primary/10"
                                                        : "border-border hover:border-primary/40"
                                                    }`}
                                            >
                                                <Clock className="h-4 w-4 text-primary" />
                                                <span className="font-medium">{time}</span>
                                                <Badge variant="outline" className="ml-auto text-xs rounded-md">
                                                    45 min
                                                </Badge>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm mt-4 text-center">
                                        No available slots for this date
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Interview Type Selector */}
                        <div className="space-y-2">
                            <Label>Interview Type</Label>
                            <Select value={interviewType} onValueChange={setInterviewType}>
                                <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="virtual">Virtual (Video Call)</SelectItem>
                                    <SelectItem value="phone">Phone Call</SelectItem>
                                    <SelectItem value="in-person">In Person</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label>Additional Notes</Label>
                            <Textarea
                                rows={3}
                                placeholder="Share interview instructions, case study, or meeting link..."
                                className="rounded-lg"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 rounded-lg"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={!selectedDate || !selectedTime}
                                className="flex-1 rounded-lg"
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
