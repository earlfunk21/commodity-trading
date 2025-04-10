import HolderHeader from "@/components/holder-header";
import LoadingIcon from "@/components/loading-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currency } from "@/lib/utils";
import { ArrowDownCircle, ChevronsRight, Wallet } from "lucide-react";
import { Suspense } from "react";
import WithAccount from "./_components/with-account";
import WithAccountDepositList from "./_components/with-account-deposit-list";
import { DepositStatus } from "@/types/accounting.type";
import { format } from "date-fns";

export default function AccountingPage() {
  return (
    <main>
      <HolderHeader>
        <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
          <BreadcrumbList className="text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                className="text-zinc-400 hover:text-orange-500 transition-colors">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronsRight className="h-4 w-4 text-orange-500" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/holder/accounting`}
                className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Accounting
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </HolderHeader>
      <div className="flex flex-col gap-4 py-4 md:py-8 md:px-4">
        <Card className="w-full overflow-hidden border-zinc-800">
          <CardHeader className="bg-gradient-to-r from-zinc-900 to-zinc-800">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-orange-500" />
              <CardTitle>Account Overview</CardTitle>
            </div>
            <CardDescription className="text-zinc-400">
              View your current account balance and details
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Suspense fallback={<LoadingIcon />}>
              <WithAccount>
                {async ({ account }) => (
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="flex flex-col items-center md:items-start gap-2 flex-1">
                      <div className="text-sm font-semibold text-zinc-400">
                        Current Balance
                      </div>
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        {account ? currency(account.balance) : "0.00"}
                      </div>
                    </div>
                  </div>
                )}
              </WithAccount>
            </Suspense>
          </CardContent>
        </Card>

        {/* Deposits Card */}
        <Card className="w-full border-zinc-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-zinc-900 to-zinc-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ArrowDownCircle className="h-5 w-5 text-emerald-500" />
                <div className="space-y-1">
                  <CardTitle>Deposit History</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Track all deposits to your account
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Suspense fallback={<LoadingIcon />}>
              <WithAccountDepositList>
                {async ({ accountDepositList }) => (
                  <div className="rounded-lg border border-zinc-800 overflow-hidden">
                    {accountDepositList.length === 0 ? (
                      <div className="py-10 px-4 text-center">
                        <p className="text-zinc-400">No deposits found</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-800">
                        {accountDepositList.map((deposit) => (
                          <div
                            key={deposit.id}
                            className="p-4 hover:bg-zinc-900/50 transition-colors">
                            <div className="flex justify-between items-center">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-zinc-400">
                                    {format(deposit.createdAt, "PPp")}
                                  </span>
                                </div>
                                <p className="text-sm font-medium">
                                  {deposit.id.slice(0, 8)}...
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-emerald-500">
                                  +{currency(deposit.amount)}
                                </span>
                                <div
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    deposit.status === DepositStatus.Pending
                                      ? "bg-amber-500/20 text-amber-400"
                                      : deposit.status === DepositStatus.Approved
                                      ? "bg-emerald-500/20 text-emerald-400"
                                      : "bg-red-500/20 text-red-400"
                                  }`}>
                                  {deposit.status.toLowerCase()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </WithAccountDepositList>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
