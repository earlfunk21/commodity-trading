"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainToken } from "@/types/pooling.type";
import ProcessTradesForm from "./process-trades-form";
import { useSelectTradeIds } from "./use-select-trade";
import { useCallback, useState } from "react";

type Props = {
  mainToken: MainToken;
};

export default function ProcessTrades({ mainToken }: Props) {
  const { selectedIds } = useSelectTradeIds();
  const [openProcessTradesForm, setOpenProcessTradesForm] = useState(false);

  const onSuccess = useCallback(() => {
    setOpenProcessTradesForm(false);
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={selectedIds.length <= 0}>Process Trades</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Process Trades Form</DialogTitle>
          <DialogDescription>
            Please review the selected trades below and confirm the processing
            details.
          </DialogDescription>
        </DialogHeader>
        <ProcessTradesForm mainTokenId={mainToken.id} tradeIds={selectedIds} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
