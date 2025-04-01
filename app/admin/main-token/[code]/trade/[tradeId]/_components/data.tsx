import { getTrade } from "@/actions/pooling/trade.action";
import TradeCard from "@/app/admin/main-token/[code]/trade/[tradeId]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  tradeId: string;
};

export default async function TradeDetailsData({ tradeId }: Props) {
  const { data: trade, error } = await getTrade(tradeId);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!trade) {
    throw new Error("Trade not found");
  }

  return <TradeCard trade={trade} />;
}
