import { getHolderList } from "@/actions/pulling/holder.action";
import HolderTable from "@/app/(main)/holder/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function HolderListData({ searchParams }: Props) {
  const { data: holderList, error } = await getHolderList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (holderList.length === 0) {
    return <AlertInfo title="No holders found" />;
  }

  return <HolderTable holderList={holderList} />;
}
