import { getCommodityTypeList } from "@/actions/pooling/commodity-type.action";
import CommodityTypeCard from "@/app/(main)/commodities/_components/commodity-type-card";
import { Commodity } from "@/types/pooling.type";

type Props = {
  commodity: Commodity;
};

export default async function CommodityTypesData({ commodity }: Props) {
  const { data: commodityTypes } = await getCommodityTypeList({
    size: 3,
    commodityId: commodity.id,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {commodityTypes.map((commodityType) => (
        <CommodityTypeCard
          key={commodityType.id}
          commodityType={commodityType}
        />
      ))}
    </div>
  );
}
