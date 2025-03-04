import { getComplanList } from "@/actions/complan-system/complan.action";
import ComplanTable from "@/app/admin/complan/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function ComplanListData({ searchParams }: Props) {
  const { data: complanList, error } = await getComplanList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (complanList.length === 0) {
    return <AlertInfo title="No complans found" />;
  }

  return <ComplanTable complanList={complanList} />;
}
