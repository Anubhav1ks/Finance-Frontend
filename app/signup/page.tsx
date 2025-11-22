"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

import {
  Briefcase, Mail, Lock, User, ArrowRight, Eye, EyeOff,
  GraduationCap, Building2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import API from "@/lib/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/Constant"

export default function SignupPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState<"student" | "employer">("student")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  })

  /* =============================
        🔥 SIGNUP API CALL
  ============================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        University: accountType === "student" ? formData.university : null,
        Company: accountType === "employer" ? formData.companyName : null,
        type: accountType === "student" ? 1 : 2,
        istermsaccepted: true,
        deviceInfo: {
          deviceId: "web",
          deviceName: "browser"
        }
      }

      const res = await API.post("/api/signup", payload)

      // Save tokens
      localStorage.setItem(ACCESS_TOKEN, res.data.data.accessToken)
      localStorage.setItem(REFRESH_TOKEN, res.data.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(res.data.data.user))
window.dispatchEvent(new Event("auth-changed"));


      toast.success("Signup successful! Redirecting...")

      if (payload.type === 2) {
        router.push("/employer")   // Redirect anywhere you want
      }
      if (payload.type === 1) {
        router.push("/dashboard")   // Redirect anywhere you want
      }
      if (res.data.data.user.type === 0) {
        router.push("/admin")   // Redirect anywhere you want
      }


    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side Branding */}
      <div className="hidden lg:flex flex-1 bg-primary text-primary-foreground p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C59D5F10_1px,transparent_1px),linear-gradient(to_bottom,#C59D5F10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4" />
            <span>Start Your Journey Today</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Build Your Finance Career</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Create your free account and get instant access to exclusive internship opportunities.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl mb-6">
              <Briefcase className="h-7 w-7 text-accent" />
              <span>FinanceHub</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Join thousands of students</p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Fill in your details to get started</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <Label className="mb-3 block">I am a</Label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("student")}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 ${accountType === "student"
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
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 ${accountType === "employer"
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
                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
                      <Input
                        className="pl-10"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
                    <Input
                      type="email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* University / Company */}
                {accountType === "student" ? (
                  <div>
                    <Label>University</Label>
                    <Input
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                    />
                  </div>
                )}

                {/* Password */}
                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4" /> : <Eye className="h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4" /> : <Eye className="h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-accent">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-accent">Privacy Policy</Link>
                  </label>
                </div>

                <Button disabled={loading} className="w-full bg-primary text-primary-foreground">
                  {loading ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-accent font-medium">Sign in</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
