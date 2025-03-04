import AdminUpdateData from "@/app/admin/admin/[adminId]/update/_components/data";
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
    adminId: string;
  };
};

export default function AdminUpdatePage({ params }: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Admin Update Form</CardTitle>
        <CardDescription>Update the admin details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <AdminUpdateData adminId={params.adminId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
