import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import BlogListData from "./_components/data";

type Props = {
  searchParams: any;
  params: {
    commodityTypeSlug: string;
  };
};

export default function BlogPage({ searchParams, params }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Blogs</CardTitle>
            <CardDescription>list of blogs</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Button asChild>
              <Link href="blog/create">Create New Blog</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <BlogListData
            searchParams={{
              ...searchParams,
              commodityTypeSlug: params.commodityTypeSlug,
            }}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
