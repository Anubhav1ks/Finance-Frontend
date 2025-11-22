"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "@/lib/api";
import { ACCESS_TOKEN } from "@/Constant";

interface ApplyButtonProps {
  internshipId: string;
  internshipTitle: string;
  userId?: string;
}

export function ApplyButton({ internshipId, internshipTitle, userId }: ApplyButtonProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  // ------------------------------
  // 🔥 Check if logged in
  // ------------------------------
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ------------------------------
  // 🔥 Handle Submission
  // ------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);

      form.append("internshipId", internshipId);
      form.append("userId", userId || "guest-user");

      if (cvFile) form.append("resume", cvFile);

      await API.post("/api/apply", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsSubmitted(true);

      toast({
        title: "Application Submitted!",
        description: "Your application has been received.",
      });

      setTimeout(() => {
        setOpen(false);
        setTimeout(() => setIsSubmitted(false), 300);
      }, 1500);
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        variant: "destructive",
        description: err?.response?.data?.message || "Something went wrong.",
      });
    }

    setIsSubmitting(false);
  };

  // ------------------------------
  // Hidden file picker trigger
  // ------------------------------
  const pickFile = (id: string) => {
    const element = document.getElementById(id) as HTMLInputElement | null;
    if (element) element.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* -------------------------------------------
          APPLY BUTTON with Login Check
      ------------------------------------------- */}
      <DialogTrigger asChild>
        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
          onClick={(e) => {
            const token = localStorage.getItem(ACCESS_TOKEN);

            // ❌ Not logged in → redirect to login
            if (!token) {
              e.preventDefault();
              window.location.href =
                `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
              return;
            }

            // ✔ Logged in → allow apply
            setOpen(true);
          }}
        >
          Apply Now
        </Button>
      </DialogTrigger>

      {/* -------------------------------------------
          APPLICATION FORM DIALOG
      ------------------------------------------- */}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {internshipTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          // ------------------------------
          // SUCCESS SCREEN
          // ------------------------------
          <div className="py-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Application Submitted!
            </h3>
            <p className="text-muted-foreground">
              We’ll review your application shortly.
            </p>
          </div>
        ) : (
          // ------------------------------
          // APPLICATION FORM
          // ------------------------------
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PERSONAL INFO */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Personal Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input name="firstName" required placeholder="John" />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input name="lastName" required placeholder="Doe" />
                </div>
              </div>

              <div>
                <Label>Email *</Label>
                <Input name="email" type="email" required placeholder="john@example.com" />
              </div>

              <div>
                <Label>Phone *</Label>
                <Input name="phone" type="tel" required placeholder="+44 7000 000000" />
              </div>
            </div>

            {/* EDUCATION */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Education</h3>

              <div>
                <Label>University *</Label>
                <Input name="university" required placeholder="University Name" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Degree *</Label>
                  <Input name="degree" required placeholder="BSc Finance" />
                </div>
                <div>
                  <Label>Graduation Year *</Label>
                  <Input name="graduationYear" type="number" required placeholder="2026" />
                </div>
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Documents</h3>

              {/* RESUME */}
              <div>
                <Label>CV/Resume *</Label>
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors"
                  onClick={() => pickFile("resume-input")}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {cvFile ? `Selected: ${cvFile.name}` : "Click to upload"}
                  </p>
                </div>
                <Input
                  id="resume-input"
                  className="hidden"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  name="resume"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            {/* MOTIVATION */}
            <div>
              <Label>Why are you interested in this position? *</Label>
              <Textarea
                name="motivation"
                required
                placeholder="Tell us why you're a strong fit..."
                rows={4}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-accent text-accent-foreground"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
