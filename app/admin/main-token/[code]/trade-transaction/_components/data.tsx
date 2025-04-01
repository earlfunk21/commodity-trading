import { getTradeTransactionList } from "@/actions/pooling/trade-transaction.action";
import TradeTransactionTable from "@/app/admin/main-token/[code]/trade-transaction/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
  mainTokenId: string;
};

export default async function TradeTransactionListData({
  searchParams,
  mainTokenId,
}: Props) {
  const { data: tradeTransactionList, error } =
    await getTradeTransactionList({
      mainTokenId: mainTokenId,
      ...searchParams,
    });

  if (error) {
    return <AlertError title={error} />;
  }

  if (tradeTransactionList.length === 0) {
    return <AlertInfo title="No trade transactions found" />;
  }

  return (
    <TradeTransactionTable
      tradeTransactionList={tradeTransactionList}
    />
  );
}
