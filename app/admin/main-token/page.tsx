import MainTokenData from "@/app/admin/main-token/_components/data";
import MainTokenPagination from "@/app/admin/main-token/_components/pagination";
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

export default function MainTokenPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Main Tokens</CardTitle>
            <CardDescription>list of main tokens</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
          <Button asChild><Link href="./main-token/create">Create New Main Token</Link></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
