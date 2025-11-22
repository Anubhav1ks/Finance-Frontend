"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Briefcase, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/mock-data";
import { InternshipCard } from "@/components/internship-card";
import API from "@/lib/api";
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


export default function BrowsePage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [paidOnly, setPaidOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  // ⬇️ Fetch internships from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/api/services");
        const apiData = res.data.data || [];

        const transformed = apiData.map(transformInternship);

        setInternships(transformed);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // ⬇️ Filter + sort internships
  const filteredInternships = useMemo(() => {
    let filtered = internships;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.jobDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location
    if (locationQuery) {
      filtered = filtered.filter((internship) =>
        internship.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((internship) =>
        selectedCategories.includes(internship.category)
      );
    }

    // Mode
    if (selectedModes.length > 0) {
      filtered = filtered.filter((internship) =>
        selectedModes.includes(internship.mode)
      );
    }

    // Paid
    if (paidOnly) {
      filtered = filtered.filter((internship) => internship.isPaid);
    }

    // Sort
    if (sortBy === "recent") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "stipend-high") {
      filtered = [...filtered].sort((a, b) => (b.monthlyStipend || 0) - (a.monthlyStipend || 0));
    } else if (sortBy === "stipend-low") {
      filtered = [...filtered].sort((a, b) => (a.monthlyStipend || 0) - (b.monthlyStipend || 0));
    }

    return filtered;
  }, [
    internships,
    searchQuery,
    locationQuery,
    selectedCategories,
    selectedModes,
    paidOnly,
    sortBy,
  ]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategories([]);
    setSelectedModes([]);
    setPaidOnly(false);
    setSortBy("recent");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedModes.length +
    (paidOnly ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (locationQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Internships</h1>
          <p className="text-lg text-primary-foreground/80">
            Discover {internships.length} opportunities
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button
                variant="outline"
                className="md:hidden bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Category</h3>
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => toggleCategory(category.name)}
                      />
                      <Label className="cursor-pointer flex-1">
                        {category.icon} {category.name}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Work Mode */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Work Mode</h3>
                  {["Remote", "Hybrid", "Onsite"].map((mode) => (
                    <div key={mode} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedModes.includes(mode)}
                        onCheckedChange={() => toggleMode(mode)}
                      />
                      <Label className="cursor-pointer">{mode}</Label>
                    </div>
                  ))}
                </div>

                {/* Paid Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Compensation</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={paidOnly}
                      onCheckedChange={(checked) => setPaidOnly(!!checked)}
                    />
                    <Label className="cursor-pointer">Paid only</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Loader */}
            {loading ? (
              <p className="text-center py-10">Loading internships...</p>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing <b>{filteredInternships.length}</b> of{" "}
                    <b>{internships.length}</b> internships
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="stipend-high">Highest Stipend</SelectItem>
                        <SelectItem value="stipend-low">Lowest Stipend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Internship Cards */}
                {filteredInternships.length > 0 ? (
                  <div className="space-y-4">
                    {filteredInternships.map((internship) => (
                      <InternshipCard key={internship.id} internship={internship} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No internships found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters
                      </p>
                      <Button onClick={clearFilters}>Clear filters</Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
