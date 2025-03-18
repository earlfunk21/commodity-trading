import AllocationAccountDropdownAction from "@/app/admin/allocation-account/_components/dropdown-action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { AllocationAccount } from "@/types/accounting.type";
import { format } from "date-fns";

type Props = {
  allocationAccountList: AllocationAccount[];
};

export default function AllocationAccountTable({
  allocationAccountList,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">Allocation</TableHead>
            <TableHead className="text-xs">Balance</TableHead>
            <TableHead className="text-xs">Date Updated</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocationAccountList.map((allocationAccount) => (
            <TableRow
              key={allocationAccount.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Allocation
                </span>
                {allocationAccount.allocation}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Balance
                </span>
                {currency(allocationAccount.balance)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Date Updated
                </span>
                <span className="font-medium">
                  {format(allocationAccount.updatedAt, "PPp")}
                </span>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <AllocationAccountDropdownAction
                  allocationAccount={allocationAccount}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
