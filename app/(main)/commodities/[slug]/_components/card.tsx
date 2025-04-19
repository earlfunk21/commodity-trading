import { MotionDiv } from "@/components/ui-extension/motion-div";
import { TextEditorViewer } from "@/components/ui-extension/text-editor";
import { Button } from "@/components/ui/button";
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
import { Blog } from "@/types/pooling.type";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogDetailsCard({ blog }: BlogCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card
        key={blog.id}
        className="border-none bg-gradient-to-br from-zinc-950 to-black shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-sm px-3 py-1 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-medium">
              {blog.commodity.name}
            </span>
            <span className="text-xs text-zinc-400 font-mono">{blog.slug}</span>
          </div>
          <CardTitle className="text-4xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent tracking-tight mb-4">
            {blog.title}
          </CardTitle>
          {blog.images && blog.images.length > 0 && (
            <div className="mt-6 mb-2">
              <Carousel className="w-full">
                <CarouselContent>
                  {blog.images.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/2">
                      <MotionDiv
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="relative overflow-hidden rounded-lg">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_FILE_URL}/blog/${image}`}
                          alt={`${blog.title} image ${index + 1}`}
                          className="w-full h-80 object-cover rounded-lg shadow-lg"
                          width={800}
                          height={500}
                          priority={index === 0}
                        />
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
            <TextEditorViewer content={blog.content} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-6 pt-4">
          {!!blog.youtubeUrl && (
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

                  const videoId = extractYoutubeId(blog.youtubeUrl);

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
                Updated: {format(new Date(blog.updatedAt), "MMM dd, yyyy")}
              </span>
              <span className="text-xs text-zinc-500 mt-1">
                ID: {blog.id.substring(0, 8)}
              </span>
            </div>
            <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:from-red-600 hover:via-orange-600 hover:to-red-600 text-white font-medium px-6 py-5 rounded-full shadow-lg shadow-orange-900/20">
                <Link href={`/holder/commodities/${blog.commodity.slug}`}>
                  Buy Token
                </Link>
              </Button>
            </MotionDiv>
          </div>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
}
