import CommodityTypeDetailsData from "@/app/(main)/commodity-type/[slug]/_components/data";
import UploadImagesForm from "@/app/(main)/commodity-type/[slug]/_components/upload-images-form";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function CommodityTypeDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <CommodityTypeDetailsData slug={params.slug} />
        <Button asChild className="w-full">
          <Link href={`${params.slug}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
