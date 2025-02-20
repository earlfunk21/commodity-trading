import { getCommodityList } from "@/actions/pulling/commodity.action";
import CommodityTable from "@/app/(main)/commodity/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function CommodityListData({ searchParams }: Props) {
  const { data: commodityList, error } = await getCommodityList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (commodityList.length === 0) {
    return <AlertInfo title="No commoditys found" />;
  }

  return <CommodityTable commodityList={commodityList} />;
}
