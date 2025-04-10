import MainTokenValueListData from "@/app/admin/main-token/[code]/value/_components/data";
import MainTokenValuePagination from "@/app/admin/main-token/[code]/value/_components/pagination";
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
  };
};

export default function MainTokenValuePage({ searchParams, params }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>MainToken Values</CardTitle>
            <CardDescription>list of mainToken values</CardDescription>
            <SearchInput />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenValueListData
            searchParams={{ ...searchParams, mainTokenCode: params.code }}
          />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <MainTokenValuePagination
            searchParams={{ ...searchParams, mainTokenCode: params.code }}
          />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
