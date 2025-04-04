import CommodityUpdateData from "@/app/admin/commodity/[commoditySlug]/update/_components/data";
import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import UploadImageForm from "../_components/upload-image-form";

type Props = {
  params: {
    commoditySlug: string;
  };
};

export default function CommodityUpdatePage({ params }: Props) {
  return (
    <div className="flex gap-4 md:gap-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Commodity Update Form</CardTitle>
          <CardDescription>Update the commodity details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoadingIcon />}>
            <CommodityUpdateData slug={params.commoditySlug} />
          </Suspense>
        </CardContent>
      </Card>
      <div className="w-full max-w-md">
        <UploadImageForm slug={params.commoditySlug} />
      </div>
    </div>
  );
}
