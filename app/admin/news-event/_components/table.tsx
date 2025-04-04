import NewsEventDropdownAction from "@/app/admin/news-event/_components/dropdown-action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewsEvent } from "@/types/pooling.type";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  newsEventList: NewsEvent[];
};

export default function NewsEventTable({ newsEventList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">Title</TableHead>
            <TableHead className="text-xs">Created At</TableHead>
            <TableHead className="text-xs">Updated At</TableHead>
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsEventList.map((newsEvent) => (
            <TableRow
              key={newsEvent.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Title
                </span>
                <Link
                  href={`/admin/news-event/${newsEvent.slug}`}
                  className="text-blue-600 hover:underline">
                  {newsEvent.title}
                </Link>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Created At
                </span>
                {format(new Date(newsEvent.createdAt), "PPP")}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Updated At
                </span>
                {format(new Date(newsEvent.updatedAt), "PPP")}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Status
                </span>
                <Badge
                  className={newsEvent.show ? "bg-green-600" : "bg-red-600"}>
                  {newsEvent.show ? "Visible" : "Hidden"}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <NewsEventDropdownAction newsEvent={newsEvent} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
