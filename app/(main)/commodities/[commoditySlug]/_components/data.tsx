import { getCommodityTypeList } from "@/actions/pooling/commodity-type.action";
import CommodityTypeCard from "@/app/(main)/commodities/[commoditySlug]/_components/commodity-type-card";

type Props = {
  commoditySlug: string;
};

export default async function CommodityTypeListData({ commoditySlug }: Props) {
  const { data: commodityTypeList } = await getCommodityTypeList({
    commoditySlug,
  });

  return (
    <div className="flex flex-col gap-6">
      {commodityTypeList.map((commodityType) => (
        <CommodityTypeCard
          key={commodityType.id}
          commoditySlug={commoditySlug}
          commodityType={commodityType}
        />
      ))}
    </div>
  );
}
