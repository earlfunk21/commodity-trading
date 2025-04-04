import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import WithBlog from "../_components/with-commodity-type";
import BlogDetailsCard from "./_components/card";

type Props = {
  params: {
    blogSlug: string;
  };
};

export default function BlogDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8">
      <Suspense fallback={<LoadingIcon />}>
        <WithBlog blogSlug={params.blogSlug}>
          {async ({ blog }) => <BlogDetailsCard blog={blog} />}
        </WithBlog>
        <Button asChild className="w-full">
          <Link href={`${params.blogSlug}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
