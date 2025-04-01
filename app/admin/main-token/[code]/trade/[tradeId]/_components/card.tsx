import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trade } from "@/types/pooling.type";

interface TradeCardProps {
  trade: Trade;
}

export default function TradeDetailsCard({ trade }: TradeCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Trade ID: {trade.id}</h3>
          <p className="text-gray-500">
            Transaction ID: {trade.transactionId || "N/A"}
          </p>
        </div>
        <Badge className="bg-blue-500">
          Main Token: {trade.mainToken.code}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Trade Details</h4>
          <div className="flex justify-between">
            <span className="text-gray-500">Capital</span>
            <span className="font-medium">{trade.capital.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Gross Sales</span>
            <span className="font-medium">{trade.grossSales.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Quantity</span>
            <span className="font-medium">{trade.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Sold Amount</span>
            <span className="font-medium">{trade.soldAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Dates</h4>
          <div className="flex justify-between">
            <span className="text-gray-500">Created At</span>
            <span className="font-medium">
              {new Date(trade.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Processed At</span>
            <span className="font-medium">
              {trade.processedAt
                ? new Date(trade.processedAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
