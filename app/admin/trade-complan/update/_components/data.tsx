import { getTradeComplan } from "@/actions/accounting/trade-complan.action";
import { AlertError } from "@/components/ui-extension/alerts";
import TradeComplanUpdateForm from "./form";

type Props = {
  id: string;
};

export default async function TradeComplanUpdateData({ id }: Props) {
  const { data: tradeComplan, error } = await getTradeComplan(id);

  if (error) {
    return <AlertError title={error} />;
  }

  return <TradeComplanUpdateForm tradeComplan={tradeComplan} />;
}
