import NewsEventDetailsData from "@/app/admin/news-event/[slug]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function NewsEventDetailsPage({ params }: Props) {
  return (
    <div className="flex gap-4 md:gap-8">
      <div className="space-y-8 w-full max-w-md">
        <Suspense fallback={<LoadingIcon />}>
          <NewsEventDetailsData slug={params.slug} />
          <Button asChild className="w-full">
            <Link href={`${params.slug}/update`}>Update</Link>
          </Button>
        </Suspense>
      </div>
    </div>
  );
}
