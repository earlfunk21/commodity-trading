import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import MainTokenValueChart from "./main-token-value-chart";


export default async function MainTokenChartData() {
  return (
    <Card className="border border-zinc-800/60 bg-gradient-to-br from-zinc-900/95 to-black backdrop-blur-xl shadow-2xl overflow-hidden h-full flex flex-col relative group">
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <CardHeader className="pb-3 pt-5 px-6">
        <CardTitle className="text-xl font-medium text-white flex items-center gap-2">
          Token Value Chart
        </CardTitle>
        <CardDescription className="text-zinc-400">
          {/* Historical value for {mainToken.code} */}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col">
        <Tabs defaultValue="1m" className="px-6">
          <div className="flex items-center justify-between mb-3">
            <TabsList className="bg-zinc-800/40 border border-zinc-700/30">
              <TabsTrigger value="1w" className="text-xs">
                1D
              </TabsTrigger>
              <TabsTrigger value="1m" className="text-xs">
                1M
              </TabsTrigger>
              <TabsTrigger value="3m" className="text-xs">
                3M
              </TabsTrigger>
              <TabsTrigger value="1y" className="text-xs">
                1Y
              </TabsTrigger>
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center text-zinc-400 text-xs gap-1">
              <Info size={12} />
              <span>Updated today</span>
            </div>
          </div>

          <TabsContent value="1m" className="mt-0 h-[300px]">
            <MainTokenValueChart />
          </TabsContent>

          {/* Other tabs would have similar content with different data ranges */}
          {["1w", "3m", "1y", "all"].map((period) => (
            <TabsContent key={period} value={period} className="mt-0 h-[300px]">
              <div className="flex items-center justify-center h-full text-zinc-400">
                {period} chart data would appear here
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
