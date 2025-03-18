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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MainToken } from "@/types/pooling.type";
import { MoreHorizontal } from "lucide-react";
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
      title: "Are you sure you want to release referral commission?",
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
      title: "Are you sure you want to release management fee?",
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
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={onDeleteMainToken}>
            Delete Main Token
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`./main-token/${mainToken.code}/update`}>
              Update Main Token
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`./main-token/${mainToken.code}`}>View Details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`./main-token/${mainToken.code}/transaction`}>
              Transactions
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Complan Transaction
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={onReleaseReferralCommission}
            disabled={!!mainToken.releaseReferralCommission}>
            Release Referral Commission{" "}
            <span className="px-2 py-1 text-xs leading-none bg-red-500 text-white rounded-full">
              {mainToken._count.referralCommissions}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onReleasedManagementFee}
            disabled={!!mainToken.releaseManagementFee}>
            Release Management Fee
            <span className="px-2 py-1 text-xs leading-none bg-red-500 text-white rounded-full">
              {mainToken._count.pendingManagementFees}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
