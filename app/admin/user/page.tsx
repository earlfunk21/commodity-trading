import UserData from "@/app/admin/user/_components/data";
import FilterUserRole from "@/app/admin/user/_components/filter-user-role";
import UserPagination from "@/app/admin/user/_components/pagination";
import LoadingIcon from "@/components/loading-icon";
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

export default function UserPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Users</CardTitle>
            <CardDescription>list of users</CardDescription>
          </div>
          <div className="space-y-1.5">
            <FilterUserRole searchParams={searchParams} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <UserData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <UserPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
