import ComplanDropdownAction from "@/app/admin/complan/_components/dropdown-action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Complan } from "@/types/accounting.type";

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
            <TableHead className="md:font-semibold">Referral (%)</TableHead>
            <TableHead className="md:font-semibold">Management (%)</TableHead>
            <TableHead className="md:font-semibold">Pooling (%)</TableHead>
            <TableHead className="md:font-semibold">Capital (%)</TableHead>
            <TableHead className="md:font-semibold">
              IT Management (%)
            </TableHead>
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
                  Referral
                </span>
                {complan.referral}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Management
                </span>
                {complan.management}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Pooling
                </span>
                {complan.pooling}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Capital
                </span>
                {complan.capital}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  IT Management
                </span>
                {complan.itManagement}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <ComplanDropdownAction complan={complan} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
