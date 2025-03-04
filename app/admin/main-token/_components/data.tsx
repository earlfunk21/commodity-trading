import { getMainTokenList } from "@/actions/pooling/main-token.action";
import MainTokenTable from "@/app/admin/main-token/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function MainTokenListData({ searchParams }: Props) {
  const { data: mainTokenList, error } = await getMainTokenList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (mainTokenList.length === 0) {
    return <AlertInfo title="No main tokens found" />;
  }

  return <MainTokenTable mainTokenList={mainTokenList} />;
}
