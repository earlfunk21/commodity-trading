import { getMainTokenTransactionList } from "@/actions/pooling/main-token-transaction.action";
import MainTokenTransactionTable from "@/app/admin/main-token/[code]/transaction/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
  code: string;
};

export default async function MainTokenTransactionListData({
  searchParams,
  code,
}: Props) {
  const { data: mainTokenTransactionList, error } =
    await getMainTokenTransactionList({
      mainTokenCode: code,
      ...searchParams,
    });

  if (error) {
    return <AlertError title={error} />;
  }

  if (mainTokenTransactionList.length === 0) {
    return <AlertInfo title="No mainToken transactions found" />;
  }

  return (
    <MainTokenTransactionTable
      mainTokenTransactionList={mainTokenTransactionList}
    />
  );
}
