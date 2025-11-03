import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Users } from "lucide-react"

export default async function StaffPage() {
  const supabase = await createClient()

  const { data: staff } = await supabase.from("staff_members").select("*").order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Верховна Рада</h1>
        <p className="text-lg text-muted-foreground">Співробітники парламенту Західної України</p>
      </div>

      {!staff || staff.length === 0 ? (
        <Card className="glass shadow-elegant mx-auto max-w-2xl">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Інформація про співробітників буде додана найближчим часом</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <Card key={member.id} className="glass shadow-elegant">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.photo_url || undefined} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {member.position}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              {(member.bio || member.telegram) && (
                <CardContent>
                  {member.bio && <p className="text-sm text-muted-foreground mb-2">{member.bio}</p>}
                  {member.telegram && <p className="text-sm text-primary">Telegram: {member.telegram}</p>}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
