"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Trade } from "@/types/pooling.type";
import { useSelectTradeIds } from "./use-select-trade";

type Props = {
  trade: Trade;
};

export default function TradeCheckbox({ trade }: Props) {
  const { selectId, deselectId, selectedIds } = useSelectTradeIds();

  return (
    <Checkbox
      checked={selectedIds.includes(trade.id)}
      onCheckedChange={(checked) => {
        if (checked) {
          selectId(trade.id);
        } else {
          deselectId(trade.id);
        }
      }}
      disabled={!!trade.processedAt}
    />
  );
}
