'use client'
import Link from "next/link"
import {
  Search,
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  FileText,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { categories, mockInternships } from "@/lib/mock-data"
import { InternshipCard } from "@/components/internship-card"
import API from "@/lib/api"
import { useEffect, useState } from "react"
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
export default function HomePage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const featuredInternships = internships.slice(0, 3)




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








  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C59D5F10_1px,transparent_1px),linear-gradient(to_bottom,#C59D5F10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
              <span>120+ New Listings This Week</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance">
              Launch Your Finance Career
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-6 md:mb-8 text-pretty leading-relaxed px-4">
              Connect with top firms in audit, tax, corporate finance, and FinTech. Find internships that match your
              ambitions.
            </p>

            {/* Search Bar */}
            <div className="bg-background rounded-lg p-2 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Job title, keywords..." className="pl-10 border-0 bg-muted text-foreground" />
                </div>
                <div className="flex-1 relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Location" className="pl-10 border-0 bg-muted text-foreground" />
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-8">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Internships Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-balance">
              Featured Internships
            </h2>
            <p className="text-base md:text-lg text-muted-foreground text-pretty">
              Hand-picked opportunities from top finance firms
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {featuredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/browse">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                View All Internships
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-balance">How It Works</h2>
            <p className="text-base md:text-lg text-muted-foreground text-pretty">
              Your path to a finance career in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden border-2 hover:border-accent transition-colors">
              <CardContent className="p-6 md:p-8">
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">1</span>
                </div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-lg mb-4">
                  <Search className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse & Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore hundreds of internship opportunities across audit, tax, FP&A, risk, corporate finance, and
                  FinTech. Use our advanced filters to find the perfect match.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-accent transition-colors">
              <CardContent className="p-6 md:p-8">
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">2</span>
                </div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-lg mb-4">
                  <FileText className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Apply with Ease</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Submit your application with just a few clicks. Upload your CV, write a compelling cover letter, and
                  track all your applications in one place.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-accent transition-colors">
              <CardContent className="p-6 md:p-8">
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">3</span>
                </div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-lg mb-4">
                  <Rocket className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Launch Your Career</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get hired by top finance firms and start building your professional network. Gain real-world
                  experience and accelerate your career growth.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                Get Started Today
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">120+</div>
              <div className="text-sm md:text-base text-muted-foreground">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">35</div>
              <div className="text-sm md:text-base text-muted-foreground">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">£800</div>
              <div className="text-sm md:text-base text-muted-foreground">Avg Monthly Stipend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-balance">
              Explore Finance Categories
            </h2>
            <p className="text-base md:text-lg text-muted-foreground text-pretty">
              Find internships in your area of interest
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link key={category.name} href={`/browse?category=${category.name}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:border-accent cursor-pointer h-full">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="text-3xl md:text-4xl">{category.icon}</div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">{category.count} open positions</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/browse">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                View All Internships
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-balance">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8 text-pretty leading-relaxed px-4">
              Join thousands of students who have launched their finance careers through FinanceHub. Create your profile
              and start applying today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
