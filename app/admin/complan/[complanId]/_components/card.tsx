import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Complan } from "@/types/accounting.type";
import { format } from "date-fns";
import { Hash, Percent } from "lucide-react";
import Link from "next/link";

interface ComplanCardProps {
  complan: Complan;
}

export default function ComplanDetailsCard({ complan }: ComplanCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold tracking-tight">{complan.name}</h3>
          <p className="text-sm text-muted-foreground">{complan.id}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`${complan.id}/update`}>Edit Complan</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Primary Fees
            </h4>
            <div className="grid gap-3 text-sm">
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Commission</span>
                <span className="font-medium">{complan.commission}%</span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{complan.tax}%</span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">
                  Referral Commission
                </span>
                <span className="font-medium">
                  {complan.referralCommission}%
                </span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">
                  Pending Referral Commission
                </span>
                <span className="font-medium">
                  {complan.pendingReferralCommission}%
                </span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Management Fee</span>
                <span className="font-medium">{complan.managementFee}%</span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">
                  Pending Management Fee
                </span>
                <span className="font-medium">
                  {complan.pendingManagementFee}%
                </span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">Capital</span>
                <span className="font-medium">{complan.capital}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Management Fees
            </h4>
            <div className="grid gap-3 text-sm">
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">IT Management</span>
                <span className="font-medium">{complan.itManagement}%</span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">
                  Partners Management
                </span>
                <span className="font-medium">
                  {complan.partnersManagement}%
                </span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">
                  TPCPI Referrer Management
                </span>
                <span className="font-medium">
                  {complan.tpcpiReferrerManagement}%
                </span>
              </div>
              <div className="flex flex-col p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground">TPCPI Management</span>
                <span className="font-medium">{complan.tpcpiManagement}%</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Details
          </h4>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex flex-col p-2 rounded-md bg-muted/50">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">
                {format(complan.createdAt, "PPP")}
              </span>
            </div>
            <div className="flex flex-col p-2 rounded-md bg-muted/50">
              <span className="text-muted-foreground">Updated</span>
              <span className="font-medium">
                {format(complan.updatedAt, "PPP")}
              </span>
            </div>
            {complan.deletedAt && (
              <div className="flex flex-col p-2 rounded-md bg-destructive/10">
                <span className="text-destructive">Deleted</span>
                <span className="font-medium text-destructive">
                  {format(complan.deletedAt, "PPP")}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
