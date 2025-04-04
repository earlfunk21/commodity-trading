import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import WithBlog from "../../_components/with-commodity-type";
import BlogUpdateForm from "./_components/form";

type Props = {
  params: {
    blogSlug: string;
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
          <WithBlog blogSlug={params.blogSlug}>
            {async ({ blog }) => <BlogUpdateForm blog={blog} />}
          </WithBlog>
        </Suspense>
      </CardContent>
    </Card>
  );
}
