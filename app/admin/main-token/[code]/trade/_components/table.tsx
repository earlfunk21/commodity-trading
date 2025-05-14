import TradeDropdownAction from "@/app/admin/main-token/[code]/trade/_components/dropdown-action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { Trade } from "@/types/pooling.type";
import TradeCheckbox from "./checkbox";
import TradeTableHeadCheckbox from "./table-head-checkbox";

type Props = {
  tradeList: Trade[];
};

export default function TradeTable({ tradeList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="md:font-semibold">
              <TradeTableHeadCheckbox
                trades={tradeList.filter((trade) => !trade.processedAt)}
              />
            </TableHead>
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
            <TableHead className="md:font-semibold">Processed At</TableHead>
            <TableHead className="md:font-semibold">Created At</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeList.map((trade) => (
            <TableRow
              key={trade.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell text-right md:text-justify">
                <TradeCheckbox trade={trade} />
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Capital
                </span>
                {currency(trade.capital)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Unit Value
                </span>
                {currency(trade.unitValue)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Sold Amount
                </span>
                {currency(trade.soldAmount)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Quantity
                </span>
                {trade.quantity}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Gross Sales
                </span>
                {currency(trade.grossSales)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Gross Profit
                </span>
                {currency(trade.grossProfit)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Net Profit
                </span>
                {currency(trade.netProfit)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Latest Capital
                </span>
                {currency(trade.latestCapital)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Profit %
                </span>
                {currency(trade.profitPercentage)}%
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  VAT Amount
                </span>
                {currency(trade.vatAmount)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Current Value
                </span>
                {currency(trade.currentTokenValue)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Processed At
                </span>
                {!!trade.processedAt ? (
                  new Date(trade.processedAt).toLocaleDateString()
                ) : (
                  <Badge>Not Yet</Badge>
                )}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Created At
                </span>
                {new Date(trade.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <TradeDropdownAction trade={trade} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
