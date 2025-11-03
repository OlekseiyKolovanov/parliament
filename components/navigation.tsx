"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X, LogIn, UserPlus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Головна" },
  { href: "/president", label: "Президент" },
  { href: "/staff", label: "Верховна Рада" },
  { href: "/media", label: "Медіа-центр" },
  { href: "/legal", label: "Адвокатура" },
  { href: "/orders", label: "Накази" },
  { href: "/tenders", label: "Тендери" },
  { href: "/enterprises", label: "Підприємства" },
  { href: "/advocates", label: "Адвокати" },
]

export function Navigation({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg group">
            <Shield className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Президент Західної України
            </span>
            <span className="sm:hidden bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ПЗУ</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAdmin ? (
              <Button asChild variant="default" size="sm" className="hidden sm:flex shadow-lg hover-lift">
                <Link href="/admin">Адмін-панель</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                  <Link href="/auth/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Увійти
                  </Link>
                </Button>
                <Button asChild variant="default" size="sm" className="hidden sm:flex shadow-lg hover-lift">
                  <Link href="/auth/sign-up">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Реєстрація
                  </Link>
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin ? (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-lg"
              >
                Адмін-панель
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Увійти
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-lg"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Реєстрація
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
