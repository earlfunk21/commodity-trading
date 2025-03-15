import { getAccountDepositList } from "@/actions/accounting/account-deposit.action";
import AccountDepositTable from "@/app/admin/account-deposit/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function AccountDepositListData({ searchParams }: Props) {
  const { data: accountDepositList, error } = await getAccountDepositList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (accountDepositList.length === 0) {
    return <AlertInfo title="No account deposits found" />;
  }

  return <AccountDepositTable accountDepositList={accountDepositList} />;
}
