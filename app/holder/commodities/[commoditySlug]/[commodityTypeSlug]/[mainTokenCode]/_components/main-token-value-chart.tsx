"use client";
import { currency } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


type TokenValueChartProps = {
  chartData: any[];
};

export default function MainTokenValueChart({
  chartData,
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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
          tickFormatter={(value) => currency(Number(value))}
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
          formatter={(value) => [currency(Number(value)), "Value"]}
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
            fill: "#10b981",
            strokeWidth: 0,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
