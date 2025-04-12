import { getAccountTransactionListByUser } from "@/actions/accounting/account-transaction.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { AccountTransaction } from "@/types/accounting.type";

type Props = {
  children: (props: {
    accountTransactionList: AccountTransaction[];
  }) => Promise<JSX.Element>;
};

export default async function WithAccountTransactionList({ children }: Props) {
  const { data: accountTransactionList, error } =
    await getAccountTransactionListByUser();

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ accountTransactionList: accountTransactionList });
}
