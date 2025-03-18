import { getAllocationAccountTransactionCount } from "@/actions/accounting/allocation-account-transaction.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";
import { Allocation } from "@/types/accounting.type";

type Props = {
  searchParams: any;
  allocation: Allocation;
};

export default async function AllocationAccountTransactionPagination({
  allocation,
  searchParams,
}: Props) {
  const result = await getAllocationAccountTransactionCount({
    allocation,
    ...searchParams,
  });

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination total={result.data} page={Number(searchParams.page || 1)} />
  );
}
