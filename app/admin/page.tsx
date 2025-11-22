"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  CheckCircle2,
  Clock,
  Plus,
  View,
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
  pending: { label: "Pending Review", variant: "secondary" },
  reviewed: { label: "Reviewed", variant: "default" },
  interview: { label: "Interview Scheduled", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export default function AdminPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  // ======================================================
  // 🔥 Load All Listings + Applications from API
  // ======================================================
  useEffect(() => {
    async function loadAdminData() {
      try {
        const res = await API.get("/api/profile/admin");

        const allListings = res.data.internshipsCreated || [];
        const allApplications = res.data.applicationsSubmitted || [];

        const normalized = allApplications.map((app: any) => ({
          id: app.id,
          applicantName: `${app.firstName} ${app.lastName}`,
          applicantEmail: app.email,
          internshipTitle: app.Internship?.title,
          internshipId: app.internshipId,
          appliedDate: app.createdOn,
          status: app.status?.toLowerCase(),
        }));

        setListings(allListings);
        setApplications(normalized);
      } catch (err) {
        console.log("Admin load error:", err);
      }
    }

    loadAdminData();
  }, []);

  // ======================================================
  // 🔥 Mark Application as Reviewed
  // ======================================================
  const handleMarkReviewed = async (id: string) => {
    try {
      await API.patch(`/api/application/${id}/review`);
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "reviewed" } : a))
      );
    } catch (err) {
      console.log("Mark Reviewed Error:", err);
    }
  };

  // ======================================================
  // 🔥 Reject Application
  // ======================================================
  const handleReject = async (id: string) => {
    try {
      await API.patch(`/api/application/${id}/reject`);
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
      );
    } catch (err) {
      console.log("Reject Error:", err);
    }
  };

  // ======================================================
  // 📊 Dashboard stats
  // ======================================================
  const stats = {
    totalListings: listings.length,
    activeListings: listings.length,
    totalApplications: applications.length,
    pendingReview: applications.filter((a) => a.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* HEADER */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Panel</h1>
              <p className="text-lg text-primary-foreground/80">Manage internships and applications</p>
            </div>
            <Link href="/analytics">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2" size="lg">
                <View className="h-5 w-5" />
                Analatics
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Total Listings */}
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Listings</p>
                <p className="text-3xl font-bold">{stats.totalListings}</p>
              </div>
              <Briefcase className="h-6 w-6 text-primary" />
            </CardContent>
          </Card>

          {/* Active Listings */}
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-3xl font-bold">{stats.activeListings}</p>
              </div>
              <TrendingUp className="h-6 w-6 text-success" />
            </CardContent>
          </Card>

          {/* Total Apps */}
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-3xl font-bold">{stats.totalApplications}</p>
              </div>
              <Users className="h-6 w-6 text-accent" />
            </CardContent>
          </Card>

          {/* Pending */}
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold">{stats.pendingReview}</p>
              </div>
              <Clock className="h-6 w-6 text-blue-500" />
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          {/* ===========================
              LISTINGS TAB
          ============================ */}
          <TabsContent value="listings" className="space-y-4">
            {listings.map((listing) => {
              const daysAgo = Math.floor(
                (Date.now() - new Date(listing.createdOn).getTime()) /
                (1000 * 60 * 60 * 24)
              );

              const appsCount = applications.filter(
                (a) => a.internshipId === listing.id
              ).length;

              return (
                <Card key={listing.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{listing.title}</h3>
                      <p className="text-muted-foreground mb-2">{listing.companyName}</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-accent text-accent-foreground">
                          {listing.category}
                        </Badge>
                        <Badge variant="secondary">{listing.location}</Badge>
                        <Badge variant="outline" className="gap-1">
                          <Users className="h-3 w-3" /> {appsCount} applicants
                        </Badge>
                      </div>

                      <div className="text-sm text-muted-foreground mt-3">
                        Posted {daysAgo} days ago • {listing.duration}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/internships/${listing.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" /> View
                        </Button>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* ===========================
              APPLICATIONS TAB
          ============================ */}
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
                        <TableHead>Position</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {applications.map((application) => {
                        const config =
                          applicationStatusConfig[
                          application.status as keyof typeof applicationStatusConfig
                          ];
                        const daysAgo = Math.floor(
                          (Date.now() - new Date(application.appliedDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                        );

                        return (
                          <TableRow key={application.id}>
                            <TableCell>
                              <p className="font-semibold">{application.applicantName}</p>
                              <p className="text-sm text-muted-foreground">
                                {application.applicantEmail}
                              </p>
                            </TableCell>

                            <TableCell>{application.internshipTitle}</TableCell>

                            <TableCell>
                              <p>{new Date(application.appliedDate).toLocaleDateString("en-GB")}</p>
                              <p className="text-xs text-muted-foreground">{daysAgo} days ago</p>
                            </TableCell>

                            <TableCell>
                              <Badge variant={config.variant}>{config.label}</Badge>
                            </TableCell>

                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() => handleMarkReviewed(application.id)}
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Mark Reviewed
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
                                    Reject
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
        </Tabs>
      </div>

      {/* INTERVIEW SCHEDULER MODAL */}
      <ScheduleInterviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        applicationId={selectedApplication}
      />
    </div>
  );
}
