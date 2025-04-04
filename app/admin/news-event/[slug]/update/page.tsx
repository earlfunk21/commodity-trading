import NewsEventUpdateData from "@/app/admin/news-event/[slug]/update/_components/data";
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

export default function NewsEventUpdatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NewsEvent Update Form</CardTitle>
        <CardDescription>Update the news event details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <NewsEventUpdateData slug={params.slug} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
