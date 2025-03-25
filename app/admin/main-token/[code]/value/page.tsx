import MainTokenTransactionData from "@/app/admin/main-token/[code]/transaction/_components/data";
import MainTokenTransactionPagination from "@/app/admin/main-token/[code]/transaction/_components/pagination";
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
import { Suspense } from "react";

type Props = {
  searchParams: any;
  params: {
    code: string;
  }
};

export default function MainTokenTransactionPage({ searchParams, params }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>MainToken Transactions</CardTitle>
            <CardDescription>list of mainToken transactions</CardDescription>
            <SearchInput />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenTransactionData searchParams={searchParams} code={params.code} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenTransactionPagination searchParams={searchParams} code={params.code}  />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
