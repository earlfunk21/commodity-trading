import UserDetailsData from "@/app/admin/user/[username]/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    username: string;
  };
};

export default function UserDetailsPage({ params }: Props) {
  return (
    <div className="space-y-8 w-full max-w-md">
      <Suspense fallback={<LoadingIcon />}>
        <UserDetailsData username={params.username} />
        <Button asChild className="w-full">
          <Link href={`${params.username}/update`}>Update</Link>
        </Button>
      </Suspense>
    </div>
  );
}
