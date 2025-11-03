import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/server"
import { Video } from "lucide-react"
import Image from "next/image"

export default async function MediaPage() {
  const supabase = await createClient()

  const { data: videos } = await supabase
    .from("media_items")
    .select("*")
    .eq("type", "video")
    .order("created_at", { ascending: false })

  const { data: photos } = await supabase
    .from("media_items")
    .select("*")
    .eq("type", "photo")
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Video className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Медіа-центр</h1>
        <p className="text-lg text-muted-foreground">Відео, фотографії та прес-релізи</p>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="videos">Відео</TabsTrigger>
          <TabsTrigger value="photos">Фото</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-8">
          {!videos || videos.length === 0 ? (
            <Card className="glass shadow-elegant mx-auto max-w-2xl">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Відео матеріали будуть додані найближчим часом</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <Card key={video.id} className="glass shadow-elegant overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <iframe src={video.url} title={video.title} className="h-full w-full" allowFullScreen />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  {video.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="photos" className="mt-8">
          {!photos || photos.length === 0 ? (
            <Card className="glass shadow-elegant mx-auto max-w-2xl">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Фотографії будуть додані найближчим часом</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <Card key={photo.id} className="glass shadow-elegant overflow-hidden">
                  <div className="aspect-video relative bg-muted">
                    <Image src={photo.url || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{photo.title}</CardTitle>
                  </CardHeader>
                  {photo.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{photo.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
