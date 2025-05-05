import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { TradeTransaction } from "@/types/pooling.type";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  tradeTransactionList: TradeTransaction[];
};

export default function TradeTransactionTable({ tradeTransactionList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">Complan</TableHead>
            <TableHead className="text-xs">Total Gross Sales</TableHead>
            <TableHead className="text-xs">Total Unit Quantity</TableHead>
            <TableHead className="text-xs">TPCTI</TableHead>
            <TableHead className="text-xs">Versa IT</TableHead>
            <TableHead className="text-xs">Capital</TableHead>
            <TableHead className="text-xs">Gross Income</TableHead>
            <TableHead className="text-xs">VAT</TableHead>
            <TableHead className="text-xs">Service Fee</TableHead>
            <TableHead className="text-xs">Net Income</TableHead>
            <TableHead className="text-xs">Token Value</TableHead>
            <TableHead className="text-xs">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeTransactionList.map((tradeTransaction) => (
            <TableRow
              key={tradeTransaction.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Complan
                </span>
                <div>
                  <div>
                    <Link
                      href={`/admin/complan/${tradeTransaction.complanId}`}
                      className="text-blue-600 hover:underline">
                      {tradeTransaction.complan.name}
                    </Link>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {tradeTransaction.complanId}
                  </div>
                </div>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Gross Sales
                </span>
                {currency(tradeTransaction.totalGrossSales)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Unit Quantity
                </span>
                {tradeTransaction.totalUnitQuantity}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  TPCTI
                </span>
                {currency(tradeTransaction.tpcti)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Versa IT
                </span>
                {currency(tradeTransaction.versaIt)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Capital
                </span>
                {currency(tradeTransaction.capital)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Gross Income
                </span>
                {currency(tradeTransaction.grossIncome)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  VAT
                </span>
                {currency(tradeTransaction.vat)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Service Fee
                </span>
                {currency(tradeTransaction.serviceFee)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Net Income
                </span>
                {currency(tradeTransaction.netIncome)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Token Value
                </span>
                {currency(tradeTransaction.tokenValue)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Created At
                </span>
                <span className="font-medium">
                  {format(tradeTransaction.createdAt, "PPp")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
