import { getComplanFeeBracketList } from "@/actions/accounting/complan-fee-bracket.action";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";
import ComplanFeeBracketTable from "./table";

type Props = {
  searchParams: any;
};

export default async function ComplanFeeBracketListData({
  searchParams,
}: Props) {
  const { data: complanFeeBracketList, error } = await getComplanFeeBracketList(
    searchParams
  );

  if (error) {
    return <AlertError title={error} />;
  }

  if (complanFeeBracketList.length === 0) {
    return <AlertInfo title="No complan fee brackets found" />;
  }

  return <ComplanFeeBracketTable complanFeeBracketList={complanFeeBracketList} />;
}
