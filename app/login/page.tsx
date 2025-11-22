"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Briefcase, Mail, Lock, ArrowRight, Eye, EyeOff, GraduationCap, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import API from "@/lib/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/Constant"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [accountType, setAccountType] = useState<"student" | "employer">("student")

  /* ======================================
      🔥 LOGIN API IMPLEMENTATION
  ====================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email,
        password,
        deviceInfo: {
          deviceId: "web",
          deviceName: "browser",
        },
      };

      const res = await API.post("/api/signin", payload);

      // Save tokens
      localStorage.setItem(ACCESS_TOKEN, res.data.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, res.data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      toast.success("Login successful! Redirecting...");
window.dispatchEvent(new Event("auth-changed"));

      // -------------------------------------------------
      // 🔥 CHECK IF LOGIN WAS TRIGGERED FROM A REDIRECT
      // -------------------------------------------------
      const redirectUrl =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null;

      if (redirectUrl) {
        router.push(redirectUrl);
        return; // Stop role redirects
      }

      // -------------------------------------------------
      // 🔥 NORMAL ROLE-BASED REDIRECTIONS
      // -------------------------------------------------
      if (res.data.data.user.type === 2) {
        router.push("/employer");
      }
      if (res.data.data.user.type === 1) {
        router.push("/dashboard");
      }
      if (res.data.data.user.type === 0) {
        router.push("/admin");
      }

    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };


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
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to continue your finance career journey</p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label className="mb-3 block">I am a</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("student")}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${accountType === "student"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/50"
                      }`}
                  >
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("employer")}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${accountType === "employer"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/50"
                      }`}
                  >
                    <Building2 className="h-5 w-5" />
                    <span className="font-medium">Employer</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
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

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/signup" className="text-accent font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side Branding */}
      <div className="hidden lg:flex flex-1 bg-primary text-primary-foreground p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C59D5F10_1px,transparent_1px),linear-gradient(to_bottom,#C59D5F10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Briefcase className="h-4 w-4" />
            <span>Trusted by 10,000+ Students</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-balance">Your Gateway to Finance Excellence</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            Join thousands of ambitious students who launched careers in finance through our platform.
          </p>
        </div>
      </div>
    </div>
  )
}
