"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ApplicationTimeline } from "@/components/application-timeline";
import {
  Briefcase,
  BookmarkIcon,
  User,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import API from "@/lib/api";

const statusConfig = {
  under_review: {
    label: "Under Review",
    icon: Clock,
    variant: "secondary",
  },
  interview: {
    label: "Interview Scheduled",
    icon: CheckCircle2,
    variant: "default",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    variant: "default",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    variant: "destructive",
  },
};

export default function DashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [savedInternships, setSavedInternships] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [savedLoading, setSavedLoading] = useState(true);

  // ------------------------------------------
  // FETCH APPLICATIONS
  // ------------------------------------------
  const fetchApplications = async () => {
    try {
      const res = await API.get("/api/applications/student");

      const formatted = res.data.applications.map((app: any) => ({
        id: app.id,
        status: app.status.toLowerCase(),
        appliedDate: app.createdOn,
        lastUpdated: app.updatedOn ?? app.createdOn,

        internship: {
          id: app.Internship?.id,
          title: app.Internship?.title,
          company: app.Internship?.companyName,
          location: app.Internship?.location,
          mode: app.Internship?.mode,
          category: app.Internship?.category ?? "General",
          duration: app.Internship?.duration,
        },

        interviewDate: app.interviewDate || null,
      }));

      setApplications(formatted);
    } catch (error) {
      console.log("Failed to load applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // FETCH SAVED INTERNSHIPS
  // ------------------------------------------
  const fetchSavedInternships = async () => {
    try {
      const res = await API.get("/api/internships/saved");
      const mapped = res.data.savedInternships.map((item: any) => ({
        id: item.Internship.id,
        title: item.Internship.title,
        company: item.Internship.companyName,
        location: item.Internship.location,
        mode: item.Internship.mode,
        category: item.Internship.category,
        duration: item.Internship.duration,
        stipend: item.Internship.monthlyStipend,
        createdOn: item.Internship.createdOn,
      }));

      setSavedInternships(mapped);
    } catch (error) {
      console.log("Failed to load saved internships:", error);
    } finally {
      setSavedLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchSavedInternships();
  }, []);

  // ------------------------------------------
  // UNSAVE INTERNSHIP
  // ------------------------------------------
  const handleUnsave = async (id: string) => {
    try {
      await API.delete(`/api/services/save/${id}`);
      setSavedInternships((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const stats = {
    total: applications.length,
    underReview: applications.filter((a) => a.status === "under_review").length,
    interviews: applications.filter((a) => a.status === "interview").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
  };

  if (loading)
    return (
      <div className="flex justify-center py-20 text-lg font-medium">
        Loading applications...
      </div>
    );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-lg opacity-80">
            Track your applications and manage your profile
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm opacity-70">Total Applications</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Briefcase className="h-10 w-10 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm opacity-70">Under Review</p>
                  <p className="text-3xl font-bold">{stats.underReview}</p>
                </div>
                <Clock className="h-10 w-10 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm opacity-70">Interviews</p>
                  <p className="text-3xl font-bold">{stats.interviews}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm opacity-70">Accepted</p>
                  <p className="text-3xl font-bold">{stats.accepted}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 opacity-50 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Applications */}
          <TabsContent value="applications" className="space-y-4">
            {applications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 opacity-50 mx-auto" />
                  <p className="mt-4 text-lg font-medium">
                    You haven't applied to any internships yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              applications.map((app) => {
                const config =
                  statusConfig[
                    app.status as keyof typeof statusConfig
                  ] || statusConfig.under_review;
                const StatusIcon = config.icon;

                return (
                  <Card key={app.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <Link href={`/internships/${app.internship.id}`}>
                            <h3 className="text-xl font-semibold hover:text-accent cursor-pointer">
                              {app.internship.title}
                            </h3>
                          </Link>

                          <p className="text-muted-foreground mb-2">
                            {app.internship.company}
                          </p>

                          <div className="flex gap-2 mb-4">
                            <Badge variant={config.variant}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>

                            <Badge variant="outline">
                              {app.internship.location}
                            </Badge>
                            <Badge variant="outline">{app.internship.mode}</Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            Applied:{" "}
                            {new Date(app.appliedDate).toLocaleDateString("en-GB")}
                          </p>

                          {app.status === "interview" && app.interviewDate && (
                            <p className="text-sm text-accent font-medium">
                              Interview on:{" "}
                              {new Date(app.interviewDate).toLocaleDateString("en-GB")}
                            </p>
                          )}
                        </div>

                        <div className="w-full lg:w-1/3">
                          <ApplicationTimeline applicationStatus={app.status} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* --------------------------------------- */}
          {/* SAVED INTERNSHIPS TAB */}
          {/* --------------------------------------- */}
          <TabsContent value="saved" className="space-y-4">
            {savedLoading ? (
              <p className="py-10 text-center">Loading saved internships...</p>
            ) : savedInternships.length > 0 ? (
              savedInternships.map((internship) => (
                <Card key={internship.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/internships/${internship.id}`}>
                          <h3 className="text-xl font-semibold mb-1 hover:text-accent transition-colors cursor-pointer">
                            {internship.title}
                          </h3>
                        </Link>

                        <p className="text-muted-foreground mb-3">
                          {internship.company}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{internship.category}</Badge>
                          <Badge variant="secondary">{internship.location}</Badge>
                          <Badge variant="secondary">{internship.mode}</Badge>

                          {internship.stipend && (
                            <Badge className="bg-success text-success-foreground">
                              £{internship.stipend}/month
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/internships/${internship.id}`}>
                          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Apply
                          </Button>
                        </Link>

                        {/* REMOVE BUTTON */}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUnsave(internship.id)}
                          className="bg-transparent hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Saved Internships
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Save internships to apply later
                  </p>
                  <Link href="/browse">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Browse Internships
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PROFILE TAB (unchanged) */}
         {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-accent" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="text-lg">John Doe</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-lg">john.doe@example.com</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-lg">+44 7700 900000</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                        <p className="text-lg">London, UK</p>
                      </div>
                    </div>
                    {/* <Button variant="outline" className="bg-transparent">
                      Edit Profile
                    </Button> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-accent" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-lg">BSc Finance</p>
                      <p className="text-muted-foreground">University of London</p>
                      <p className="text-sm text-muted-foreground">Expected Graduation: 2026</p>
                    </div>
                    {/* <Button variant="outline" className="bg-transparent">
                      Edit Education
                    </Button> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-accent" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Financial Analysis</Badge>
                      <Badge variant="secondary">Excel</Badge>
                      <Badge variant="secondary">PowerPoint</Badge>
                      <Badge variant="secondary">Data Analysis</Badge>
                      <Badge variant="secondary">Accounting</Badge>
                      <Badge variant="secondary">Financial Modeling</Badge>
                    </div>
                    {/* <Button variant="outline" className="bg-transparent">
                      Edit Skills
                    </Button> */}
                  </CardContent>
                </Card>
              </div>

              {/* Profile Completion */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Profile Completion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">75% Complete</span>
                        <span className="text-sm text-muted-foreground">3/4</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Personal Info</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Education</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Skills</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">CV Upload</p>
                          <p className="text-xs text-muted-foreground">Pending</p>
                        </div>
                      </div>
                    </div>

                    {/* <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Complete Profile
                    </Button> */}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
