"use client";
import { removeAdmin } from "@/actions/core/admin.action";
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
import { Admin } from "@/types/core.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  admin: Admin;
};

export default function AdminDropdownAction({ admin }: Props) {
  const confirm = useConfirm();

  const onDeleteAdmin = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this admin?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeAdmin(admin.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Admin deleted successfully");
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
          <DropdownMenuItem onClick={onDeleteAdmin}>
            Delete Admin
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/${admin.id}/update`}>Update Admin</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/${admin.id}`}>View Details</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/admin/${admin.id}/permissions`}>Permissions</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/user/${admin.userId}`}>View User</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/user/${admin.userId}/update`}>Update User</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
