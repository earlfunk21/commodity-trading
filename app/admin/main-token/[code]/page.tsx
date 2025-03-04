import MainTokenDetailsData from "@/app/admin/main-token/[code]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    code: string;
  };
};

export default function MainTokenDetailsPage({ params }: Props) {
  return (
    <div className="flex gap-4 md:gap-8">
      <div className="space-y-8 w-full max-w-md">
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenDetailsData code={params.code} />
          <Button asChild className="w-full">
            <Link href={`${params.code}/update`}>Update</Link>
          </Button>
        </Suspense>
      </div>
    </div>
  );
}
