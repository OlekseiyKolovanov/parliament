import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Users,
  FileText,
  Gavel,
  Briefcase,
  Scale,
  Building2,
  Video,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Users,
    title: "Верховна Рада",
    description: "Співробітники та структура парламенту",
    href: "/staff",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Video,
    title: "Медіа-центр",
    description: "Відео, фото та прес-релізи",
    href: "/media",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Scale,
    title: "Адвокатура",
    description: "Оголошення, лекції та інформація",
    href: "/legal",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: FileText,
    title: "Накази Президента",
    description: "Нормативно-правові акти",
    href: "/orders",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    icon: Briefcase,
    title: "Тендери",
    description: "Відкриті тендери та пропозиції",
    href: "/tenders",
    gradient: "from-indigo-500/10 to-blue-500/10",
  },
  {
    icon: Building2,
    title: "Підприємства",
    description: "Реєстр підприємств",
    href: "/enterprises",
    gradient: "from-rose-500/10 to-red-500/10",
  },
  {
    icon: Gavel,
    title: "Адвокати",
    description: "Ліцензовані адвокати",
    href: "/advocates",
    gradient: "from-teal-500/10 to-cyan-500/10",
  },
]

const stats = [
  { icon: Users, label: "Громадян обслуговано", value: "50,000+" },
  { icon: FileText, label: "Документів оброблено", value: "12,500+" },
  { icon: Award, label: "Успішних проектів", value: "350+" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col page-transition">
      <section className="relative overflow-hidden gradient-primary">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float [animation-delay:1s]" />

        <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center justify-center animate-pulse-glow">
              <Shield className="h-24 w-24 text-primary drop-shadow-2xl" />
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance animate-fade-in bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Президент Західної України
            </h1>

            <p className="mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl text-pretty animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Офіційний портал державної влади. Прозорість, відкритість та служіння народу.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
              <Button asChild size="lg" className="btn-enhanced shadow-2xl hover-lift text-base">
                <Link href="/president">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Про Президента
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass hover-lift text-base bg-transparent">
                <Link href="/media">
                  <Video className="mr-2 h-5 w-5" />
                  Медіа-центр
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="card-enhanced text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
            >
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-glow">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-base">{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-16 text-center animate-fade-in">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Розділи порталу
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">Вся необхідна інформація в одному місці</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link key={feature.href} href={feature.href} className="group">
              <Card
                className={`card-enhanced h-full transition-all duration-500 group-hover:shadow-2xl animate-fade-in bg-gradient-to-br ${feature.gradient}`}
                style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden gradient-secondary border-t border-border/50">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center justify-center animate-pulse-glow">
              <TrendingUp className="h-16 w-16 text-primary" />
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Маєте питання або пропозицію?
            </h2>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Ми завжди відкриті до діалогу з громадянами та готові розглянути ваші ініціативи
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-enhanced shadow-2xl hover-lift text-base">
                <Link href="/tenders">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Подати тендер
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass hover-lift text-base bg-transparent">
                <Link href="/legal">
                  <Scale className="mr-2 h-5 w-5" />
                  Правова допомога
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
