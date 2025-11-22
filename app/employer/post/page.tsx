"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

import API from "@/lib/api";

export default function PostInternshipPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaid, setIsPaid] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [software, setSoftware] = useState<string[]>([]);
  const [currentSoftware, setCurrentSoftware] = useState("");

  // ADD SKILL
  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  // REMOVE SKILL
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // ADD SOFTWARE
  const addSoftware = () => {
    if (currentSoftware.trim() && !software.includes(currentSoftware.trim())) {
      setSoftware([...software, currentSoftware.trim()]);
      setCurrentSoftware("");
    }
  };

  // REMOVE SOFTWARE
  const removeSoftware = (item: string) => {
    setSoftware(software.filter((s) => s !== item));
  };

  // SUBMIT FORM
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);

      const payload = {
        title: form.get("title"),
        companyName: form.get("company"),
        category: form.get("category"),
        duration: form.get("duration"),
        jobDescription: form.get("description"),
        location: form.get("location"),
        mode: form.get("mode"),
        applicationStatus: "Open",
        disabled: false,
        isPaid,
        monthlyStipend: isPaid ? form.get("stipend") : 0,
        requirements: form.get("requirements")?.toString().split("\n") || [],
        requiredSkills: skills,
        softwareTools: software,
        preferredCertifications: form.get("certifications"),
        createdBy: "Admin",
      };

      await API.post("/api/services", payload);

      toast({
        title: "Internship Posted!",
        description: "Your internship listing has been successfully published.",
      });

      router.push("/employer");
    } catch (error:any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm hover:text-accent transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Admin Panel
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Post New Internship</h1>
          <p className="text-lg text-primary-foreground/80">Create a new internship listing</p>
        </div>
      </div>

      {/* FORM */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* BASIC INFO */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input id="title" name="title" required placeholder="e.g., Audit Intern" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" name="company" required placeholder="e.g., Deloitte" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select name="category" required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.name} value={category.name}>
                              {category.icon} {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <Input id="duration" name="duration" required placeholder="e.g., 3 months" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      placeholder="Describe the role and responsibilities..."
                      rows={5}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* LOCATION */}
              <Card>
                <CardHeader>
                  <CardTitle>Location & Work Mode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input id="location" name="location" required placeholder="e.g., London, UK" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Work Mode *</Label>
                    <Select name="mode" required>
                      <SelectTrigger id="mode">
                        <SelectValue placeholder="Select work mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Onsite">Onsite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* COMPENSATION */}
              <Card>
                <CardHeader>
                  <CardTitle>Compensation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isPaid" checked={isPaid} onCheckedChange={(checked) => setIsPaid(!!checked)} />
                    <Label htmlFor="isPaid" className="cursor-pointer">
                      This is a paid internship
                    </Label>
                  </div>

                  {isPaid && (
                    <div className="space-y-2">
                      <Label htmlFor="stipend">Monthly Stipend (£) *</Label>
                      <Input id="stipend" name="stipend" type="number" required={isPaid} placeholder="e.g., 1200" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* REQUIREMENTS */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements *</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      required
                      placeholder="Enter each requirement on a new line..."
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground">Enter each requirement on a separate line</p>
                  </div>
                </CardContent>
              </Card>

              {/* SKILLS & SOFTWARE */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Software</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* SKILLS */}
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skills"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        placeholder="e.g., Financial Analysis"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill} variant="outline" className="bg-transparent">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SOFTWARE */}
                  <div className="space-y-2">
                    <Label htmlFor="software">Software & Tools</Label>
                    <div className="flex gap-2">
                      <Input
                        id="software"
                        value={currentSoftware}
                        onChange={(e) => setCurrentSoftware(e.target.value)}
                        placeholder="e.g., Excel"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSoftware();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSoftware} variant="outline" className="bg-transparent">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {software.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {software.map((item) => (
                          <Badge key={item} variant="secondary" className="gap-1">
                            {item}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeSoftware(item)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CERTIFICATIONS */}
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Preferred Certifications (Optional)</Label>
                    <Input id="certifications" name="certifications" placeholder="e.g., ACCA, CFA" />
                    <p className="text-xs text-muted-foreground">Separate multiple certifications with commas</p>
                  </div>
                </CardContent>
              </Card>

              {/* SUBMIT */}
              <div className="flex gap-3">
                <Link href="/admin" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isSubmitting ? "Publishing..." : "Publish Internship"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
