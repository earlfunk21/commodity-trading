import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { MainTokenValue } from "@/types/pooling.type";
import { format } from "date-fns";

type Props = {
  mainTokenValueList: MainTokenValue[];
};

export default function MainTokenValueTable({ mainTokenValueList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead>Date</TableHead>
            <TableHead className="text-xs">Main Token</TableHead>
            <TableHead className="text-xs">Total Value</TableHead>
            <TableHead className="text-xs">Unit Value</TableHead>
            <TableHead className="text-xs">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mainTokenValueList.map((mainTokenValue) => (
            <TableRow
              key={mainTokenValue.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Date
                </span>
                {format(mainTokenValue.createdAt, "PPp")}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Main Token
                </span>
                {mainTokenValue.mainToken.code}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Total Value
                </span>
                {currency(mainTokenValue.totalValue)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Unit Value
                </span>
                {currency(mainTokenValue.unitValue)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Volume
                </span>
                {mainTokenValue.volume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
