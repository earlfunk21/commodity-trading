import { getHolderCount } from "@/actions/pooling/holder.action";
import { getTradeCount } from "@/actions/pooling/trade.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Users } from "lucide-react";

export default async function AdminDashboard() {
  const { data: totalHolders } = await getHolderCount();
  const { data: activeTrades } = await getTradeCount();

  return (
    <main className="p-4 sm:p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome to your commodity exchange admin dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Holders</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHolders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTrades}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
