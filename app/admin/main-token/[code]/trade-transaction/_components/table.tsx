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
          <TableHead className="md:font-semibold">Capital</TableHead>
            <TableHead className="md:font-semibold">Unit Value</TableHead>
            <TableHead className="md:font-semibold">Sold Amount</TableHead>
            <TableHead className="md:font-semibold">Quantity</TableHead>
            <TableHead className="md:font-semibold">Gross Sales</TableHead>
            <TableHead className="md:font-semibold">Gross Profit</TableHead>
            <TableHead className="md:font-semibold">Net Profit</TableHead>
            <TableHead className="md:font-semibold">Latest Capital</TableHead>
            <TableHead className="md:font-semibold">Profit %</TableHead>
            <TableHead className="md:font-semibold">VAT Amount</TableHead>
            <TableHead className="md:font-semibold">Current Value</TableHead>
            <TableHead className="md:font-semibold">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeTransactionList.map((tradeTransaction) => (
            <TableRow
              key={tradeTransaction.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Capital
                </span>
                {currency(tradeTransaction.capital)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Unit Value
                </span>
                {currency(tradeTransaction.unitValue)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Sold Amount
                </span>
                {currency(tradeTransaction.soldAmount)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Quantity
                </span>
                {currency(tradeTransaction.quantity)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Gross Sales
                </span>
                {currency(tradeTransaction.grossSales)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Gross Profit
                </span>
                {currency(tradeTransaction.grossProfit)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Net Profit
                </span>
                {currency(tradeTransaction.netProfit)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Latest Capital
                </span>
                {currency(tradeTransaction.latestCapital)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Profit %
                </span>
                {currency(tradeTransaction.profitPercentage)}%
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  VAT Amount
                </span>
                {currency(tradeTransaction.vatAmount)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Current Value
                </span>
                {currency(tradeTransaction.currentTokenValue)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Created At
                </span>
                {new Date(tradeTransaction.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
