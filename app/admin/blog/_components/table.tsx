import BlogDropdownAction from "@/app/admin/blog/_components/dropdown-action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Blog } from "@/types/pooling.type";
import { format } from "date-fns";

type Props = {
  blogList: Blog[];
};

export default function BlogTable({ blogList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="md:font-semibold">Title</TableHead>
            <TableHead className="md:font-semibold">Slug</TableHead>
            <TableHead className="md:font-semibold">Updated At</TableHead>
            <TableHead className="md:font-semibold">Created At</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogList.map((blog) => (
            <TableRow
              key={blog.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Title
                </span>
                {blog.title}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Slug
                </span>
                {blog.slug}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Updated At
                </span>
                {format(blog.updatedAt, "PPp")}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Created At
                </span>
                {format(blog.createdAt, "PPp")}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <BlogDropdownAction blog={blog} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
