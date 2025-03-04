import { getAdminList } from "@/actions/core/admin.action";
import AdminTable from "@/app/admin/admin/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function AdminListData({ searchParams }: Props) {
  const { data: adminList, error } = await getAdminList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (adminList.length === 0) {
    return <AlertInfo title="No admins found" />;
  }

  return <AdminTable adminList={adminList} />;
}
