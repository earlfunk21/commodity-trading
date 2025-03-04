import CommodityTypeDetailsData from "@/app/admin/commodity-type/[slug]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
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
