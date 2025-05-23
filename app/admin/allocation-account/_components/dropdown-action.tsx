"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AllocationAccount } from "@/types/accounting.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

type Props = {
  allocationAccount: AllocationAccount;
};

export default function AllocationAccountDropdownAction({
  allocationAccount,
}: Props) {
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
          <Link
            href={`./allocation-account/${allocationAccount.allocation}/transaction`}>
            <DropdownMenuItem>Transaction</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
