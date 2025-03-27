import BlogDetailsData from "@/app/admin/blog/[slug]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8">
      <Suspense fallback={<LoadingIcon />}>
        <BlogDetailsData slug={params.slug} />
        <Button asChild className="w-full">
          <Link href={`${params.slug}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
