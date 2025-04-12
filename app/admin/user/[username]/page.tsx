import LoadingIcon from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import AccountTransactionCardList from "./_components/account-transaction-card";
import UserDetailsCard from "./_components/card";
import WithAccountTransactionList from "./_components/with-account-transaction-list";
import WithUser from "./_components/with-user";

type Props = {
  params: {
    username: string;
  };
};

export default function UserDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <WithUser username={params.username}>
        {async ({ user }) => (
          <div className="flex flex-wrap gap-4">
            <div className="space-y-8 w-full max-w-md">
              <UserDetailsCard user={user} />
              <Button asChild className="w-full">
                <Link href={`${params.username}/update`}>Update</Link>
              </Button>
            </div>

            <Suspense fallback={<LoadingIcon />}>
              <WithAccountTransactionList userId={user.id}>
                {async ({ accountTransactionList }) => (
                  <AccountTransactionCardList
                    accountTransactionList={accountTransactionList}
                  />
                )}
              </WithAccountTransactionList>
            </Suspense>
          </div>
        )}
      </WithUser>
    </Suspense>
  );
}
