import PurchaseTokenData from "@/app/holder/purchase-token/_components/data";
import PurchaseTokenPagination from "@/app/holder/purchase-token/_components/pagination";
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
};

export default function PurchaseTokenPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Purchase Tokens</CardTitle>
            <CardDescription>list of purchase tokens</CardDescription>
            <SearchInput />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <PurchaseTokenData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <PurchaseTokenPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
