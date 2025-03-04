import {
  removeCommodityTypeDocument,
  removeCommodityTypeImage,
  removeCommodityTypeVideo,
} from "@/actions/pooling/commodity-type.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommodityType } from "@/types/pooling.type";
import { format } from "date-fns";
import {
  File,
  ImageIcon,
  LinkIcon,
  Package,
  Trash2,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CommodityTypeCardProps {
  commodityType: CommodityType;
  onRemove?: {
    image?: (path: string) => void;
    video?: (url: string) => void;
    document?: (path: string) => void;
  };
}

export default function CommodityTypeCard({
  commodityType,
}: CommodityTypeCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {commodityType.name}
            </h3>
            <Link
              href={`/commodity/${commodityType.commodity.slug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
              <Package className="h-4 w-4" />
              {commodityType.commodity.name}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">{commodityType.slug}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`${commodityType.slug}/update`}>Edit Type</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-semibold">Description</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {commodityType.description}
          </p>
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Images ({commodityType.images.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <VideoIcon className="h-4 w-4" />
              Videos ({commodityType.videos.length})
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <File className="h-4 w-4" />
              Docs ({commodityType.documents.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="images" className="mt-4">
            {commodityType.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {commodityType.images.map((image, index) => (
                  <div
                    key={image}
                    className="group relative aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FILE_URL}/commodity-type/${image}`}
                      alt={`${commodityType.name} image ${index + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <form
                      action={async () => {
                        "use server";
                        await removeCommodityTypeImage(
                          commodityType.slug,
                          image
                        );
                      }}>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed p-8">
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground text-center">
                    No images available for this commodity type
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="videos" className="mt-4">
            {commodityType.videos.length > 0 ? (
              <div className="grid gap-2">
                {commodityType.videos.map((video, index) => (
                  <div
                    key={video}
                    className="group flex items-center justify-between p-2 rounded-md bg-muted/50 relative">
                    <div className="flex justify-center items-center gap-2">
                      <video
                        width="320"
                        height="240"
                        controls
                        className="w-full">
                        <source
                          src={`${process.env.NEXT_PUBLIC_FILE_URL}/commodity-type/${video}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <form
                      action={async () => {
                        "use server";
                        await removeCommodityTypeVideo(
                          commodityType.slug,
                          video
                        );
                      }}>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed p-8">
                <div className="flex flex-col items-center gap-2">
                  <VideoIcon className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground text-center">
                    No videos uploaded for this commodity type
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="documents" className="mt-4">
            {commodityType.documents.length > 0 ? (
              <div className="grid gap-2">
                {commodityType.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href={`${process.env.NEXT_PUBLIC_FILE_URL}/commodity-type/${doc}`}
                        className="text-sm hover:underline"
                        target="_blank">
                        Document {index + 1}
                        <LinkIcon className="h-3 w-3 inline ml-1" />
                      </Link>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      formAction={async () => {
                        "use server";
                        await removeCommodityTypeDocument(
                          commodityType.slug,
                          doc
                        );
                      }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed p-8">
                <div className="flex flex-col items-center gap-2">
                  <File className="h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground text-center">
                    No documents attached to this commodity type
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="rounded-lg bg-card p-4 border shadow-sm">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Main Tokens</span>
          </div>
          <div className="mt-2 text-2xl font-bold">
            {commodityType._count.mainTokens}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col p-2 rounded-md bg-muted/50">
            <span className="text-muted-foreground">Created</span>
            <span className="font-medium">
              {format(commodityType.createdAt, "PPP")}
            </span>
          </div>
          <div className="flex flex-col p-2 rounded-md bg-muted/50">
            <span className="text-muted-foreground">Updated</span>
            <span className="font-medium">
              {format(commodityType.updatedAt, "PPP")}
            </span>
          </div>
          {commodityType.deletedAt && (
            <div className="col-span-2 flex flex-col p-2 rounded-md bg-destructive/10">
              <span className="text-destructive">Deleted</span>
              <span className="font-medium text-destructive">
                {format(commodityType.deletedAt, "PPP")}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
