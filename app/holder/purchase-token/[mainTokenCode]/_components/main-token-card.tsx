"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, currency } from "@/lib/utils";
import { MainToken } from "@/types/pooling.type";
import { differenceInMilliseconds, format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
  mainToken: MainToken;
};

export default function MainTokenCard({ mainToken }: Props) {
  return (
    <Card className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl max-w-xl w-full">
      <CardHeader className="pb-3 flex flex-col">
        <div>
          <CardTitle className="text-xl font-medium text-white">
            {mainToken.name}
          </CardTitle>
          <CardDescription>{mainToken.code}</CardDescription>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
            <div className="text-gray-400 text-xs mb-1">Last</div>
            <div className="text-white font-mono text-xs font-medium tracking-tight">
              {currency(mainToken.last)}
            </div>
          </div>

          <div
            className={cn(
              "rounded-xl p-3 transition-all duration-300",
              mainToken.change >= 0
                ? "bg-gradient-to-r from-emerald-950/50 to-emerald-900/30 hover:from-emerald-950/70 hover:to-emerald-900/50"
                : "bg-gradient-to-r from-red-950/50 to-red-900/30 hover:from-red-950/70 hover:to-red-900/50"
            )}>
            <div className="text-gray-400  text-xs mb-1.5">Change</div>
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center justify-center w-4 h-4 rounded-full",
                  mainToken.change >= 0
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-red-500/20 text-red-500"
                )}>
                {mainToken.change >= 0 ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
              </div>
              <span
                className={cn(
                  "font-mono font-medium text-xs",
                  mainToken.change >= 0 ? "text-emerald-400" : "text-red-400"
                )}>
                {currency(Math.abs(mainToken.change))}%
              </span>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
            <div className="text-gray-400  text-xs mb-1">Volume</div>
            <div className="text-white font-mono text-xs">
              {currency(mainToken.volume)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 flex flex-col gap-8 text-sm">
          <div className="space-y-2">
            {/* Left column details */}
            <div className="flex justify-between">
              <span className="text-red-400">SEC Backed MTID</span>
              <span className="text-white">{mainToken.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Currency</span>
              <span className="text-white">
                {currency(mainToken.totalValue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Value</span>
              <span>{mainToken.unitValue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Trading Duration</span>
              <span>
                {differenceInMilliseconds(
                  mainToken.tradingEnd,
                  mainToken.tradingStart
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Insurance Company</span>
              <span>{mainToken.insurerCompany}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Certificate of Stock No.</span>
              <span>{mainToken.certificateOfStockNumber}</span>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              {/* Right column details */}
              <div className="flex justify-between">
                <span className="text-red-400">Trading Start</span>
                <span className="text-white">
                  {format(mainToken.tradingStart, "PPp")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Trading End</span>
                <span>{format(mainToken.tradingEnd, "PPp")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">SEC Backed STID Count</span>
                <span>{mainToken._count.subTokens}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
