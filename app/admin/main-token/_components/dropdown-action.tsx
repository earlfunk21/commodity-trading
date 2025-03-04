"use client";
import { removeMainToken } from "@/actions/pooling/main-token.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
