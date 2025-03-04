import UserUpdateData from "@/app/admin/user/[username]/update/_components/data";
import LoadingIcon from "@/components/loading-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

type Props = {
  params: {
    username: string;
  };
};

export default function UserUpdatePage({ params }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Update Form</CardTitle>
        <CardDescription>Update the user details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <UserUpdateData username={params.username} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
