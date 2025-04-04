import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import WithCommodityType from "../_components/with-commodity-type";
import CommodityTypeCard from "./_components/card";

type Props = {
  params: {
    commodityTypeSlug: string;
  };
};

export default function CommodityTypeDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <WithCommodityType commodityTypeSlug={params.commodityTypeSlug}>
          {async ({ commodityType }) => (
            <CommodityTypeCard commodityType={commodityType} />
          )}
        </WithCommodityType>
        <Button asChild className="w-full">
          <Link href={`${params.commodityTypeSlug}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
