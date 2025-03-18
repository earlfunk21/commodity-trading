"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, currency } from "@/lib/utils";
import { CommodityType } from "@/types/pooling.type";
import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import CommodityTypeEmptyCard from "../../_components/commodity-type-empty-card";

type Props = {
  commoditySlug: string;
  commodityType: CommodityType;
};

export default function CommodityTypeCard({
  commoditySlug,
  commodityType,
}: Props) {
  return (
    <Card
      key={commodityType.id}
      className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl grid grid-cols-12">
      <CardHeader className="col-span-4">
        <Link href={`/commodities/${commoditySlug}/${commodityType.slug}`}>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight hover:from-orange-500 hover:via-red-500 hover:to-orange-500 cursor-pointer">
            {commodityType.name}
          </CardTitle>
        </Link>
        <CardDescription className="text-zinc-400 text-lg font-light tracking-wide">
          {commodityType.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 col-span-8 grid-rows-2">
        {commodityType.mainTokens.map((mainToken) => (
          <Card
            key={mainToken.code}
            className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-medium text-white">
                {mainToken.code}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
                  <div className="text-zinc-400 text-xs mb-1">Last</div>
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
                  <div className="text-zinc-400 text-xs mb-1.5">Change</div>
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
                        mainToken.change >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      )}>
                      <span className="text-xs">
                        {currency(Math.abs(mainToken.change))}%
                      </span>
                    </span>
                  </div>
                </div>

                {/* Volume Card */}
                <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
                  <div className="text-zinc-400 text-xs mb-1">Volume</div>
                  <div className="text-white font-mono text-xs">
                    {currency(mainToken.volume)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {[...Array(4 - commodityType.mainTokens.length)].map((_, index) => (
          <CommodityTypeEmptyCard key={index} />
        ))}
      </CardContent>
    </Card>
  );
}
