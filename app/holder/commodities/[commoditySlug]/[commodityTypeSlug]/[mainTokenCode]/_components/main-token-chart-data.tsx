import {
  getTokenValuesByDay,
  getTokenValuesByHour,
  getTokenValuesByMinute,
  getTokenValuesByMonth,
  getTokenValuesByYear,
} from "@/actions/pooling/main-token-value.action";
import { getMainToken } from "@/actions/pooling/main-token.action";
import LoadingIcon from "@/components/loading-icon";
import { AlertError } from "@/components/ui-extension/alerts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Info } from "lucide-react";
import { Suspense } from "react";
import MainTokenValueChart from "./main-token-value-chart";

type Props = {
  mainTokenCode: string;
};
export default async function MainTokenChartData({ mainTokenCode }: Props) {
  const { data: mainToken } = await getMainToken(mainTokenCode);

  if (!mainToken) {
    return <AlertError title="Main token not found" />;
  }

  return (
    <Card className="border border-zinc-800/60 bg-gradient-to-br from-zinc-900/95 to-black backdrop-blur-xl shadow-2xl overflow-hidden h-full flex flex-col relative group">
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <CardHeader className="pb-3 pt-5 px-6">
        <CardTitle className="text-xl font-medium text-white flex items-center gap-2">
          Token Value Chart
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Historical value for {mainToken.code}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col">
        <Tabs defaultValue="1min" className="px-6">
          <div className="flex items-center justify-between mb-3">
            <TabsList className="bg-zinc-800/40 border border-zinc-700/30">
              <TabsTrigger value="1min" className="text-xs">
                1min
              </TabsTrigger>
              <TabsTrigger value="1hr" className="text-xs">
                1hr
              </TabsTrigger>
              <TabsTrigger value="1day" className="text-xs">
                1day
              </TabsTrigger>
              <TabsTrigger value="1mon" className="text-xs">
                1mon
              </TabsTrigger>
              <TabsTrigger value="1yr" className="text-xs">
                1yr
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center text-zinc-400 text-xs gap-1">
              <Info size={12} />
              <span>Updated today</span>
            </div>
          </div>

          <TabsContent value="1min" className="mt-0 h-[300px]">
            <Suspense fallback={<LoadingIcon />}>
              <MainTokenValueByMinute />
            </Suspense>
          </TabsContent>

          <TabsContent value="1hr" className="mt-0 h-[300px]">
            <Suspense fallback={<LoadingIcon />}>
              <MainTokenValueByHour />
            </Suspense>
          </TabsContent>

          <TabsContent value="1day" className="mt-0 h-[300px]">
            <Suspense fallback={<LoadingIcon />}>
              <MainTokenValueByDay />
            </Suspense>
          </TabsContent>

          <TabsContent value="1mon" className="mt-0 h-[300px]">
            <Suspense fallback={<LoadingIcon />}>
              <MainTokenValueByMonth />
            </Suspense>
          </TabsContent>

          <TabsContent value="1yr" className="mt-0 h-[300px]">
            <Suspense fallback={<LoadingIcon />}>
              <MainTokenValueByYear />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

async function MainTokenValueByMinute() {
  const { data: tokenValuesByMinute } = await getTokenValuesByMinute();

  const chartData = tokenValuesByMinute.map((tokenValue) => ({
    value: tokenValue.value,
    date: format(tokenValue.date, "Pp"),
  }));

  return <MainTokenValueChart chartData={chartData} />;
}

async function MainTokenValueByHour() {
  const { data: tokenValuesByHour } = await getTokenValuesByHour();

  const chartData = tokenValuesByHour.map((tokenValue) => ({
    value: tokenValue.value,
    date: format(tokenValue.date, "Pp"),
  }));

  return <MainTokenValueChart chartData={chartData} />;
}

async function MainTokenValueByDay() {
  const { data: tokenValuesByDay } = await getTokenValuesByDay();

  const chartData = tokenValuesByDay.map((tokenValue) => ({
    value: tokenValue.value,
    date: format(tokenValue.date, "PPp"),
  }));

  return <MainTokenValueChart chartData={chartData} />;
}

async function MainTokenValueByMonth() {
  const { data: tokenValuesByMonth } = await getTokenValuesByMonth();

  const chartData = tokenValuesByMonth.map((tokenValue) => ({
    value: tokenValue.value,
    date: format(tokenValue.date, "MMM"),
  }));

  return <MainTokenValueChart chartData={chartData} />;
}

async function MainTokenValueByYear() {
  const { data: tokenValuesByYear } = await getTokenValuesByYear();

  const chartData = tokenValuesByYear.map((tokenValue) => ({
    value: tokenValue.value,
    date: format(tokenValue.date, "yyyy"),
  }));

  return <MainTokenValueChart chartData={chartData} />;
}
