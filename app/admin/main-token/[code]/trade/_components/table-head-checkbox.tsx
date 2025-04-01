"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { Trade } from "@/types/pooling.type";
import { useSelectTradeIds } from "./use-select-trade";

type Props = {
  trades: Trade[];
};

export default function TradeTableHeadCheckbox({ trades }: Props) {
  const { selectManyIds, deselectId, selectedIds } = useSelectTradeIds();

  return (
    <Checkbox
      onCheckedChange={(checked) => {
        if (checked) {
          selectManyIds(trades.map((trade) => trade.id));
        } else {
          trades.forEach((trade) => deselectId(trade.id));
        }
      }}
      checked={trades.length > 0 && selectedIds.length === trades.length}
    />
  );
}
