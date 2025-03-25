"use client";
import { removeCommodity } from "@/actions/pooling/commodity.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Commodity } from "@/types/pooling.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  commodity: Commodity;
};

export default function CommodityDropdownAction({ commodity }: Props) {
  const confirm = useConfirm();

  const onDeleteCommodity = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this commodity?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeCommodity(commodity.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Commodity deleted successfully");
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
          <DropdownMenuItem onClick={onDeleteCommodity}>
            Delete Commodity
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`./commodity/${commodity.slug}/update`}>
              Update Commodity
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`./commodity/${commodity.slug}`}>View Details</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
