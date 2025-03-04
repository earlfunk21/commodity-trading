import ComplanDropdownAction from "@/app/admin/complan/_components/dropdown-action";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Complan } from "@/types/complan-system.type";

type Props = {
  complanList: Complan[];
};

export default function ComplanTable({ complanList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="md:font-semibold">Name</TableHead>
            <TableHead className="md:font-semibold">Description</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complanList.map((complan) => (
            <TableRow
              key={complan.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Name
                </span>
                {complan.name}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Description
                </span>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <p className="truncate max-w-40">{complan.description}</p>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-transparent backdrop-blur-md">
                    {complan.description}
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <ComplanDropdownAction complan={complan} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
