import { getCommodityType } from "@/actions/pulling/commodity-type.action";
import CommodityTypeCard from "@/app/(main)/commodity-type/[slug]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  slug: string;
};

export default async function CommodityTypeDetailsData({ slug }: Props) {
  const { data: commodityType, error } = await getCommodityType(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!commodityType) {
    throw new Error("CommodityType not found");
  }

  return <CommodityTypeCard commodityType={commodityType} />;
}
