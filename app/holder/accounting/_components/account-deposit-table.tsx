import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { AccountDeposit } from "@/types/accounting.type";
import { format } from "date-fns";

type Props = {
  accountDepositList: AccountDeposit[];
};

export default function AccountDepositTable({ accountDepositList }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hidden md:table-row bg-muted/50">
          <TableHead className="text-xs">Amount</TableHead>
          <TableHead className="text-xs">Status</TableHead>
          <TableHead className="text-xs">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accountDepositList.map((accountDeposit) => (
          <TableRow
            key={accountDeposit.id}
            className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
            <TableCell className="flex items-center justify-between md:table-cell">
              <span className="md:hidden text-muted-foreground text-sm font-medium">
                Amount
              </span>
              {currency(accountDeposit.amount)}
            </TableCell>
            <TableCell className="flex items-center justify-between md:table-cell py-4">
              <span className="md:hidden text-muted-foreground text-sm font-medium">
                Status
              </span>
              <span className="font-medium">{accountDeposit.status}</span>
            </TableCell>
            <TableCell className="flex items-center justify-between md:table-cell py-4">
              <span className="md:hidden text-muted-foreground text-sm font-medium">
                Date
              </span>
              <span className="font-medium">
                {format(accountDeposit.createdAt, "PPp")}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
