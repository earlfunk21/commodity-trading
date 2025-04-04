import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import WithCommodity from "../_components/with-commodity";
import CommodityDetailsCard from "./_components/card";

type Props = {
  params: {
    commoditySlug: string;
  };
};

export default function CommodityDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <WithCommodity commoditySlug={params.commoditySlug}>
          {async ({ commodity }) => (
            <CommodityDetailsCard commodity={commodity} />
          )}
        </WithCommodity>
        <Button asChild className="w-full">
          <Link href={`${params.commoditySlug}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
