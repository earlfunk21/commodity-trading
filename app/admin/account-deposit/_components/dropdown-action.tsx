"use client";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AccountDeposit, DepositStatus } from "@/types/accounting.type";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

type Props = {
  accountDeposit: AccountDeposit;
};

export default function AccountDepositDropdownAction({
  accountDeposit,
}: Props) {
  const confirm = useConfirm();

  const onApprovedDeposit = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to approve this account deposit?",
    });

    if (!confirmResult) {
      return;
    }

    toast.success("This action is not implemented yet");
  };

  const onDeclinedDeposit = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to decline this account deposit?",
    });

    if (!confirmResult) {
      return;
    }

    toast.success("This action is not implemented yet");
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
          <DropdownMenuItem
            disabled={accountDeposit.status !== DepositStatus.Pending}
            onClick={onApprovedDeposit}>
            Approved
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={accountDeposit.status !== DepositStatus.Pending}
            onClick={onDeclinedDeposit}>
            Declined
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
