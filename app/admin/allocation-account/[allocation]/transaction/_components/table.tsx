import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { AllocationAccountTransaction } from "@/types/accounting.type";
import { format } from "date-fns";

type Props = {
  allocationAccountTransactionList: AllocationAccountTransaction[];
};

export default function AllocationAccountTransactionTable({
  allocationAccountTransactionList,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">Allocation</TableHead>
            <TableHead className="text-xs">Amount</TableHead>
            <TableHead className="text-xs">Type</TableHead>
            <TableHead className="text-xs">Remarks</TableHead>
            <TableHead className="text-xs">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocationAccountTransactionList.map(
            (allocationAccountTransaction) => (
              <TableRow
                key={allocationAccountTransaction.id}
                className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                    Allocation
                  </span>
                  {allocationAccountTransaction.allocation}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Amount
                  </span>
                  {currency(allocationAccountTransaction.amount)}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell py-4">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Type
                  </span>
                  {allocationAccountTransaction.type}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell py-4">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Remarks
                  </span>
                  {allocationAccountTransaction.remarks}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell py-4">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Created At
                  </span>
                  <span className="font-medium">
                    {format(allocationAccountTransaction.createdAt, "PPp")}
                  </span>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
