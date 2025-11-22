"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  TrendingUp,
  Users,
  Briefcase,
  Award,
} from "lucide-react";
import { ACCESS_TOKEN } from "@/Constant";


export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  // analytics state
  const [applicationTrendsData, setApplicationTrendsData] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [topCompaniesData, setTopCompaniesData] = useState([]);
  const [successRateData, setSuccessRateData] = useState([]);

  const [totalApplications, setTotalApplications] = useState(0);
  const [totalOffers, setTotalOffers] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [activeInternships, setActiveInternships] = useState(0);

  // auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  // ==========================
  // 🔥 Load Analytics
  // ==========================
  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await API.get("/api/analytics");
        const a = res.data.analytics;

        setApplicationTrendsData(a.monthlyTrends || []);
        setCategoryDistribution(a.categoryDistribution || []);
        setTopCompaniesData(a.topCompanies || []);
        setSuccessRateData(a.funnel || []);

        setTotalApplications(a.totalApplications);
        setTotalOffers(a.totalOffers);
        setSuccessRate(a.successRate);
        setActiveInternships(a.activeInternships);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }

      setLoading(false);
    }

    loadAnalytics();
  }, []);

  // ==========================
  // 🔐 Check Auth & User Type
  // ==========================
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      setIsAuthenticated(!!token);
      setUserType(user?.type);
    };

    checkAuth();

    window.addEventListener("auth-changed", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("auth-changed", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // ==========================
  // 🚫 Restricted: Student View
  // ==========================
  if (userType === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">
          You do not have permission to view analytics.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-lg text-primary-foreground/80">
            Comprehensive insights into platform performance and statistics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ================= KEY METRICS ================= */}
        {userType === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

            {/* Total Applications */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                <p className="text-3xl font-bold">{totalApplications}</p>
              </CardContent>
            </Card>

            {/* Total Offers */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Offers</p>
                <p className="text-3xl font-bold">{totalOffers}</p>
              </CardContent>
            </Card>

            {/* Success Rate */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                <p className="text-3xl font-bold">{successRate}%</p>
              </CardContent>
            </Card>

            {/* Active Internships */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Active Internships</p>
                <p className="text-3xl font-bold">{activeInternships}</p>
              </CardContent>
            </Card>

          </div>
        )}

        {/* ================= TABS ================= */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            {/* Admin + Employer */}
            <TabsTrigger value="trends">Trends</TabsTrigger>

            {/* Admin Only */}
            {userType === 0 && (
              <TabsTrigger value="categories">Categories</TabsTrigger>
            )}

            {/* Admin Only */}
            {userType === 0 && (
              <TabsTrigger value="companies">Companies</TabsTrigger>
            )}

            {/* Admin + Employer */}
            <TabsTrigger value="funnel">Success Funnel</TabsTrigger>
          </TabsList>

          {/* ========== TRENDS ========== */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Application & Offer Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={applicationTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="applications" stroke="#0A2342" strokeWidth={3} />
                    <Line dataKey="offers" stroke="#C59D5F" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== CATEGORY (Admin Only) ========== */}
          {userType === 0 && (
            <TabsContent value="categories">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={categoryDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          dataKey="value"
                          label
                        >
                          {categoryDistribution.map((c, i) => (
                            <Cell key={i} fill={c.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categoryDistribution.map((category) => {
                        const pct = ((category.value / totalApplications) * 100).toFixed(1);
                        return (
                          <div key={category.category}>
                            <div className="flex justify-between mb-1">
                              <span className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full" style={{ background: category.color }} />
                                {category.category}
                              </span>
                              <span>{pct}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full" style={{ width: `${pct}%`, background: category.color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>
          )}

          {/* ========== COMPANIES (Admin Only) ========== */}
          {userType === 0 && (
            <TabsContent value="companies">
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={topCompaniesData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="companyName" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#C59D5F" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* ========== FUNNEL (Admin + Employer) ========== */}
          <TabsContent value="funnel">
            <Card>
              <CardHeader>
                <CardTitle>Application Success Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={successRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0A2342" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {successRateData.map((stage, index) => {
                    const prev = index > 0 ? successRateData[index - 1].count : stage.count;

                    return (
                      <div key={stage.stage} className="text-center bg-muted p-4 rounded-lg">
                        <p className="text-muted-foreground text-sm">{stage.stage}</p>
                        <p className="text-2xl font-bold">{stage.count}</p>

                        {index > 0 && (
                          <Badge variant="secondary">
                            {((stage.count / prev) * 100).toFixed(1)}% conversion
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
