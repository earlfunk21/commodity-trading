import { getCommodityTypeList } from "@/actions/pooling/commodity-type.action";
import { Commodity } from "@/types/pooling.type";
import CommodityTypeCard from "./commodity-type-card";
import CommodityTypeEmptyCard from "./commodity-type-empty-card";

type Props = {
  commodity: Commodity;
};

export default async function CommodityTypesData({ commodity }: Props) {
  const { data: commodityTypes } = await getCommodityTypeList({
    size: 3,
    commodityId: commodity.id,
  });

  return (
    <>
      {commodityTypes.map((commodityType) => (
        <CommodityTypeCard
          key={commodityType.id}
          commodityType={commodityType}
        />
      ))}
      {[...Array(4 - commodityTypes.length)].map((_, index) => (
        <CommodityTypeEmptyCard key={index} />
      ))}
    </>
  );
}
