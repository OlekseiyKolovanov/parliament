import { login } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Shield, LogIn } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 gradient-primary">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Вітаємо знову!
          </h1>
          <p className="text-muted-foreground">Увійдіть до свого акаунту</p>
        </div>

        <Card className="glass shadow-2xl hover-lift border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <LogIn className="h-5 w-5 text-primary" />
              Вхід
            </CardTitle>
            <CardDescription>Введіть ваші дані для входу в систему</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={login}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="glass"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" name="password" type="password" required className="glass" />
                </div>
                <Button type="submit" className="w-full shadow-lg hover-lift" size="lg">
                  Увійти
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                Немає акаунту?{" "}
                <Link href="/auth/sign-up" className="text-primary hover:underline underline-offset-4 font-semibold">
                  Зареєструватися
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
