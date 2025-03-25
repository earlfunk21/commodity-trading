"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, currency } from "@/lib/utils";
import { Info, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data - in a real app, this would be passed as props
const sampleData = [
  { date: "Jan 1", value: 5200 },
  { date: "Jan 15", value: 5350 },
  { date: "Feb 1", value: 5100 },
  { date: "Feb 15", value: 5700 },
  { date: "Mar 1", value: 5900 },
  { date: "Mar 15", value: 5800 },
  { date: "Apr 1", value: 6300 },
  { date: "Apr 15", value: 6100 },
  { date: "May 1", value: 6500 },
];

type TokenValueChartProps = {
  mainTokenCode?: string;
  chartData?: Array<{ date: string; value: number }>;
  latestValue?: number;
  percentageChange?: number;
  previousClose?: number;
};

export default function MainTokenValueChart({
  mainTokenCode = "GOLD01",
  chartData = sampleData,
  latestValue = 6500,
  percentageChange = 6.8,
  previousClose = 6100,
}: TokenValueChartProps) {
  const minValue = Math.min(...chartData.map((item) => item.value)) * 0.95;
  const maxValue = Math.max(...chartData.map((item) => item.value)) * 1.05;

  // Calculate chart domain padding
  const valueRange = maxValue - minValue;
  const yAxisDomain = [
    minValue - valueRange * 0.1,
    maxValue + valueRange * 0.1,
  ];

  return (
    <Card className="border border-zinc-800/60 bg-gradient-to-br from-zinc-900/95 to-black backdrop-blur-xl shadow-2xl overflow-hidden h-full flex flex-col relative group">
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <CardHeader className="pb-3 pt-5 px-6">
        <CardTitle className="text-xl font-medium text-white flex items-center gap-2">
          Token Value Chart
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Historical value for {mainTokenCode}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col">
        <Tabs defaultValue="1m" className="px-6">
          <div className="flex items-center justify-between mb-3">
            <TabsList className="bg-zinc-800/40 border border-zinc-700/30">
              <TabsTrigger value="1w" className="text-xs">
                1W
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
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#10b981"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#a1a1aa" }}
                  dy={10}
                />
                <YAxis
                  domain={yAxisDomain}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#a1a1aa" }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  width={60}
                />
                <CartesianGrid
                  stroke="#27272a"
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.4}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(24, 24, 27, 0.95)",
                    borderColor: "#3f3f46",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                  itemStyle={{ color: "#ffffff" }}
                  formatter={(value) => [`${currency(Number(value))}`, "Value"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                  activeDot={{
                    r: 6,
                    fill:"#10b981",
                    strokeWidth: 0,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
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
