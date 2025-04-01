"use client";
import { removeTrade } from "@/actions/pooling/trade.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trade } from "@/types/pooling.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  trade: Trade;
};

export default function TradeDropdownAction({ trade }: Props) {
  const confirm = useConfirm();

  const onDeleteTrade = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this trade?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeTrade(trade.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Trade deleted successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onDeleteTrade}>
            Delete Trade
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`trade/${trade.id}/update`}>Update Trade</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`trade/${trade.id}`}>View Details</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
