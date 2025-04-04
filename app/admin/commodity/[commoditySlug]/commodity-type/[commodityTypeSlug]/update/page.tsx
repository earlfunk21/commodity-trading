import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import WithCommodityType from "../../_components/with-commodity-type";
import UploadImagesForm from "../_components/upload-images-form";
import UploadVideosForm from "../_components/upload-videos.form";
import CommodityTypeUpdateForm from "./_components/form";
type Props = {
  params: {
    commodityTypeSlug: string;
  };
};

export default function CommodityTypeUpdatePage({ params }: Props) {
  return (
    <div className="flex gap-4 md:gap-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>CommodityType Update Form</CardTitle>
          <CardDescription>
            Update the commodity type details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoadingIcon />}>
            <WithCommodityType commodityTypeSlug={params.commodityTypeSlug}>
              {async ({ commodityType }) => (
                <CommodityTypeUpdateForm commodityType={commodityType} />
              )}
            </WithCommodityType>
          </Suspense>
        </CardContent>
      </Card>
      <div className="w-full max-w-md">
        <Tabs defaultValue="images" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="images">
            <UploadImagesForm slug={params.commodityTypeSlug} />
          </TabsContent>
          <TabsContent value="videos">
            <UploadVideosForm slug={params.commodityTypeSlug} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
