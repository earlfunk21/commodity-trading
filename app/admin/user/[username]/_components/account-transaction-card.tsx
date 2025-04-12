import { currency } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AccountTransaction } from "@/types/accounting.type";
import { formatDistanceToNow } from "date-fns";

type Props = {
  accountTransactionList: AccountTransaction[];
};

export default function AccountTransactionCardList({
  accountTransactionList,
}: Props) {
  if (!accountTransactionList || accountTransactionList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-muted-foreground">
          No transaction history available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accountTransactionList.map((transaction) => {
        const getBadgeVariant = (type: string) => {
          switch (type) {
            case "Income":
              return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "Purchase":
              return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
            case "Deposit":
              return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
            case "Withdraw":
              return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
            case "Transfer":
              return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
            case "Referral":
              return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
            default:
              return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
          }
        };

        // Get border color based on amount and theme
        const getBorderColor = (amount: number, type: string) => {
          // Purchase transactions always shown as negative/expense
          if (type === "Purchase") {
            return "border-red-500 dark:border-red-600";
          }
          return amount >= 0
            ? "border-green-500 dark:border-green-600"
            : "border-red-500 dark:border-red-600";
        };

        return (
          <Card
            key={transaction.id}
            className={`overflow-hidden border-l-4 hover:shadow-md transition-shadow ${getBorderColor(
              transaction.amount,
              transaction.type
            )}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge
                      className={`${getBadgeVariant(
                        transaction.type
                      )} font-medium`}>
                      {transaction.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(transaction.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {transaction.id}
                  </p>
                </div>
                <p
                  className={`text-lg font-semibold ${
                    transaction.type === "Purchase"
                      ? "text-red-600 dark:text-red-400"
                      : transaction.amount >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                  {transaction.amount >= 0 && transaction.type !== "Purchase"
                    ? "+"
                    : "-"}
                  {currency(transaction.amount)}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
