import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, currency } from "@/lib/utils";
import { SubToken } from "@/types/pooling.type";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  CoinsIcon,
  Info,
  Package,
  Shield,
  Tag,
} from "lucide-react";
import Link from "next/link";

type Props = {
  subTokenList: SubToken[];
};

export default function SubTokenCard({ subTokenList }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subTokenList.map((subToken) => (
        <Card
          key={subToken.id}
          className="border border-zinc-800/60 bg-gradient-to-br from-zinc-900/95 to-black backdrop-blur-xl shadow-xl overflow-hidden h-full flex flex-col relative group">
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <CardHeader className="pb-2 pt-6 px-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <CardTitle className="text-xl font-medium text-white mb-1 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-blue-400" />
                  Sub Token
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-zinc-900/80 border-zinc-700 text-xs font-medium py-0">
                    ID: {subToken.id.substring(0, 8)}...
                  </Badge>
                  <span className="text-xs text-zinc-400">
                    {format(new Date(subToken.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              <Badge
                className={cn(
                  "px-2.5 py-1.5 rounded-md text-xs font-medium",
                  subToken.status === "Active"
                    ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/50"
                    : "bg-red-900/20 text-red-400 border-red-800/50"
                )}>
                {subToken.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-zinc-800/30 rounded-xl p-3 hover:bg-zinc-800/50 transition-colors border border-zinc-800/50 backdrop-blur-md">
                <div className="text-zinc-400 text-xs mb-1 font-medium">
                  Tokens
                </div>
                <div className="flex items-center">
                  <CoinsIcon size={14} className="text-blue-400 mr-1.5" />
                  <span className="text-white font-mono text-base font-medium">
                    {subToken.tokens}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-800/30 rounded-xl p-3 hover:bg-zinc-800/50 transition-colors border border-zinc-800/50 backdrop-blur-md">
                <div className="text-zinc-400 text-xs mb-1 font-medium">
                  Possible Income
                </div>
                {(() => {
                  const profit = !!subToken.mainToken.currentTokenValue
                    ? (subToken.mainToken.currentTokenValue.unitValue -
                        subToken.mainTokenValue.unitValue) *
                      subToken.tokens
                    : 0;

                  const isProfitable = profit > 0;
                  const isLoss = profit < 0;

                  return (
                    <div
                      className={cn(
                        "flex items-center font-mono text-base font-medium",
                        isProfitable
                          ? "text-emerald-400"
                          : isLoss
                          ? "text-red-400"
                          : "text-white"
                      )}>
                      {isProfitable && <ArrowUp size={14} className="mr-1" />}
                      {isLoss && <ArrowDown size={14} className="mr-1" />}
                      {currency(Math.abs(profit))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-grow flex flex-col p-0">
            <div className="px-6 py-4 bg-zinc-800/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-zinc-300 font-medium flex items-center">
                  <Shield size={14} className="mr-1.5 text-blue-400" />
                  Main Token
                </span>
              </div>

              <Link
                href={`/commodities/${subToken.commodity.slug}/${subToken.commodityType.slug}/${subToken.mainToken.code}`}
                className="group/link flex items-center justify-between bg-zinc-800/40 px-4 py-2.5 rounded-lg border border-zinc-700/50 hover:bg-zinc-800/60 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium group-hover/link:text-blue-400 transition-colors">
                    {subToken.mainToken.code}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-zinc-800 border-zinc-700 text-xs">
                    {!!subToken.mainToken.currentTokenValue
                      ? currency(subToken.mainToken.currentTokenValue.unitValue)
                      : currency(0)}
                  </Badge>
                </div>
                <ArrowRight
                  size={16}
                  className="text-zinc-500 group-hover/link:text-blue-400 transition-colors"
                />
              </Link>
            </div>

            <Separator className="bg-zinc-800/60" />

            <div className="px-6 py-4 space-y-4 flex-grow">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Commodity</span>
                  <span className="text-white font-medium">
                    {subToken.commodity.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Type</span>
                  <span className="text-white font-medium">
                    {subToken.commodityType.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Purchase Value</span>
                  <span className="text-white font-medium">
                    {currency(subToken.mainTokenValue.unitValue)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Current Value</span>
                  <span className="text-white font-medium">
                    {!!subToken.mainToken.currentTokenValue
                      ? currency(subToken.mainToken.currentTokenValue.unitValue)
                      : "N/A"}
                  </span>
                </div>

                {subToken._count.children > 0 && (
                  <div className="flex justify-between col-span-2">
                    <span className="text-zinc-400">Sub Tokens</span>
                    <div className="flex items-center">
                      <Package size={14} className="text-blue-400 mr-1.5" />
                      <span className="text-white">
                        {subToken._count.children}
                      </span>
                    </div>
                  </div>
                )}

                {subToken.parentTokenId && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex justify-between items-center col-span-2 cursor-help">
                          <span className="text-zinc-400">Parent ID</span>
                          <div className="flex items-center">
                            <span className="text-white font-mono text-xs">
                              {subToken.parentTokenId.substring(0, 8)}...
                            </span>
                            <Info size={12} className="text-zinc-500 ml-1" />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>This is a split token from a parent token</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-800/30 px-3 py-2 rounded-lg border border-zinc-800/50">
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1.5 text-blue-400" />
                  Created
                </div>
                <div>
                  {format(new Date(subToken.createdAt), "MMM d, yyyy h:mm a")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
