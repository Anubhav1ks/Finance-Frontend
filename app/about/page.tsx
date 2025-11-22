import { Users, Target, Award, TrendingUp, Briefcase, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C59D5F10_1px,transparent_1px),linear-gradient(to_bottom,#C59D5F10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">About FinanceHub</h1>
            <p className="text-base md:text-lg lg:text-xl text-primary-foreground/80 text-pretty leading-relaxed">
              Connecting ambitious students with leading finance and accounting firms since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-lg mb-4 md:mb-6">
                  <Target className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  To bridge the gap between talented students and top finance firms, making career opportunities
                  accessible and transparent. We believe every student deserves a fair chance to launch their finance
                  career.
                </p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-lg mb-4 md:mb-6">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Values</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Transparency, accessibility, and excellence drive everything we do. We're committed to creating a
                  platform that serves both students and employers with integrity and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3 md:mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">5,000+</div>
                  <div className="text-sm md:text-base text-muted-foreground">Students Placed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3 md:mb-4">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">35+</div>
                  <div className="text-sm md:text-base text-muted-foreground">Partner Firms</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3 md:mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">95%</div>
                  <div className="text-sm md:text-base text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3 md:mb-4">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">120+</div>
                  <div className="text-sm md:text-base text-muted-foreground">Active Listings</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Our Story</h2>
            <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-4 md:space-y-6">
              <p className="leading-relaxed">
                FinanceHub was founded in 2020 by a group of finance professionals who recognized the challenges
                students face when searching for quality internships. Having experienced the frustration of scattered
                job postings and opaque application processes, we set out to create a better solution.
              </p>
              <p className="leading-relaxed">
                What started as a simple job board has evolved into a comprehensive platform connecting students with
                opportunities across audit, tax, corporate finance, risk management, and FinTech. We've partnered with
                leading firms including the Big Four, boutique consultancies, and innovative startups.
              </p>
              <p className="leading-relaxed">
                Today, FinanceHub serves thousands of students and dozens of employers, facilitating meaningful
                connections that launch careers and build teams. Our commitment to transparency, accessibility, and
                excellence continues to drive our growth and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-balance">Join Our Community</h2>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8 text-pretty leading-relaxed px-4">
              Whether you're a student looking for your next opportunity or an employer seeking top talent, we're here
              to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
