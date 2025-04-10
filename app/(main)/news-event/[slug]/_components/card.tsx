import { MotionDiv } from "@/components/ui-extension/motion-div";
import { TextEditorViewer } from "@/components/ui-extension/text-editor";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NewsEvent } from "@/types/pooling.type";
import { format } from "date-fns";
import Image from "next/image";

interface NewsEventCardProps {
  newsEvent: NewsEvent;
}

export default function NewsEventCard({ newsEvent }: NewsEventCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card
        key={newsEvent.id}
        className="border-none bg-gradient-to-br from-zinc-950 to-black shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-sm px-3 py-1 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-medium">
              News & Events
            </span>
            <span className="text-xs text-zinc-400 font-mono">{newsEvent.slug}</span>
          </div>
          <CardTitle className="text-4xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent tracking-tight mb-4">
            {newsEvent.title}
          </CardTitle>
          {newsEvent.images && newsEvent.images.length > 0 && (
            <div className="mt-6 mb-2">
              <Carousel className="w-full">
                <CarouselContent>
                  {newsEvent.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <MotionDiv
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="relative overflow-hidden rounded-lg">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_FILE_URL}/news-events/${image}`}
                          alt={`${newsEvent.title} image ${index + 1}`}
                          className="w-full h-80 object-cover rounded-lg shadow-lg"
                          width={800}
                          height={500}
                          priority={index === 0}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm font-medium">
                            Image {index + 1} of {newsEvent.images.length}
                          </p>
                        </div>
                      </MotionDiv>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-black/50 hover:bg-black/80 text-white border-none" />
                <CarouselNext className="right-2 bg-black/50 hover:bg-black/80 text-white border-none" />
              </Carousel>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-4">
          <div className="prose prose-invert prose-orange max-w-none">
            <TextEditorViewer content={newsEvent.content} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-6 pt-4">
          {!!newsEvent.youtubeUrl && (
            <div className="w-full rounded-lg overflow-hidden shadow-lg">
              <h3 className="text-lg font-semibold text-orange-500 mb-3">
                Featured Video
              </h3>
              <div className="relative pb-[56.25%] h-0">
                {(() => {
                  // Extract YouTube video ID from URL
                  const extractYoutubeId = (url: string) => {
                    const regExp =
                      /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                    const match = url.match(regExp);
                    return match && match[2].length === 11 ? match[2] : url;
                  };

                  const videoId = extractYoutubeId(newsEvent.youtubeUrl);

                  return (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                })()}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-zinc-800">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400">
                Published: {format(new Date(newsEvent.createdAt), "MMM dd, yyyy")}
              </span>
              <span className="text-xs text-zinc-400">
                Updated: {format(new Date(newsEvent.updatedAt), "MMM dd, yyyy")}
              </span>
              <span className="text-xs text-zinc-500 mt-1">
                ID: {newsEvent.id.substring(0, 8)}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
}
