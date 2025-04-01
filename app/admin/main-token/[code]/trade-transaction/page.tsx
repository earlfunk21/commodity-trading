import { getMainToken } from "@/actions/pooling/main-token.action";
import TradeTransactionData from "@/app/admin/main-token/[code]/trade-transaction/_components/data";
import TradeTransactionPagination from "@/app/admin/main-token/[code]/trade-transaction/_components/pagination";
import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import { AlertError } from "@/components/ui-extension/alerts";
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
  };
};

export default async function TradeTransactionPage({
  searchParams,
  params,
}: Props) {
  const { data: mainToken, error } = await getMainToken(params.code);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!mainToken) {
    throw new Error("MainToken not found");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Trade Transactions</CardTitle>
            <CardDescription>list of trade transactions</CardDescription>
            <SearchInput />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <TradeTransactionData
            searchParams={searchParams}
            mainTokenId={mainToken.id}
          />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <TradeTransactionPagination
            searchParams={searchParams}
            mainTokenId={mainToken.id}
          />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
