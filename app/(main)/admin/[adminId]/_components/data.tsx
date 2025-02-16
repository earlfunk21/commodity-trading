import { getAdmin } from "@/actions/core/admin.action";
import AdminCard from "@/app/(main)/admin/[adminId]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  adminId: string;
};

export default async function AdminDetailsData({ adminId }: Props) {
  const { data: admin, error } = await getAdmin(adminId);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!admin) {
    throw new Error("Admin not found");
  }

  return <AdminCard admin={admin} />;
}
