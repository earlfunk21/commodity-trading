import HolderDetailsData from "@/app/(main)/holder/[holderId]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    holderId: string;
  };
};

export default function HolderDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <HolderDetailsData holderId={params.holderId} />
        <Button asChild className="w-full">
          <Link href={`${params.holderId}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
