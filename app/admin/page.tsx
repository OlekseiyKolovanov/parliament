import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Users, Video, FileText, Briefcase, Building2, Gavel, Scale } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: staffCount },
    { count: mediaCount },
    { count: legalCount },
    { count: ordersCount },
    { count: tendersCount },
    { count: enterprisesCount },
    { count: advocatesCount },
  ] = await Promise.all([
    supabase.from("staff_members").select("*", { count: "exact", head: true }),
    supabase.from("media_items").select("*", { count: "exact", head: true }),
    supabase.from("legal_documents").select("*", { count: "exact", head: true }),
    supabase.from("presidential_orders").select("*", { count: "exact", head: true }),
    supabase.from("tenders").select("*", { count: "exact", head: true }),
    supabase.from("enterprises").select("*", { count: "exact", head: true }),
    supabase.from("advocates").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    { label: "Співробітники", value: staffCount || 0, icon: Users, href: "/admin/staff" },
    { label: "Медіа", value: mediaCount || 0, icon: Video, href: "/admin/media" },
    { label: "Адвокатура", value: legalCount || 0, icon: Scale, href: "/admin/legal" },
    { label: "Накази", value: ordersCount || 0, icon: FileText, href: "/admin/orders" },
    { label: "Тендери", value: tendersCount || 0, icon: Briefcase, href: "/admin/tenders" },
    { label: "Підприємства", value: enterprisesCount || 0, icon: Building2, href: "/admin/enterprises" },
    { label: "Адвокати", value: advocatesCount || 0, icon: Gavel, href: "/admin/advocates" },
  ]

  return (
    <div className="page-transition">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Панель управління
        </h1>
        <p className="text-muted-foreground mt-2">Огляд контенту сайту</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="card-enhanced animate-fade-in"
            style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: "forwards" }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
