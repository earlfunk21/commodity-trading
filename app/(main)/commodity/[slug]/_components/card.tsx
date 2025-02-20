import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Commodity } from "@/types/pulling.type";
import { format } from "date-fns";
import { Coins, Hash, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CommodityCardProps {
  commodity: Commodity;
}

export default function CommodityDetailsCard({
  commodity,
}: CommodityCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="relative h-48 w-full">
        {commodity.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_URL}/commodity/${commodity.image}`}
            alt={commodity.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted flex flex-col items-center justify-center gap-2">
            <Package className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-sm text-muted-foreground/70 text-center px-4">
              <p>No image available for</p>
              <p className="font-medium">{commodity.name}</p>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold tracking-tight">
            {commodity.name}
          </h3>
          <p className="text-sm text-muted-foreground">{commodity.slug}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`${commodity.slug}/update`}>Edit Commodity</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-semibold">Description</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {commodity.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Types</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {commodity._count.types}
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Main Tokens</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {commodity._count.mainTokens}
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
              <span className="text-muted-foreground">Subtype ID</span>
              <span className="font-medium">{commodity.subtypeId}</span>
            </div>
            <div className="flex flex-col p-2 rounded-md bg-muted/50">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">
                {format(commodity.createdAt, "PPP")}
              </span>
            </div>
            <div className="flex flex-col p-2 rounded-md bg-muted/50">
              <span className="text-muted-foreground">Updated</span>
              <span className="font-medium">
                {format(commodity.updatedAt, "PPP")}
              </span>
            </div>
            {commodity.deletedAt && (
              <div className="flex flex-col p-2 rounded-md bg-destructive/10">
                <span className="text-destructive">Deleted</span>
                <span className="font-medium text-destructive">
                  {format(commodity.deletedAt, "PPP")}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
