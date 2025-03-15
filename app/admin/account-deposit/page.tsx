import AccountDepositCreateForm from "@/app/admin/account-deposit/_components/create-form";
import AccountDepositData from "@/app/admin/account-deposit/_components/data";
import AccountDepositPagination from "@/app/admin/account-deposit/_components/pagination";
import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense } from "react";

type Props = {
  searchParams: any;
};

export default function AccountDepositPage({ searchParams }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <CardTitle>Account Deposits</CardTitle>
            <CardDescription>list of account deposits</CardDescription>
            <SearchInput />
          </div>
          <div className="space-y-1.5">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Deposit User Account</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Deposit User Account Form</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to deposit user account
                  </DialogDescription>
                </DialogHeader>
                <AccountDepositCreateForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <AccountDepositData searchParams={searchParams} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense fallback={<LoadingIcon />}>
          <AccountDepositPagination searchParams={searchParams} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
