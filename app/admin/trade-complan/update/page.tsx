import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TradeComplanUpdateData from "./_components/data";

type Props = {
  searchParams: {
    id: string;
  };
};

export default function TradeComplanUpdatePage({ searchParams }: Props) {
  if (!searchParams.id) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>TradeComplan Update Form</CardTitle>
        <CardDescription>
          Update the tradeComplan details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <TradeComplanUpdateData id={searchParams.id} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
