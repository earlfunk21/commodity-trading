import SubTokenData from "@/app/holder/sub-token/_components/data";
import SubTokenPagination from "@/app/holder/sub-token/_components/pagination";
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

export default function SubTokenPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Sub Tokens</CardTitle>
            <CardDescription>list of sub tokens</CardDescription>
            <SearchInput />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <SubTokenData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <SubTokenPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
