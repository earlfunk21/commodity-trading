import { getCommodityTypeList } from "@/actions/pooling/commodity-type.action";
import CommodityTypeTable from "@/app/admin/commodity-type/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function CommodityTypeListData({ searchParams }: Props) {
  const { data: commodityTypeList, error } = await getCommodityTypeList(
    searchParams
  );

  if (error) {
    return <AlertError title={error} />;
  }

  if (commodityTypeList.length === 0) {
    return <AlertInfo title="No commodity types found" />;
  }

  return <CommodityTypeTable commodityTypeList={commodityTypeList} />;
}
