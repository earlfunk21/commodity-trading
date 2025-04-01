import { getTradeTransactionCount } from "@/actions/pooling/trade-transaction.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";

type Props = {
  searchParams: any;
  mainTokenId: string;
};


export default async function TradeTransactionPagination({
  searchParams,
  mainTokenId,
}: Props) {
  const result = await getTradeTransactionCount({
    mainTokenId: mainTokenId,
    ...searchParams,
  });

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination total={result.data} page={Number(searchParams.page || 1)} />
  );
}
