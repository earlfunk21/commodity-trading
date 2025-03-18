import { getAllocationAccountTransactionList } from "@/actions/accounting/allocation-account-transaction.action";
import AllocationAccountTransactionTable from "@/app/admin/allocation-account/[allocation]/transaction/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";
import { Allocation } from "@/types/accounting.type";

type Props = {
  allocation: Allocation;
  searchParams: any;
};

export default async function AllocationAccountTransactionListData({
  allocation,
  searchParams,
}: Props) {
  const { data: allocationAccountTransactionList, error } =
    await getAllocationAccountTransactionList({ allocation, ...searchParams });

  if (error) {
    return <AlertError title={error} />;
  }

  if (allocationAccountTransactionList.length === 0) {
    return <AlertInfo title="No allocation accountTransactions found" />;
  }

  return (
    <AllocationAccountTransactionTable
      allocationAccountTransactionList={allocationAccountTransactionList}
    />
  );
}
