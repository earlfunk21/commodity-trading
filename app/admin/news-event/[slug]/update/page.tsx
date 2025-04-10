import WithNewsEvent from "@/app/(main)/news-event/[slug]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import NewsEventUpdateForm from "./_components/form";
import RemoveNewsEventImage from "./_components/remove-image";
import NewsEventImagesForm from "./_components/upload-images-form";

type Props = {
  params: {
    slug: string;
  };
};

export default function NewsEventUpdatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NewsEvent Update Form</CardTitle>
        <CardDescription>Update the newsEvent details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <WithNewsEvent slug={params.slug}>
            {async ({ newsEvent }) => (
              <div className="grid grid-cols-2 gap-4">
                <NewsEventUpdateForm newsEvent={newsEvent} />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">NewsEvent Images</h3>
                  {newsEvent.images && newsEvent.images.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {newsEvent.images.map((image) => (
                        <RemoveNewsEventImage
                          newsEventId={newsEvent.id}
                          image={image}
                          key={image}>
                          <div className="w-[100px]">
                            <AspectRatio>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_FILE_URL}/newsEvent/${image}`}
                                alt={image || "NewsEvent image"}
                                className="object-cover"
                                fill
                              />
                            </AspectRatio>
                          </div>
                        </RemoveNewsEventImage>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic py-6 text-center border rounded-md">
                      No images available for this newsEvent
                    </p>
                  )}
                  <NewsEventImagesForm newsEventId={newsEvent.id} />
                </div>
              </div>
            )}
          </WithNewsEvent>
        </Suspense>
      </CardContent>
    </Card>
  );
}
