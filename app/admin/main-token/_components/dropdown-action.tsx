"use client";
import {
  releasedManagementFee,
  releasedReferralCommission,
  removeMainToken,
} from "@/actions/pooling/main-token.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
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
import { MainToken } from "@/types/pooling.type";
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
import { toast } from "sonner";

type Props = {
  mainToken: MainToken;
};

export default function MainTokenDropdownAction({ mainToken }: Props) {
  const confirm = useConfirm();

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

  const onReleaseReferralCommission = async () => {
    const confirmResult = await confirm({
      title: `MTC: ${mainToken.code}`,
      description:
        "Are you sure you want to release referral commission? Please check the Main Token Code (MTC) before proceeding. ",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await releasedReferralCommission(mainToken.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Referral commission released successfully");
  };

  const onReleasedManagementFee = async () => {
    const confirmResult = await confirm({
      title: `MTC: ${mainToken.code}`,
      description: `Are you sure you want to release management fee? Please check the Main Token Code (MTC) before proceeding.`,
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await releasedManagementFee(mainToken.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Management fee released successfully");
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
              <DropdownMenuItem
                onClick={onReleaseReferralCommission}
                disabled={!!mainToken.releaseReferralCommission}
                className={cn(
                  "px-3 py-2 flex items-center justify-between cursor-pointer",
                  !!mainToken.releaseReferralCommission
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                )}>
                <div className="flex items-center gap-2">
                  <BadgePercent className="h-4 w-4" />
                  Release Referral Commission
                </div>
                {!!mainToken._count.referralCommissions && (
                  <span className="px-2 py-0.5 text-xs leading-none bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white rounded-full shadow-sm dark:shadow-slate-900/30">
                    {mainToken._count.referralCommissions}
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onReleasedManagementFee}
                disabled={!!mainToken.releaseManagementFee}
                className={cn(
                  "px-3 py-2 flex items-center justify-between cursor-pointer",
                  !!mainToken.releaseManagementFee
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                )}>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Release Management Fee
                </div>
                {!!mainToken._count.pendingManagementFees && (
                  <span className="px-2 py-0.5 text-xs leading-none bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white rounded-full shadow-sm dark:shadow-slate-900/30">
                    {mainToken._count.pendingManagementFees}
                  </span>
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
