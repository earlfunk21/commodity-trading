import LoadingIcon from "@/components/loading-icon";
import SearchInput from "@/components/search-input";
import Pagination from "@/components/ui-extension/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import AccountTransactionCardList from "../_components/account-transaction-card-list";
import WithAccountTransactionList from "../_components/with-account-transaction-list";
import WithUser from "../_components/with-user";
import WithAccountTransactionCount from "./_components/with-account-transaction-count";

type Props = {
  searchParams: any;
  params: {
    username: string;
  };
};

export default function AccountTransactionPage({
  searchParams,
  params,
}: Props) {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <WithUser username={params.username}>
        {async ({ user }) => (
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div className="space-y-1.5">
                  <CardTitle>Account Transactions</CardTitle>
                  <CardDescription>
                    list of account transactions
                  </CardDescription>
                  <SearchInput />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingIcon />}>
                <WithAccountTransactionList userId={user.id}>
                  {async ({ accountTransactionList }) => (
                    <AccountTransactionCardList
                      accountTransactionList={accountTransactionList}
                    />
                  )}
                </WithAccountTransactionList>
              </Suspense>
            </CardContent>
            <CardFooter>
              <Suspense fallback={<LoadingIcon />}>
                <WithAccountTransactionCount userId={user.id}>
                  {async ({ accountTransactionCount }) => (
                    <Pagination
                      total={accountTransactionCount}
                      page={Number(searchParams.page || 1)}
                    />
                  )}
                </WithAccountTransactionCount>
              </Suspense>
            </CardFooter>
          </Card>
        )}
      </WithUser>
    </Suspense>
  );
}
