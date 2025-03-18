import { getAllocationAccountList } from "@/actions/accounting/allocation-account.action";
import AllocationAccountTable from "@/app/admin/allocation-account/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function AllocationAccountListData({ searchParams }: Props) {
  const { data: allocationAccountList, error } = await getAllocationAccountList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (allocationAccountList.length === 0) {
    return <AlertInfo title="No allocation accounts found" />;
  }

  return <AllocationAccountTable allocationAccountList={allocationAccountList} />;
}
