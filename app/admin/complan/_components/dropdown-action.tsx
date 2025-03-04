"use client";
import { removeComplan } from "@/actions/complan-system/complan.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Complan } from "@/types/complan-system.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  complan: Complan;
};

export default function ComplanDropdownAction({ complan }: Props) {
  const confirm = useConfirm();

  const onDeleteComplan = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this complan?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeComplan(complan.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Complan deleted successfully");
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
          <DropdownMenuItem onClick={onDeleteComplan}>
            Delete Complan
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/complan/${complan.id}/update`}>Update Complan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/complan/${complan.id}`}>View Details</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
