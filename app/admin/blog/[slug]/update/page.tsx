import BlogUpdateData from "@/app/admin/blog/[slug]/update/_components/data";
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

export default function BlogUpdatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Update Form</CardTitle>
        <CardDescription>Update the blog details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <BlogUpdateData slug={params.slug} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
