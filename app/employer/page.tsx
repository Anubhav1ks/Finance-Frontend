"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle2,
  Clock,
  Building2,
  Mail,
  Phone,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";
import API from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScheduleInterviewDialog from "@/components/ScheduleInterviewDialog";

const applicationStatusConfig = {
  pending: { label: "New Application", variant: "secondary" },
  reviewed: { label: "Under Review", variant: "default" },
  interview: { label: "Interview Scheduled", variant: "default" },
  rejected: { label: "Not Selected", variant: "destructive" },
};

export default function EmployerDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  // ============================================
  // 🔥 Load Profile + Listings + Applications
  // ============================================
  useEffect(() => {
    async function loadData() {
      try {
        const res = await API.get("/api/profile");

        setProfile(res.data.profile);
        setListings(res.data.internshipsCreated || []);

        // 🔥 Normalize applications to match UI format
        const formatted = (res.data.applicationsReceived || []).map((app: any) => ({
          id: app.id,
          applicantName: `${app.firstName} ${app.lastName}`,
          applicantEmail: app.email,
          internshipTitle: app.Internship?.title,
          internshipId: app.internshipId,
          appliedDate: app.createdOn,
          status: app.status.toLowerCase(),
        }));

        setApplications(formatted);
      } catch (err) {
        console.log("Dashboard load error:", err);
      }
    }

    loadData();
  }, []);

  // If profile not loaded → show loading screen
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  // ============================================
  // 🔥 API: Mark as Reviewed
  // ============================================
  const handleMarkReviewed = async (id: string) => {
    try {
      await API.patch(`/api/application/${id}/review`);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "reviewed" } : app
        )
      );
    } catch (err) {
      console.log("Mark Reviewed Error:", err);
    }
  };

  // ============================================
  // 🔥 API: Reject Application
  // ============================================
  const handleReject = async (id: string) => {
    try {
      await API.patch(`/api/application/${id}/reject`);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "rejected" } : app
        )
      );
    } catch (err) {
      console.log("Reject Error:", err);
    }
  };

  // ============================================
  // Dashboard Stats
  // ============================================
  const stats = {
    activeListings: listings.length,
    totalApplications: applications.length,
    pendingReview: applications.filter((app) => app.status === "pending").length,
    interviews: applications.filter((app) => app.status === "interview").length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ===========================
          HEADER
      ============================ */}
      <div className="bg-primary text-primary-foreground py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {profile.Company || profile.firstname + " " + profile.lastname}
                  </h1>
                  <p className="text-sm sm:text-base text-primary-foreground/80">
                    Employer Dashboard
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </span>
                {profile.mobile && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {profile.mobile}
                  </span>
                )}
              </div>
            </div>

            <Link href="/employer/post">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2" size="lg">
                <Plus className="h-5 w-5" />
                Post New Internship
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ===========================
          CONTENT
      ============================ */}
      <div className="container mx-auto px-4 py-8">
        {/* ===========================
            STATS
        ============================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground mb-1">Active Listings</p><p className="text-3xl font-bold">{stats.activeListings}</p></CardContent></Card>

          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground mb-1">Total Applications</p><p className="text-3xl font-bold">{stats.totalApplications}</p></CardContent></Card>

          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground mb-1">Pending Review</p><p className="text-3xl font-bold">{stats.pendingReview}</p></CardContent></Card>

          <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground mb-1">Interviews</p><p className="text-3xl font-bold">{stats.interviews}</p></CardContent></Card>
        </div>

        {/* ===========================
            TABS
        ============================ */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
          </TabsList>

          {/* ============================================
              APPLICATIONS TAB
          ============================================ */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead className="hidden sm:table-cell">Position</TableHead>
                        <TableHead className="hidden md:table-cell">Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {applications.map((application) => {
                        const config =
                          applicationStatusConfig[
                          application.status as keyof typeof applicationStatusConfig
                          ] || { label: application.status || "Unknown", variant: "default" };
                        const daysAgo = Math.floor(
                          (Date.now() - new Date(application.appliedDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                        );

                        return (
                          <TableRow key={application.id}>
                            <TableCell>
                              <p className="font-medium">{application.applicantName}</p>
                              <p className="text-sm text-muted-foreground">{application.applicantEmail}</p>
                            </TableCell>

                            <TableCell className="hidden sm:table-cell">
                              <p className="font-medium">{application.internshipTitle}</p>
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              <p className="text-sm">
                                {new Date(application.appliedDate).toLocaleDateString("en-GB")}
                              </p>
                              <p className="text-xs text-muted-foreground">{daysAgo} days ago</p>
                            </TableCell>

                            <TableCell>
                              <Badge>{config.label}</Badge>
                            </TableCell>

                            {/* ==== ACTION BUTTONS CONNECTED TO APIs ==== */}
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">

                                  <DropdownMenuItem
                                    onClick={() => handleMarkReviewed(application.id)}
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Mark as Reviewed
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedApplication(application.id);
                                      setDialogOpen(true);
                                    }}
                                  >
                                    <Users className="h-4 w-4 mr-2" />
                                    Schedule Interview
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleReject(application.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Reject Application
                                  </DropdownMenuItem>

                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============================================
              MY LISTINGS TAB
          ============================================ */}
          <TabsContent value="listings" className="space-y-4">
            {listings.length === 0 && (
              <p className="text-muted-foreground">You haven't posted any internships yet.</p>
            )}

            {listings.map((listing) => {
              const daysAgo = Math.floor(
                (Date.now() - new Date(listing.createdOn).getTime()) /
                (1000 * 60 * 60 * 24)
              );

              return (
                <Card key={listing.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{listing.title}</h3>
                        <p className="text-muted-foreground mb-2">{listing.companyName}</p>

                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-accent text-accent-foreground">
                            {listing.category}
                          </Badge>
                          <Badge variant="secondary">{listing.location}</Badge>
                          <Badge variant="secondary">{listing.mode}</Badge>
                        </div>

                        <div className="flex gap-4 text-sm text-muted-foreground mt-3">
                          <span>Posted {daysAgo} days ago</span>
                          <span>•</span>
                          <span>{listing.duration}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/internships/${listing.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="h-4 w-4" /> View
                          </Button>
                        </Link>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Listing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="h-4 w-4 mr-2" />
                              Close Applications
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Listing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
      <ScheduleInterviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        applicationId={selectedApplication}
      />

    </div>
  );
}
