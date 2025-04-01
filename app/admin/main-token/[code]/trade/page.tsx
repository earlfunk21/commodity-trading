import { getMainToken } from "@/actions/pooling/main-token.action";
import TradeCreateForm from "@/app/admin/main-token/[code]/trade/_components/create-form";
import TradeData from "@/app/admin/main-token/[code]/trade/_components/data";
import TradePagination from "@/app/admin/main-token/[code]/trade/_components/pagination";
import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import { AlertError } from "@/components/ui-extension/alerts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense } from "react";
import ProcessTrades from "./_components/process-trades";

type Props = {
  searchParams: any;
  params: {
    code: string;
  };
};

export default async function TradePage({ searchParams, params }: Props) {
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
            <CardTitle>Trades</CardTitle>
            <CardDescription>list of trades</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create New Trade</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Create Trade Form</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to create a new trade.
                  </DialogDescription>
                </DialogHeader>
                <TradeCreateForm mainTokenId={mainToken.id} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <ProcessTrades mainToken={mainToken} />
        <Suspense fallback={<LoadingIcon />}>
          <TradeData
            searchParams={{ mainTokenId: mainToken.id, ...searchParams }}
          />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <TradePagination
            searchParams={{ mainTokenId: mainToken.id, ...searchParams }}
          />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
