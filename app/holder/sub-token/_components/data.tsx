import { getSubTokenList } from "@/actions/pooling/sub-token.action";
import SubTokenTable from "@/app/holder/sub-token/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function SubTokenListData({ searchParams }: Props) {
  const { data: subTokenList, error } = await getSubTokenList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (subTokenList.length === 0) {
    return <AlertInfo title="No sub tokens found" />;
  }

  return <SubTokenTable subTokenList={subTokenList} />;
}
