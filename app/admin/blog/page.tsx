import BlogData from "@/app/admin/blog/_components/data";
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

export default function BlogPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Commodities</CardTitle>
            <CardDescription>list of commodities</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Button asChild>
              <Link href="/admin/blog/create">Create New Blog</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <BlogData searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
