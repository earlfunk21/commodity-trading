import { getAccountTransactionList } from "@/actions/accounting/account-transaction.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { AccountTransaction } from "@/types/accounting.type";

type Props = {
  userId: string;
  children: (props: {
    accountTransactionList: AccountTransaction[];
  }) => Promise<JSX.Element>;
};

export default async function WithAccountTransactionList({
  children,
  userId,
}: Props) {
  const { data: accountTransactionList, error } =
    await getAccountTransactionList({ userId, size: 5 });

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ accountTransactionList: accountTransactionList });
}
