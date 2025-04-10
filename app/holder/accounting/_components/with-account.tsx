import { getAccountByUser } from "@/actions/accounting/account.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { Account } from "@/types/accounting.type";

type Props = {
  children: (props: { account: Account | null }) => Promise<JSX.Element>;
};

export default async function WithAccount({ children }: Props) {
  const { data: account, error } = await getAccountByUser();

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ account: account });
}
