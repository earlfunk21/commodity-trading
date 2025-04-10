import MainTokenDropdownAction from "@/app/admin/main-token/_components/dropdown-action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/utils";
import { MainToken } from "@/types/pooling.type";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  mainTokenList: MainToken[];
};

export default function MainTokenTable({ mainTokenList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">Update Date</TableHead>
            <TableHead className="text-xs">Type</TableHead>
            <TableHead className="text-xs">Code</TableHead>
            <TableHead className="text-xs">Funds Needed</TableHead>
            <TableHead className="text-xs">Accumulated Funds</TableHead>
            <TableHead className="text-xs">Balance</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mainTokenList.map((mainToken) => (
            <TableRow
              key={mainToken.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-[10px] font-medium">
                  Update Date
                </span>
                {format(mainToken.updatedAt, "PPp")}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Type
                </span>
                <Link
                  href={`/admin/commodity-type/${mainToken.commodityType.slug}`}
                  className="text-blue-600 hover:underline">
                  {mainToken.commodityType.name}
                </Link>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Code
                </span>
                {mainToken.code}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Funds Needed
                </span>
                {currency(mainToken.totalFundsNeeded)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Accumulated Funds
                </span>
                {currency(mainToken.totalAccumulatedFunds)}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Balance
                </span>
                {currency(
                  mainToken.totalFundsNeeded - mainToken.totalAccumulatedFunds
                )}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <MainTokenDropdownAction mainToken={mainToken} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
