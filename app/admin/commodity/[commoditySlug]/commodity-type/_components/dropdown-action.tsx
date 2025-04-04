"use client";
import { removeCommodityType } from "@/actions/pooling/commodity-type.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommodityType } from "@/types/pooling.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  commodityType: CommodityType;
};

export default function CommodityTypeDropdownAction({ commodityType }: Props) {
  const confirm = useConfirm();

  const onDeleteCommodityType = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this commodity type?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeCommodityType(commodityType.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("CommodityType deleted successfully");
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
          <DropdownMenuItem onClick={onDeleteCommodityType}>
            Delete Commodity Type
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`commodity-type/${commodityType.slug}/update`}>
              Update Commodity Type
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`commodity-type/${commodityType.slug}`}>
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`commodity-type/${commodityType.slug}/blog`}>
              View Blogs
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
