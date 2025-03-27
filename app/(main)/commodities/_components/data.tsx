import { getBlogListByPublic } from "@/actions/pooling/blog.action";
import { TextEditorViewer } from "@/components/ui-extension/text-editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function BlogListData() {
  const { data: blogs } = await getBlogListByPublic();

  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl grid grid-cols-12">
          <CardHeader className="col-span-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm px-2 py-0.5 bg-orange-500/20 text-orange-500 rounded-full">
                {blog.commodity.name}
              </span>
              <span className="text-xs text-zinc-500">{blog.slug}</span>
            </div>
            <Link href={`commodities/${blog.slug}`}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight hover:from-orange-500 hover:via-red-500 hover:to-orange-500 cursor-pointer">
                {blog.title}
              </CardTitle>
            </Link>
            <CardDescription className="text-zinc-400 text-lg font-light tracking-wide ">
              <TextEditorViewer content={blog.content.substring(0, 100)} />
            </CardDescription>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-zinc-500">
                Updated: {format(new Date(blog.updatedAt), "MMM dd, yyyy")}
              </span>
              <Button variant="outline" className="border-orange-500">
                Read More
                <ChevronRight className="text-orange-500" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
