import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Complan } from "@/types/complan-system.type";
import { format } from "date-fns";
import { Coins, Hash, Package } from "lucide-react";
import Link from "next/link";

interface ComplanCardProps {
  complan: Complan;
}

export default function ComplanDetailsCard({ complan }: ComplanCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="relative h-48 w-full">
        <div className="h-full w-full bg-muted flex flex-col items-center justify-center gap-2">
          <Package className="h-12 w-12 text-muted-foreground/50" />
          <div className="text-sm text-muted-foreground/70 text-center px-4">
            <p>No image available for</p>
            <p className="font-medium">{complan.name}</p>
          </div>
        </div>
      </div>

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
        <div className="space-y-2">
          <h4 className="font-semibold">Description</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {complan.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Types</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {complan._count.allocations}
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Main Tokens</span>
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
