import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, currency, dateRemianing } from "@/lib/utils";
import { MainToken } from "@/types/pooling.type";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  Clock,
  Globe,
  Info,
  Package,
  Shield,
} from "lucide-react";
import Link from "next/link";

type Props = {
  commoditySlug: string;
  commodityTypeSlug: string;
  mainToken: MainToken;
};

export default function MainTokenCard({
  commoditySlug,
  commodityTypeSlug,
  mainToken,
}: Props) {
  return (
    <Card className="border border-zinc-800/60 bg-gradient-to-br from-zinc-900/95 to-black backdrop-blur-xl shadow-2xl overflow-hidden h-full flex flex-col relative group">
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link
              href={`/commodities/${commoditySlug}/${commodityTypeSlug}/${mainToken.code}`}
              className="group/link">
              <CardTitle className="text-2xl font-medium text-white mb-1 group-hover/link:text-red-400 transition-colors">
                {mainToken.name}
              </CardTitle>
            </Link>
            <CardDescription className="flex items-center gap-2 text-zinc-400">
              <Badge
                variant="outline"
                className="bg-zinc-900/80 border-zinc-700 text-xs font-medium py-0">
                {mainToken.code}
              </Badge>
              <span className="flex items-center text-xs">
                <Globe size={12} className="mr-1" />
                {mainToken.origin}
              </span>
            </CardDescription>
          </div>

          <Badge
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium",
              mainToken.change >= 0
                ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/50"
                : "bg-red-900/20 text-red-400 border-red-800/50"
            )}>
            <span className="flex items-center gap-1">
              {mainToken.change >= 0 ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {currency(Math.abs(mainToken.change))}%
            </span>
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-zinc-800/30 rounded-xl p-3.5 hover:bg-zinc-800/50 transition-colors border border-zinc-800/50 backdrop-blur-md">
            <div className="text-zinc-400 text-xs mb-2 font-medium">
              Last Price
            </div>
            <div className="text-white font-mono text-base font-medium tracking-tight">
              {currency(mainToken.last)}
            </div>
          </div>

          <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-3.5 transition-all duration-300 backdrop-blur-md">
            <div className="text-zinc-400 text-xs mb-2 font-medium">Volume</div>
            <div className="text-white font-mono text-base">
              {currency(mainToken.volume)}
            </div>
          </div>

          <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-3.5 transition-all duration-300 backdrop-blur-md">
            <div className="text-zinc-400 text-xs mb-2 font-medium">
              STID Count
            </div>
            <div className="flex items-center">
              <Package size={14} className="text-red-400 mr-1.5" />
              <span className="text-white font-mono text-base">
                {mainToken._count.subTokens}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col p-0">
        <div className="px-6 py-4 bg-zinc-800/20">
          <div className="flex justify-between items-center mb-3">
            <span className="flex items-center text-xs text-zinc-400 font-medium">
              <Clock size={14} className="mr-1.5 text-red-400" />
              Trading Duration
            </span>
            <span className="text-sm text-white font-medium">
              {dateRemianing(new Date(), mainToken.tradingDuration, 3)} left
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <div className="flex flex-col">
              <span className="text-zinc-400 mb-1">Pooling Start</span>
              <span className="text-white font-medium">
                {format(new Date(mainToken.poolingStart), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-400 mb-1">Trading Start</span>
              <span className="text-white font-medium">
                {format(new Date(mainToken.tradingStart), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-400 mb-1">Pooling End</span>
              <span className="text-white font-medium">
                {format(new Date(mainToken.poolingEnd), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-400 mb-1">Trading End</span>
              <span className="text-white font-medium">
                {format(new Date(mainToken.tradingEnd), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-zinc-800/60" />

        <div className="px-6 py-4 space-y-4 flex-grow">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {/* Left column */}
            <div className="flex justify-between">
              <span className="text-zinc-400">SEC ID</span>
              <span className="text-white font-mono text-xs">
                {mainToken.id.substring(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">P-Bond</span>
              <span className="text-white font-mono text-xs">
                {mainToken.performanceBondNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Certificate</span>
              <span className="text-white font-mono text-xs">
                {mainToken.certificateOfStockNumber.substring(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">CADT</span>
              <span className="text-white font-mono text-xs">
                {mainToken.CADTNumber}
              </span>
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-between bg-zinc-800/30 px-3 py-2 rounded-lg border border-zinc-800/50 cursor-help">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-red-400" />
                    <span className="text-zinc-300 text-sm">
                      {mainToken.insurerCompany}
                    </span>
                  </div>
                  <Info size={12} className="text-zinc-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[300px]">
                <p>Insurance provider for this commodity token</p>
                <p className="text-xs text-zinc-400 mt-1">{mainToken.specs}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="p-6 pt-2 mt-auto">
          <Button
            className={cn(
              "w-full py-5 text-base font-medium",
              "bg-gradient-to-r from-red-800 to-red-700",
              "hover:from-red-700 hover:to-red-600",
              "border border-red-600/40",
              "shadow-lg shadow-red-900/20",
              "transition-all duration-300"
            )}
            asChild>
            <Link
              href={`/holder/purchase-token/${mainToken.code}`}
              className="flex items-center justify-center">
              Buy Token
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
