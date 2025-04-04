import NewsEventData from "@/app/admin/news-event/_components/data";
import NewsEventPagination from "@/app/admin/news-event/_components/pagination";
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

export default function NewsEventPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>News Events</CardTitle>
            <CardDescription>list of news events</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
          <Button asChild><Link href="./news-event/create">Create New News Event</Link></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <NewsEventData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <NewsEventPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
