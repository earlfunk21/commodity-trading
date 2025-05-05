import TradeComplanDropdownAction from "@/app/admin/trade-complan/_components/dropdown-action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TradeComplan } from "@/types/accounting.type";
import { format } from "date-fns";

type Props = {
  tradeComplanList: TradeComplan[];
};

export default function TradeComplanTable({ tradeComplanList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">Name</TableHead>
            <TableHead className="text-xs">IT Management</TableHead>
            <TableHead className="text-xs">TPCTI Management</TableHead>
            <TableHead className="text-xs">Service Charge</TableHead>
            <TableHead className="text-xs">VAT</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeComplanList.map((tradeComplan) => (
            <TableRow
              key={tradeComplan.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Name
                </span>
                {tradeComplan.name}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  IT Management
                </span>
                {tradeComplan.itManagement}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  TPCTI Management
                </span>
                {tradeComplan.tpctiManagement}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Service Charge
                </span>
                {tradeComplan.serviceCharge}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  VAT
                </span>
                {tradeComplan.vat}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <TradeComplanDropdownAction tradeComplan={tradeComplan} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
