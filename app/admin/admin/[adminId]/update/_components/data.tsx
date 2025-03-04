import { getAdmin } from "@/actions/core/admin.action";
import AdminUpdateForm from "@/app/admin/admin/[adminId]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  adminId: string;
};

export default async function AdminUpdateData({ adminId }: Props) {
  const { data: admin, error } = await getAdmin(adminId);

  if (error) {
    return <AlertError title={error} />;
  }

  return <AdminUpdateForm admin={admin} />;
}
