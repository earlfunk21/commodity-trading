import { getAccountDepositCount } from "@/actions/accounting/account-deposit.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";

type Props = {
  searchParams: any;
};

export default async function AccountDepositPagination({
  searchParams,
}: Props) {
  const result = await getAccountDepositCount(searchParams);

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination total={result.data} page={Number(searchParams.page || 1)} />
  );
}
