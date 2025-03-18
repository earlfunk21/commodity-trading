import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PurchaseToken } from "@/types/pooling.type";

type Props = {
  purchaseTokenList: PurchaseToken[];
};

export default function PurchaseTokenTable({ purchaseTokenList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">ID</TableHead>
            <TableHead className="text-xs">Amount</TableHead>
            <TableHead className="text-xs">Capital</TableHead>
            <TableHead className="text-xs">Tokens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseTokenList.map((purchaseToken) => (
            <TableRow
              key={purchaseToken.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  ID
                </span>
                {purchaseToken.id}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Amount
                </span>
                {purchaseToken.amount}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Capital
                </span>
                <span className="font-medium">{purchaseToken.capital}</span>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Tokens
                </span>
                <span className="font-medium">{purchaseToken.tokens}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
