import TradeUpdateData from "@/app/admin/main-token/[code]/trade/[tradeId]/update/_components/data";
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
    tradeId: string;
  };
};

export default function TradeUpdatePage({ params }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Trade Update Form</CardTitle>
        <CardDescription>Update the trade details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <TradeUpdateData tradeId={params.tradeId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
