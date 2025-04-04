"use client";
import { removeNewsEvent } from "@/actions/pooling/news-event.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewsEvent } from "@/types/pooling.type";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  newsEvent: NewsEvent;
};

export default function NewsEventDropdownAction({ newsEvent }: Props) {
  const confirm = useConfirm();

  const onDeleteNewsEvent = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this news event?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeNewsEvent(newsEvent.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("NewsEvent deleted successfully");
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
            onClick={onDeleteNewsEvent}
            className="px-3 py-2 flex items-center gap-2 cursor-pointer">
            <Trash2 className="h-4 w-4" />
            Delete News Event
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`./news-event/${newsEvent.slug}/update`}
              className="px-3 py-2 flex items-center gap-2 cursor-pointer">
              <Edit className="h-4 w-4" />
              Update News Event
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`./news-event/${newsEvent.slug}`}
              className="px-3 py-2 flex items-center gap-2 cursor-pointer">
              <Eye className="h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
