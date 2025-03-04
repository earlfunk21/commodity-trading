import MainTokenDropdownAction from "@/app/admin/main-token/_components/dropdown-action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MainToken } from "@/types/pooling.type";

type Props = {
  mainTokenList: MainToken[];
};

export default function MainTokenTable({ mainTokenList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="text-xs">Name</TableHead>
            <TableHead className="text-xs">Code</TableHead>
            <TableHead className="text-xs">Commodity</TableHead>
            <TableHead className="text-xs">Commodity Type</TableHead>
            <TableHead className="text-xs">Sub Tokens</TableHead>
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
                  Name
                </span>
                {mainToken.name}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Code
                </span>
                {mainToken.code}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Commodity
                </span>
                <span className="font-medium">{mainToken.commodity.name}</span>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Commodity Type
                </span>
                <span className="font-medium">
                  {mainToken.commodityType.name}
                </span>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Commodity Type
                </span>
                <Badge className="cursor-pointer">
                  {mainToken._count.subTokens}
                </Badge>
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
