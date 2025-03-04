import ComplanDetailsData from "@/app/admin/complan/[complanId]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function ComplanDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <ComplanDetailsData id={params.id} />
        <Button asChild className="w-full">
          <Link href={`${params.id}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
