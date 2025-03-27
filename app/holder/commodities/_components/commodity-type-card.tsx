import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, currency } from "@/lib/utils";
import { CommodityType } from "@/types/pooling.type";
import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
  commodityType: CommodityType;
};

export default function CommodityTypeCard({ commodityType }: Props) {
  return (
    <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium text-white">
          {commodityType.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {/* Last Price Card */}
          <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
            <div className="text-zinc-400 text-xs mb-1">Last</div>
            <div className="text-white font-mono text-xs font-medium tracking-tight">
              {currency(commodityType.last)}
            </div>
          </div>

          <div
            className={cn(
              "rounded-xl p-3 transition-all duration-300",
              commodityType.change >= 0
                ? "bg-gradient-to-r from-emerald-950/50 to-emerald-900/30 hover:from-emerald-950/70 hover:to-emerald-900/50"
                : "bg-gradient-to-r from-red-950/50 to-red-900/30 hover:from-red-950/70 hover:to-red-900/50"
            )}>
            <div className="text-zinc-400 text-xs mb-1.5">Change</div>
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center justify-center w-4 h-4 rounded-full",
                  commodityType.change >= 0
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-red-500/20 text-red-500"
                )}>
                {commodityType.change >= 0 ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
              </div>
              <span
                className={cn(
                  "font-mono font-medium text-xs",
                  commodityType.change >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                )}>
                <span className="text-xs">
                  {currency(Math.abs(commodityType.change))}%
                </span>
              </span>
            </div>
          </div>

          {/* Volume Card */}
          <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
            <div className="text-zinc-400 text-xs mb-1">Volume</div>
            <div className="text-white font-mono text-xs">
              {currency(commodityType.volume)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
