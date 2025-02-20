import CommodityTypeUpdateData from "@/app/(main)/commodity-type/[slug]/update/_components/data";
import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function CommodityTypeUpdatePage({ params }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>CommodityType Update Form</CardTitle>
        <CardDescription>
          Update the commodity type details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <CommodityTypeUpdateData slug={params.slug} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
