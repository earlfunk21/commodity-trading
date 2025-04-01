import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { MainTokenTransaction } from "@/types/pooling.type";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  mainTokenTransactionList: MainTokenTransaction[];
};

export default function MainTokenTransactionTable({
  mainTokenTransactionList,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">User</TableHead>
            <TableHead className="text-xs">MainToken</TableHead>
            <TableHead className="text-xs">Amount</TableHead>
            <TableHead className="text-xs">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mainTokenTransactionList.map((mainTokenTransaction) => (
            <TableRow
              key={mainTokenTransaction.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  User
                </span>
                <Link
                  href={`/admin/user/${mainTokenTransaction.user.username}`}
                  className="text-blue-600 hover:underline">
                  {mainTokenTransaction.user.username}
                </Link>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  MainToken
                </span>
                <Link
                  href={`/admin/complan/${mainTokenTransaction.mainToken.code}`}
                  className="text-blue-600 hover:underline">
                  {mainTokenTransaction.mainToken.code}
                </Link>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Amount
                </span>
                {currency(mainTokenTransaction.amount)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Created At
                </span>
                <span className="font-medium">
                  {format(mainTokenTransaction.createdAt, "PPp")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
