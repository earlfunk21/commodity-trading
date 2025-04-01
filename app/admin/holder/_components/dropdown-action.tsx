"use client";
import { removeHolder } from "@/actions/pooling/holder.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Holder } from "@/types/pooling.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  holder: Holder;
};

export default function HolderDropdownAction({ holder }: Props) {
  const confirm = useConfirm();

  const onDeleteHolder = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this holder?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeHolder(holder.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Holder deleted successfully");
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
          <DropdownMenuItem onClick={onDeleteHolder}>
            Delete Holder
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`holder/${holder.id}/update`}>Update Holder</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`holder/${holder.id}`}>View Details</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`user/${holder.userId}`}>View User</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`user/${holder.userId}/update`}>Update User</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
