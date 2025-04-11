"use client";
import { removeComplanFeeBracket } from "@/actions/accounting/complan-fee-bracket.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComplanFeeBracket } from "@/types/accounting.type";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

type Props = {
  complanFeeBracket: ComplanFeeBracket;
};

export default function ComplanFeeBracketDropdownAction({
  complanFeeBracket,
}: Props) {
  const confirm = useConfirm();

  const onDeleteComplanFeeBracket = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this complan?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeComplanFeeBracket(complanFeeBracket.id);

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
          <DropdownMenuItem onClick={onDeleteComplanFeeBracket}>
            Delete Complan Fee Bracket
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
