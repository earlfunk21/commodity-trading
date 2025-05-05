import { getTradeComplanList } from "@/actions/accounting/trade-complan.action";
import TradeComplanTable from "@/app/admin/trade-complan/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function TradeComplanListData({ searchParams }: Props) {
  const { data: tradeComplanList, error } = await getTradeComplanList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (tradeComplanList.length === 0) {
    return <AlertInfo title="No trade complans found" />;
  }

  return <TradeComplanTable tradeComplanList={tradeComplanList} />;
}
