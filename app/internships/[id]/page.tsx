"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Banknote,
  Briefcase,
  Calendar,
  CheckCircle2,
  Award,
  Code,
  FileText,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InternshipCard } from "@/components/internship-card";
import { ApplyButton } from "@/components/apply-button";
import API from "@/lib/api";

// TRANSFORM FUNCTION
const transformInternship = (item: any) => {
  return {
    id: item.id,
    title: item.title,
    company: item.companyName,
    location: item.location,
    mode: item.mode,
    stipend: item.monthlyStipend,
    duration: item.duration,
    category: item.category,
    description: item.jobDescription,
    requirements: JSON.parse(item.requirements || "[]"),
    skills: item.requiredSkills || [],
    software: item.softwareTools || [],
    certifications: item.preferredCertifications
      ? item.preferredCertifications.split(",").map((c: string) => c.trim())
      : [],
    isPaid: item.isPaid,
    postedDate: item.createdOn,
  };
};

export default function InternshipDetailsPage({ params }: { params: { id: string } }) {
  const [internship, setInternship] = useState<any>(null);
  const [relatedInternships, setRelatedInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);

  // ---------------- FETCH INTERNSHIP ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/api/services/${params.id}`);
        if (!res.data?.data) return notFound();

        const internshipData = transformInternship(res.data.data);
        setInternship(internshipData);

        const relatedRes = await API.get("/api/services");
        const transformedRelated =
          relatedRes?.data?.data?.map(transformInternship) || [];

        setRelatedInternships(transformedRelated);
      } catch (err) {
        console.log(err);
        notFound();
      }

      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  // ---------------- CHECK IF SAVED ----------------
  useEffect(() => {
    const checkSaved = async () => {
      try {
        const res = await API.get("/api/services/saved");
        const savedIds = res.data?.savedInternships?.map((item: any) => item.internship.id);

        setIsSaved(savedIds.includes(params.id));
      } catch (err) {
        console.log("User not logged in or error checking saved internships");
      }
    };

    checkSaved();
  }, [params.id]);

  // ---------------- SAVE FUNCTION ----------------
  const handleSave = async () => {
    try {
      await API.post(`/api/internship/${internship.id}/save`);
      setIsSaved(true);
    } catch (err) {
      console.log(err);
      alert("Please login to save!");
    }
  };

  // ---------------- UNSAVE FUNCTION ----------------
  const handleUnsave = async () => {
    try {
      await API.delete(`/api/internship/${internship.id}/save`);
      setIsSaved(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading internship...</p>;
  }

  if (!internship) {
    notFound();
  }

  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(internship.postedDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm hover:text-accent transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Badge className="bg-accent text-accent-foreground mb-3">
                      {internship.category}
                    </Badge>
                    <h1 className="text-3xl font-bold mb-2">{internship.title}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{internship.company}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {internship.location}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Briefcase className="h-3 w-3" />
                        {internship.mode}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {internship.duration}
                      </Badge>

                      {internship.isPaid && internship.stipend && (
                        <Badge className="bg-success text-success-foreground gap-1">
                          <Banknote className="h-3 w-3" />£{internship.stipend}/month
                        </Badge>
                      )}

                      <Badge variant="secondary" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        {daysAgo === 0
                          ? "Posted today"
                          : `Posted ${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* ABOUT */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-accent" />
                      About the Role
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {internship.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Requirements */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Requirements
                    </h2>
                    <ul className="space-y-2">
                      {internship.requirements.map((req: any, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Skills */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-accent" />
                      Required Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map((s: string) => (
                        <Badge key={s} variant="outline" className="text-sm">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Software */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Code className="h-5 w-5 text-accent" />
                      Software & Tools
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {internship.software.map((tool: string) => (
                        <Badge key={tool} variant="secondary" className="text-sm">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  {internship.certifications.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-5 w-5 text-accent" />
                          Preferred Certifications
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {internship.certifications.map((cert: string) => (
                            <Badge
                              key={cert}
                              className="bg-accent/10 text-accent border-accent text-sm"
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related */}
            {relatedInternships.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Similar Opportunities</h2>
                <div className="space-y-4">
                  {relatedInternships.map((r) => (
                    <InternshipCard key={r.id} internship={r} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ApplyButton internshipId={internship.id} internshipTitle={internship.title} />

                  {/* SAVE BUTTON */}
                  <Button
                    variant={isSaved ? "destructive" : "outline"}
                    className="w-full"
                    onClick={isSaved ? handleUnsave : handleSave}
                  >
                    {isSaved ? "Remove from Saved" : "Save for Later"}
                  </Button>

                  <Separator />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{internship.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Work Mode</span>
                      <span className="font-medium">{internship.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{internship.duration}</span>
                    </div>
                    {internship.isPaid && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stipend</span>
                        <span className="font-medium text-success">
                          £{internship.stipend}/month
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About {internship.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {internship.company} is a leading company in the{" "}
                    {internship.category.toLowerCase()} sector offering
                    excellent growth opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
