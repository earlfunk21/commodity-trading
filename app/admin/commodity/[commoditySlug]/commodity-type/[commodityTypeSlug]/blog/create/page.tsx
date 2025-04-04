import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import WithCommodityType from "../../../_components/with-commodity-type";
import BlogCreateForm from "./_components/form";

type Props = {
  params: {
    commodityTypeSlug: string;
  };
};

export default function BlogCreatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new blog</CardTitle>
        <CardDescription>Create a new blog for the blog.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense>
          <WithCommodityType commodityTypeSlug={params.commodityTypeSlug}>
            {async ({ commodityType }) => (
              <BlogCreateForm commodityType={commodityType} />
            )}
          </WithCommodityType>
        </Suspense>
      </CardContent>
    </Card>
  );
}
