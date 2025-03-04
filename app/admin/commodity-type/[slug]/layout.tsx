import UploadImagesForm from "@/app/admin/commodity-type/[slug]/_components/upload-images-form";
import UploadVideosForm from "@/app/admin/commodity-type/[slug]/_components/upload-videos.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export default function CommodityTypeDetailsLayout({
  params,
  children,
}: Props) {
  return (
    <div className="flex gap-4 md:gap-8">
      {children}
      <div className="w-full max-w-md">
        <Tabs defaultValue="images" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="images">
            <UploadImagesForm slug={params.slug} />
          </TabsContent>
          <TabsContent value="videos">
            <UploadVideosForm slug={params.slug} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
