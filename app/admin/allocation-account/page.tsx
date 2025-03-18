import AllocationAccountData from "@/app/admin/allocation-account/_components/data";
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
  searchParams: any;
};

export default function AllocationAccountPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle>Allocation Accounts</CardTitle>
          <CardDescription>list of allocation accounts</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <AllocationAccountData searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
