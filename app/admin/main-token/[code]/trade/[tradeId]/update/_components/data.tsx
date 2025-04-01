import { getTrade } from "@/actions/pooling/trade.action";
import TradeUpdateForm from "@/app/admin/main-token/[code]/trade/[tradeId]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  tradeId: string;
};

export default async function TradeUpdateData({ tradeId }: Props) {
  const { data: trade, error } = await getTrade(tradeId);

  if (error) {
    return <AlertError title={error} />;
  }

  return <TradeUpdateForm trade={trade} />;
}
