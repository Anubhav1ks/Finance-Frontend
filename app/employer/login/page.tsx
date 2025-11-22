"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Briefcase, Mail, Lock, ArrowRight, Eye, EyeOff, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function EmployerLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Employer login attempt:", { email })
    // Mock login - redirect to employer dashboard
    router.push("/employer")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl mb-6">
              <Briefcase className="h-7 w-7 text-accent" />
              <span>FinanceHub</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Employer Portal</h1>
            <p className="text-muted-foreground">Sign in to manage your internship postings</p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                Employer Sign In
              </CardTitle>
              <CardDescription>Access your recruiter dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="recruiter@company.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <Link href="/reset-password" className="text-sm text-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign In to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Looking for internships? </span>
                  <Link href="/login" className="text-accent font-medium hover:underline">
                    Student Login
                  </Link>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">New employer? </span>
                  <Link href="/employer/signup" className="text-accent font-medium hover:underline">
                    Register your company
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-primary text-primary-foreground p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C59D5F10_1px,transparent_1px),linear-gradient(to_bottom,#C59D5F10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="h-4 w-4" />
            <span>Trusted by 500+ Companies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            Find Top Finance Talent for Your Organization
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            Connect with ambitious finance students from top universities. Post internships, review applications, and
            build your future team.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Qualified Candidates</h3>
                <p className="text-sm text-primary-foreground/70">
                  Access pre-screened students from top finance programs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Easy Management</h3>
                <p className="text-sm text-primary-foreground/70">
                  Post jobs and manage applications from one dashboard
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fast Hiring</h3>
                <p className="text-sm text-primary-foreground/70">Reduce time-to-hire with streamlined workflows</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
