import { getTradeList } from "@/actions/pooling/trade.action";
import TradeTable from "@/app/admin/main-token/[code]/trade/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function TradeListData({ searchParams }: Props) {
  const { data: tradeList, error } = await getTradeList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (tradeList.length === 0) {
    return <AlertInfo title="No trades found" />;
  }

  return <TradeTable tradeList={tradeList} />;
}
