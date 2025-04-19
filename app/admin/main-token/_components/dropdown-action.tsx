"use client";
import {
  removeMainToken,
  updateMainTokenStatusToClosed,
  updateMainTokenStatusToTerminated,
  updateMainTokenStatusToTrading,
} from "@/actions/pooling/main-token.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MainToken, MainTokenStatus } from "@/types/pooling.type";
import {
  BadgePercent,
  BarChart3,
  BarChartHorizontal,
  CreditCard,
  DollarSign,
  Edit,
  Eye,
  PlusCircle,
  ReceiptText,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import UpdateExtendedStatusForm from "./update-extended-status-form";

type Props = {
  mainToken: MainToken;
};

export default function MainTokenDropdownAction({ mainToken }: Props) {
  const confirm = useConfirm();
  const [openExtendedStatusForm, setOpenExtendedStatusForm] = useState(false);

  const onDeleteMainToken = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this main token?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeMainToken(mainToken.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("MainToken deleted successfully");
  };

  const onUpdateStatusToTrading = async () => {
    const confirmResult = await confirm({
      title: `MTC: ${mainToken.code}`,
      description:
        "Are your sure you want to update this main token to trading status?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await updateMainTokenStatusToTrading(mainToken.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("MainToken status updated to trading successfully");
  };

  const onUpdateStatusToClosed = async () => {
    const confirmResult = await confirm({
      title: `MTC: ${mainToken.code}`,
      description:
        "Are your sure you want to update this main token to closed status?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await updateMainTokenStatusToClosed(mainToken.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("MainToken status updated to closed successfully");
  };

  const onUpdateStatusToTerminated = async () => {
    const confirmResult = await confirm({
      title: `MTC: ${mainToken.code}`,
      description:
        "Are your sure you want to update this main token to terminated status?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await updateMainTokenStatusToTerminated(mainToken.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("MainToken status updated to terminated successfully");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={onDeleteMainToken}
              className="px-3 py-2 flex items-center gap-2 cursor-pointer">
              <Trash2 className="h-4 w-4" />
              Delete Main Token
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`./main-token/${mainToken.code}/update`}
                className="px-3 py-2 flex items-center gap-2 cursor-pointer">
                <Edit className="h-4 w-4" />
                Update Main Token
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`./main-token/${mainToken.code}`}
                className="px-3 py-2 flex items-center gap-2 cursor-pointer">
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 flex items-center gap-2 cursor-pointer">
                <BarChart3 className="h-4 w-4" />
                Token Actions
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                  <Link
                    href={`./main-token/${mainToken.code}/value`}
                    className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                    <BarChartHorizontal className="h-4 w-4" />
                    View Token Values
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`./main-token/${mainToken.code}/value/create`}
                    className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                    <PlusCircle className="h-4 w-4" />
                    New Token Value
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                <CreditCard className="h-4 w-4" />
                Trade Actions
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                  <Link
                    href={`./main-token/${mainToken.code}/trade`}
                    className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                    <Eye className="h-4 w-4" />
                    View Trades
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`./main-token/${mainToken.code}/trade-transaction`}
                    className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                    <ReceiptText className="h-4 w-4" />
                    View Trade Transactions
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                <DollarSign className="h-4 w-4" />
                Complan Actions
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                  <Link
                    href={`./main-token/${mainToken.code}/transaction`}
                    className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                    <ReceiptText className="h-4 w-4" />
                    View Complan Transactions
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 flex items-center gap-2 cursor-pointer ">
                <DollarSign className="h-4 w-4" />
                Status Update
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={onUpdateStatusToTrading}
                  disabled={mainToken.status !== MainTokenStatus.Pooling}
                  className={cn(
                    "px-3 py-2 flex items-center justify-between cursor-pointer",
                    mainToken.status !== MainTokenStatus.Pooling
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  )}>
                  <div className="flex items-center gap-2">
                    <BadgePercent className="h-4 w-4" />
                    Process Trading
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onUpdateStatusToClosed}
                  disabled={mainToken.status !== MainTokenStatus.Trading}
                  className={cn(
                    "px-3 py-2 flex items-center justify-between cursor-pointer",
                    mainToken.status !== MainTokenStatus.Trading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  )}>
                  <div className="flex items-center gap-2">
                    <BadgePercent className="h-4 w-4" />
                    Closed Trading
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onUpdateStatusToTerminated}
                  disabled={mainToken.status !== MainTokenStatus.Pooling}
                  className={cn(
                    "px-3 py-2 flex items-center justify-between cursor-pointer",
                    mainToken.status !== MainTokenStatus.Pooling
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  )}>
                  <div className="flex items-center gap-2">
                    <BadgePercent className="h-4 w-4" />
                    Terminate
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={openExtendedStatusForm}
        onOpenChange={setOpenExtendedStatusForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>MTC: ${mainToken.code}</DialogTitle>
            <DialogDescription>
              Are your sure you want to update this main token to extended
              status?
            </DialogDescription>
          </DialogHeader>
          <UpdateExtendedStatusForm mainToken={mainToken} />
        </DialogContent>
      </Dialog>
    </>
  );
}
