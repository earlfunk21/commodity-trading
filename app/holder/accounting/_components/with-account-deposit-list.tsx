import { getAccountDepositListByUser } from "@/actions/accounting/account-deposit.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { AccountDeposit } from "@/types/accounting.type";

type Props = {
  children: (props: {
    accountDepositList: AccountDeposit[];
  }) => Promise<JSX.Element>;
};

export default async function WithAccountDepositList({ children }: Props) {
  const { data: accountDepositList, error } =
    await getAccountDepositListByUser();

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ accountDepositList: accountDepositList });
}
