import { getMainTokenValueList } from "@/actions/pooling/main-token-value.action";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";
import MainTokenValueTable from "./table";

type Props = {
  searchParams: any;
};

export default async function MainTokenValueListData({ searchParams }: Props) {
  const { data: mainTokenList, error } = await getMainTokenValueList(
    searchParams
  );

  if (error) {
    return <AlertError title={error} />;
  }

  if (mainTokenList.length === 0) {
    return <AlertInfo title="No main token values found" />;
  }

  return <MainTokenValueTable mainTokenValueList={mainTokenList} />;
}
