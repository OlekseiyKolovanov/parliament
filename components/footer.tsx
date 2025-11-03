import { Shield, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 glass mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary animate-glow" />
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ПЗУ
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Офіційний портал Президента Західної України. Прозорість, відкритість та служіння народу.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Швидкі посилання</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/president" className="text-muted-foreground hover:text-primary transition-colors">
                  Про Президента
                </Link>
              </li>
              <li>
                <Link href="/staff" className="text-muted-foreground hover:text-primary transition-colors">
                  Верховна Рада
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-muted-foreground hover:text-primary transition-colors">
                  Медіа-центр
                </Link>
              </li>
              <li>
                <Link href="/tenders" className="text-muted-foreground hover:text-primary transition-colors">
                  Тендери
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Послуги</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-primary transition-colors">
                  Адвокатура
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-primary transition-colors">
                  Накази Президента
                </Link>
              </li>
              <li>
                <Link href="/enterprises" className="text-muted-foreground hover:text-primary transition-colors">
                  Підприємства
                </Link>
              </li>
              <li>
                <Link href="/advocates" className="text-muted-foreground hover:text-primary transition-colors">
                  Адвокати
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Контакти</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>info@president-zu.gov.ua</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span>+380 (44) 123-45-67</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>м. Львів, вул. Городоцька, 1</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Президент Західної України. Всі права захищені.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Конфіденційність
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
