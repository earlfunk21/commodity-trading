import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComplanFeeBracket } from "@/types/accounting.type";
import ComplanFeeBracketDropdownAction from "./dropdown-action";

type Props = {
  complanFeeBracketList: ComplanFeeBracket[];
};

export default function ComplanFeeBracketTable({
  complanFeeBracketList,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:table-row bg-muted/50">
            <TableHead className="md:font-semibold">Purchases</TableHead>
            <TableHead className="md:font-semibold">Referral Fee %</TableHead>
            <TableHead className="md:font-semibold">
              Initial Referral Fee %
            </TableHead>
            <TableHead className="md:font-semibold">
              Release Referral Fee %
            </TableHead>
            <TableHead className="md:font-semibold">Management Fee %</TableHead>
            <TableHead className="md:font-semibold">
              Initial Management Fee %
            </TableHead>
            <TableHead className="md:font-semibold">
              Release Management Fee %
            </TableHead>
            <TableHead className="md:font-semibold">Complan Name</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complanFeeBracketList.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center py-6 text-muted-foreground">
                No fee brackets found
              </TableCell>
            </TableRow>
          ) : (
            complanFeeBracketList.map((complanFeeBracket) => (
              <TableRow
                key={complanFeeBracket.id}
                className="group flex flex-col md:table-row hover:bg-muted/50 transition-colors">
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Purchases
                  </span>
                  {complanFeeBracket.purchases}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Referral Fee (%)
                  </span>
                  {complanFeeBracket.referralFeePercentage}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Initial Referral Fee (%)
                  </span>
                  {complanFeeBracket.initialReferralFeePercentage}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Release Referral Fee (%)
                  </span>
                  {complanFeeBracket.releaseReferralFeePercentage}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Management Fee
                  </span>
                  {complanFeeBracket.managementFeePercentage}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Initial Management Fee (%)
                  </span>
                  {complanFeeBracket.initialManagementFeePercentage}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Release Management Fee (%)
                  </span>
                  {complanFeeBracket.releaseManagementFeePercentage}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <span className="md:hidden text-muted-foreground text-sm font-medium">
                    Complan
                  </span>
                  {complanFeeBracket.complan.name}
                </TableCell>
                <TableCell className="flex items-center justify-between md:table-cell">
                  <ComplanFeeBracketDropdownAction
                    complanFeeBracket={complanFeeBracket}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
