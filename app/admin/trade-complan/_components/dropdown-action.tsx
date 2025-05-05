"use client";
import { removeTradeComplan } from "@/actions/accounting/trade-complan.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TradeComplan } from "@/types/accounting.type";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  tradeComplan: TradeComplan;
};

export default function TradeComplanDropdownAction({ tradeComplan }: Props) {
  const confirm = useConfirm();

  const onDeleteTradeComplan = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this trade complan?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeTradeComplan(tradeComplan.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("TradeComplan deleted successfully");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onDeleteTradeComplan}
            className="px-3 py-2 flex items-center gap-2 cursor-pointer">
            <Trash2 className="h-4 w-4" />
            Delete Trade Complan
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`./trade-complan/${tradeComplan.id}/update`}
              className="px-3 py-2 flex items-center gap-2 cursor-pointer">
              <Edit className="h-4 w-4" />
              Update Trade Complan
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
