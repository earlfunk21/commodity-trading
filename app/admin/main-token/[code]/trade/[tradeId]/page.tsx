import TradeDetailsData from "@/app/admin/main-token/[code]/trade/[tradeId]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    tradeId: string;
  };
};

export default function TradeDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <TradeDetailsData tradeId={params.tradeId} />
        <Button asChild className="w-full">
          <Link href={`${params.tradeId}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
