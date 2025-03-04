import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MainToken } from "@/types/pooling.type";
import { format } from "date-fns";
import {
  Banknote,
  Box,
  Calendar,
  FileText,
  Globe,
  Package,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { PiCertificateBold } from "react-icons/pi";

interface MainTokenCardProps {
  mainToken: MainToken;
}

export default function MainTokenCard({ mainToken }: MainTokenCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {mainToken.name}
            </h3>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {mainToken.code}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/commodity/${mainToken.commodity.slug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
              <Package className="h-4 w-4" />
              {mainToken.commodity.name}
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href={`/commodity-type/${mainToken.commodityType.slug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
              <Box className="h-4 w-4" />
              {mainToken.commodityType.name}
            </Link>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`${mainToken.code}/update`}>Edit Token</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Value</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              ${mainToken.totalValue.toLocaleString()}
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Unit Value</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              ${mainToken.unitValue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Quantity</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {mainToken.quantity.toLocaleString()}
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Tokens</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {mainToken.totalTokens.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Trading Period</span>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start:</span>
                <span className="font-medium">
                  {format(mainToken.tradingStart, "PPP")}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-muted-foreground">End:</span>
                <span className="font-medium">
                  {format(mainToken.tradingEnd, "PPP")}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 border shadow-sm">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Origin</span>
            </div>
            <div className="mt-2 text-lg font-medium">{mainToken.origin}</div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-muted/30">
          <h4 className="font-semibold mb-3">Certificates & Documentation</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PiCertificateBold className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Certificate of Stock Number</span>
              </div>
              <span className="font-medium">
                {mainToken.certificateOfStockNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Performance Bond Number</span>
              </div>
              <span className="font-medium">
                {mainToken.performanceBondNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">CADT Number</span>
              </div>
              <span className="font-medium">{mainToken.CADTNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Insurer Company</span>
              </div>
              <span className="font-medium">{mainToken.insurerCompany}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col p-2 rounded-md bg-muted/50">
            <span className="text-muted-foreground">Created</span>
            <span className="font-medium">
              {format(mainToken.createdAt, "PPP")}
            </span>
          </div>
          <div className="flex flex-col p-2 rounded-md bg-muted/50">
            <span className="text-muted-foreground">Updated</span>
            <span className="font-medium">
              {format(mainToken.updatedAt, "PPP")}
            </span>
          </div>
          {mainToken.deletedAt && (
            <div className="col-span-2 flex flex-col p-2 rounded-md bg-destructive/10">
              <span className="text-destructive">Deleted</span>
              <span className="font-medium text-destructive">
                {format(mainToken.deletedAt, "PPP")}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
