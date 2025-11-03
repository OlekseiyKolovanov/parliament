"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Video, Scale, FileText, User, Briefcase, Building2, Gavel, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "/admin", label: "Панель управління", icon: LayoutDashboard },
  { href: "/admin/staff", label: "Співробітники", icon: Users },
  { href: "/admin/media", label: "Медіа", icon: Video },
  { href: "/admin/legal", label: "Адвокатура", icon: Scale },
  { href: "/admin/orders", label: "Накази", icon: FileText },
  { href: "/admin/president", label: "Президент", icon: User },
  { href: "/admin/tenders", label: "Тендери", icon: Briefcase },
  { href: "/admin/enterprises", label: "Підприємства", icon: Building2 },
  { href: "/admin/advocates", label: "Адвокати", icon: Gavel },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl p-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Адмін-панель</h2>
        <p className="text-sm text-muted-foreground">Керування контентом</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 pt-6 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-3 h-4 w-4" />
          Вийти
        </Button>
      </div>
    </aside>
  )
}
