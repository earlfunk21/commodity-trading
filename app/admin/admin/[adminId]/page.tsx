import AdminDetailsData from "@/app/admin/admin/[adminId]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    adminId: string;
  };
};

export default function AdminDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <AdminDetailsData adminId={params.adminId} />
        <Button asChild className="w-full">
          <Link href={`${params.adminId}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
