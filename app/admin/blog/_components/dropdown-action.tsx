"use client";
import { removeBlog } from "@/actions/pooling/blog.action";
import { useConfirm } from "@/components/ui-extension/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog } from "@/types/pooling.type";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  blog: Blog;
};

export default function BlogDropdownAction({ blog }: Props) {
  const confirm = useConfirm();

  const onDeleteBlog = async () => {
    const confirmResult = await confirm({
      title: "Are you sure you want to delete this blog?",
    });

    if (!confirmResult) {
      return;
    }

    const { error } = await removeBlog(blog.id);

    if (error) {
      return toast.error(error);
    }

    toast.success("Blog deleted successfully");
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
          <DropdownMenuItem onClick={onDeleteBlog}>
            Delete Blog
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`./blog/${blog.slug}/update`}>Update Blog</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`./blog/${blog.slug}`}>View Content</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
