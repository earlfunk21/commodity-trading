import CommodityTypeDropdownAction from "@/app/admin/commodity/[commoditySlug]/commodity-type/_components/dropdown-action";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CommodityType } from "@/types/pooling.type";

type Props = {
  commodityTypeList: CommodityType[];
};

export default function CommodityTypeTable({ commodityTypeList }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="md:font-semibold">Name</TableHead>
            <TableHead className="md:font-semibold">Description</TableHead>
            <TableHead className="md:font-semibold">Slug</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commodityTypeList.map((commodityType) => (
            <TableRow
              key={commodityType.id}
              className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Name
                </span>
                {commodityType.name}
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Description
                </span>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <p className="truncate max-w-40">
                      {commodityType.description}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-transparent backdrop-blur-md">
                    {commodityType.description}
                  </HoverCardContent>
                </HoverCard>
              </TableCell>

              <TableCell className="flex items-center justify-between md:table-cell py-4">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Slug
                </span>
                <span className="font-medium">{commodityType.slug}</span>
              </TableCell>
              <TableCell className="flex items-center justify-between md:table-cell">
                <span className="md:hidden text-muted-foreground text-sm font-medium">
                  Actions
                </span>
                <CommodityTypeDropdownAction commodityType={commodityType} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
