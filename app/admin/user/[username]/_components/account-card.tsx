import { getAccount } from "@/actions/accounting/account.action";
import AccountDepositCreateForm from "@/app/admin/user/[username]/_components/account-deposit-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { currency } from "@/lib/utils";
import { PlusCircleIcon, WalletIcon } from "lucide-react";

type Props = {
  userId: string;
};

export default async function AccountCard({ userId }: Props) {
  const { data: account } = await getAccount(userId);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full dark:bg-primary/20">
            <WalletIcon className="h-5 w-5 text-primary dark:text-primary-foreground" />
          </div>
          <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
            Account Balance
          </span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/30 text-primary dark:text-primary-foreground hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-300">
              <PlusCircleIcon className="h-4 w-4" />
              Deposit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl dark:text-gray-100">
                Deposit User Account
              </DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                Fill in the form below to deposit funds into the user account
              </DialogDescription>
            </DialogHeader>
            <AccountDepositCreateForm userId={userId} />
          </DialogContent>
        </Dialog>
      </div>

      {!!account ? (
        <div className="mt-4 bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 p-4 rounded-lg">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {currency(account.balance)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">
            Available balance
          </span>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-amber-50/80 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-900/5 p-4 rounded-lg border border-amber-200/50 dark:border-amber-800/30 flex items-center gap-3">
          <Badge
            variant="outline"
            className="bg-amber-100/80 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-700/50 font-medium">
            Not Available
          </Badge>
          <span className="text-sm text-amber-700 dark:text-amber-400">
            Initial deposit required
          </span>
        </div>
      )}
    </div>
  );
}
