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
import { WalletIcon, PlusCircleIcon } from "lucide-react";

type Props = {
  userId: string;
};

export default async function AccountCard({ userId }: Props) {
  const { data: account } = await getAccount(userId);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <WalletIcon className="h-5 w-5 text-primary" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Account Balance</span>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <PlusCircleIcon className="h-4 w-4" />
              Deposit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Deposit User Account</DialogTitle>
              <DialogDescription>
                Fill in the form below to deposit funds into the user account
              </DialogDescription>
            </DialogHeader>
            <AccountDepositCreateForm userId={userId} />
          </DialogContent>
        </Dialog>
      </div>
      
      {!!account ? (
        <div className="mt-2">
          <span className="text-2xl font-bold text-primary">{currency(account.balance)}</span>
          <span className="text-xs text-gray-500 ml-2">Available balance</span>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-200 dark:border-amber-800 flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-700">
            Not Available
          </Badge>
          <span className="text-sm text-amber-700 dark:text-amber-300">Initial deposit required</span>
        </div>
      )}
    </div>
  );
}
