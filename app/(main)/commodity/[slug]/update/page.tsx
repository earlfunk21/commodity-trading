import CommodityUpdateData from "@/app/(main)/commodity/[slug]/update/_components/data";
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

export default function CommodityUpdatePage({ params }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Commodity Update Form</CardTitle>
        <CardDescription>Update the commodity details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <CommodityUpdateData slug={params.slug} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
