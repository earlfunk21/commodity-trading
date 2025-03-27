import { TextEditorViewer } from "@/components/ui-extension/text-editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/types/pooling.type";
import { format } from "date-fns";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogDetailsCard({ blog }: BlogCardProps) {
  return (
    <Card
      key={blog.id}
      className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm px-2 py-0.5 bg-orange-500/20 text-orange-500 rounded-full">
            {blog.commodity.name}
          </span>
          <span className="text-xs text-zinc-500">{blog.slug}</span>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight">
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TextEditorViewer content={blog.content} />
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full mt-4">
          <span className="text-xs text-zinc-500">
            Updated: {format(new Date(blog.updatedAt), "MMM dd, yyyy")}
          </span>
          <Button
            asChild
            className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:from-red-600 hover:via-orange-600 hover:to-red-600 text-white">
            <Link href={`/holder/commodities/${blog.commodity.slug}`}>Buy Token</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
