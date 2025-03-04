import {
  addAllPermissionsOfAdmin,
  removeAllPermissionsOfAdmin,
} from "@/actions/core/admin-permission.action";
import AdminPermissionListData from "@/app/admin/admin/[adminId]/permissions/_components/data";
import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

type Props = {
  params: {
    adminId: string;
  };
};

export default function AdminPermissionsPage({ params }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex space-x-4">
        <form
          action={async () => {
            "use server";
            await addAllPermissionsOfAdmin(params.adminId);
          }}>
          <Button type="submit">Check all</Button>
        </form>
        <form
          action={async () => {
            "use server";
            await removeAllPermissionsOfAdmin(params.adminId);
          }}>
          <Button type="submit">Remove all</Button>
        </form>
      </div>
      <Suspense fallback={<LoadingIcon />}>
        <AdminPermissionListData adminId={params.adminId} />
      </Suspense>
    </div>
  );
}
