import { getAccountTransactionCount } from "@/actions/accounting/account-transaction.action";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  userId: string;
  children: (props: {
    accountTransactionCount: number;
  }) => Promise<JSX.Element>;
};

export default async function WithAccountTransactionCount({
  children,
  userId,
}: Props) {
  const { data: accountTransactionCount, error } =
    await getAccountTransactionCount({ userId, size: 5 });

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ accountTransactionCount: accountTransactionCount });
}
