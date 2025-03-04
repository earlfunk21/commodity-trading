"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";

interface CommodityData {
  name: string;
  last: number;
  change: {
    value: number;
    percentage: number;
  };
  volume: number;
}

interface CommoditySection {
  title: string;
  description: string;
  commodities: CommodityData[];
}

type Props = {
  section: CommoditySection;
};

export default function CommodityExchangeCard({ section }: Props) {
  return (
    <Card className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl">
      <Link href={`/${section.title.toLowerCase()}`}>
        <CardHeader className="pb-4 cursor-pointer">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight">
            {section.title}
          </CardTitle>
          <CardDescription className="text-zinc-400 text-lg font-light tracking-wide">
            {section.description}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.commodities.map((commodity) => (
            <Card
              key={commodity.name}
              className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-medium text-white">
                  {commodity.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {/* Last Price Card */}
                  <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
                    <div className="text-zinc-400 text-xs mb-1">Last</div>
                    <div className="text-white font-mono text-lg font-medium tracking-tight">
                      ${commodity.last.toLocaleString()}
                    </div>
                  </div>

                  {/* Improved Change Card */}
                  <div
                    className={cn(
                      "rounded-xl p-3 transition-all duration-300",
                      commodity.change.percentage > 0
                        ? "bg-gradient-to-r from-emerald-950/50 to-emerald-900/30 hover:from-emerald-950/70 hover:to-emerald-900/50"
                        : "bg-gradient-to-r from-red-950/50 to-red-900/30 hover:from-red-950/70 hover:to-red-900/50"
                    )}>
                    <div className="text-zinc-400 text-xs mb-1.5">Change</div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn(
                          "flex items-center justify-center w-6 h-6 rounded-full",
                          commodity.change.percentage > 0
                            ? "bg-emerald-500/20 text-emerald-500"
                            : "bg-red-500/20 text-red-500"
                        )}>
                        {commodity.change.percentage > 0 ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "font-mono font-medium text-base",
                          commodity.change.percentage > 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        )}>
                        {commodity.change.value}{" "}
                        <span className="text-xs">
                          ({Math.abs(commodity.change.percentage)}%)
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Volume Card */}
                  <div className="bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-colors">
                    <div className="text-zinc-400 text-xs mb-1">Volume</div>
                    <div className="text-white font-mono text-sm">
                      {commodity.volume.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
