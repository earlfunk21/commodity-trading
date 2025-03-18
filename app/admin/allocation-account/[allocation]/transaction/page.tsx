import AllocationAccountTransactionListData from "@/app/admin/allocation-account/[allocation]/transaction/_components/data";
import AllocationAccountTransactionPagination from "@/app/admin/allocation-account/[allocation]/transaction/_components/pagination";
import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Allocation } from "@/types/accounting.type";
import { Suspense } from "react";

type Props = {
  searchParams: any;
  params: {
    allocation: Allocation;
  };
};

export default function AllocationAccountTransactionPage({
  searchParams,
  params,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle>Allocation Account Transactions</CardTitle>
          <CardDescription>
            list of allocation account transactions
          </CardDescription>
          <SearchInput />
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <AllocationAccountTransactionListData
            allocation={params.allocation}
            searchParams={searchParams}
          />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <AllocationAccountTransactionPagination
            searchParams={searchParams}
            allocation={params.allocation}
          />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
