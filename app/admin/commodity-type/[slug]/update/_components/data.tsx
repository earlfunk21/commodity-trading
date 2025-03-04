import { getCommodityType } from "@/actions/pooling/commodity-type.action";
import CommodityTypeUpdateForm from "@/app/admin/commodity-type/[slug]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  slug: string;
};

export default async function CommodityTypeUpdateData({ slug }: Props) {
  const { data: commodityType, error } = await getCommodityType(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  return <CommodityTypeUpdateForm commodityType={commodityType} />;
}
