import { getMainTokenTransactionCount } from "@/actions/pooling/main-token-transaction.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";

type Props = {
  searchParams: any;
  code: string;
};

export default async function MainTokenTransactionPagination({
  searchParams,
  code,
}: Props) {
  const result = await getMainTokenTransactionCount({
    mainTokenCode: code,
    ...searchParams,
  });

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination total={result.data} page={Number(searchParams.page || 1)} />
  );
}
