"use client"

import Link from "next/link"
import {
  Briefcase,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Shield,
  Building2,
  Plus,
  CalendarIcon,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ACCESS_TOKEN } from "@/Constant"
import { useRouter } from "next/navigation";

export function Navbar() {

  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEmployer, setIsEmployer] = useState(false)

  // ================================================
  // 🔥 Check token + user type in localStorage
  // ================================================
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userType = user?.type;

      setIsAuthenticated(!!token);
      setIsAdmin(userType === 0);
      setIsEmployer(userType === 2);
    };

    checkAuth();

    window.addEventListener("auth-changed", checkAuth);
    window.addEventListener("storage", checkAuth); // for other tabs

    return () => {
      window.removeEventListener("auth-changed", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  // ================================================
  // 🔥 Logout
  // ================================================
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem("userType")
    setIsAuthenticated(false)
    setIsAdmin(false)
    setIsEmployer(false)
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-accent/20 backdrop-blur-sm bg-primary/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
            <Briefcase className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-accent transition-colors">FinanceHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-accent group relative">Home</Link>
            <Link href="/browse" className="hover:text-accent group relative">Browse Internships</Link>
            <Link href="/about" className="hover:text-accent group relative">About</Link>
            <Link href="/contact" className="hover:text-accent group relative">Contact</Link>
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isEmployer ? (
              // ========================= Employer Menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hover:text-accent">
                    <Building2 className="h-4 w-4" />
                    Employer Portal
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ background: "white" }} className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/employer"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/employer/post"><Plus className="mr-2 h-4 w-4" />Post Internship</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/analytics"><BarChart3 className="mr-2 h-4 w-4" />Analytics</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            ) : isAuthenticated ? (
              // ========================= Student Menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hover:text-accent">
                    <User className="h-4 w-4" />
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" style={{ background: "white" }}>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                  </DropdownMenuItem>


                  {
                    !isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/interviews"><CalendarIcon className="mr-2 h-4 w-4" />Interviews</Link>
                      </DropdownMenuItem>

                    )
                  }

                  {/* <DropdownMenuItem asChild>
                    <Link href="/account"><Settings className="mr-2 h-4 w-4" />Account Settings</Link>
                  </DropdownMenuItem> */}

                  {/* Admin Options */}
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem asChild>
                        <Link href="/analytics" className="text-accent">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              // ========================= Not logged in
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hover:text-accent">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-accent/20">

            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/browse" onClick={() => setMobileMenuOpen(false)}>Browse Internships</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

            {/* Employer Section */}
            {isEmployer ? (
              <>
                <Link href="/employer" onClick={() => setMobileMenuOpen(false)}>Employer Dashboard</Link>
                <Link href="/employer/post" onClick={() => setMobileMenuOpen(false)}>Post Internship</Link>
                <Link href="/analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>

                <Button
                  variant="outline"
                  className="w-full border-destructive text-destructive"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : isAuthenticated ? (
              <>


                {isAdmin ? (
                  <>
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                    <Link href="/analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                    <Link href="/interviews" onClick={() => setMobileMenuOpen(false)}>Interviews</Link>
                  </>
                )}

                <Button
                  variant="outline"
                  className="w-full border-destructive text-destructive"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>

                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
