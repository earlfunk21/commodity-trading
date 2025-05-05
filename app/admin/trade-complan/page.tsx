import TradeComplanData from "@/app/admin/trade-complan/_components/data";
import TradeComplanPagination from "@/app/admin/trade-complan/_components/pagination";
import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  searchParams: any;
};

export default function TradeComplanPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Trade Complans</CardTitle>
            <CardDescription>list of trade complans</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Button asChild>
              <Link href="./trade-complan/create">
                Create New Trade Complan
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <TradeComplanData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <TradeComplanPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
