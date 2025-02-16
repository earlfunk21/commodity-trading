import {
  getAdminPermissionList,
  getResourcePermissionList,
} from "@/actions/core/admin-permission.action";
import FilterPermissionsData from "@/app/(main)/admin/[adminId]/permissions/_components/filter-data";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  adminId: string;
};

export default async function AdminPermissionListData({ adminId }: Props) {
  const result = await getAdminPermissionList({ adminId, infinite: true });
  const { data: permissions } = await getResourcePermissionList();

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  const adminPermissions = result.data;

  return (
    <FilterPermissionsData
      permissions={permissions}
      adminPermissions={adminPermissions}
      adminId={adminId}
    />
  );
}
