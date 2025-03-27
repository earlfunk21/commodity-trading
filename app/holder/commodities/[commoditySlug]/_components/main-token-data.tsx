import { getMainTokenList } from "@/actions/pooling/main-token.action";
import { CommodityType } from "@/types/pooling.type";
import CommodityTypeEmptyCard from "../../_components/commodity-type-empty-card";
import MainTokenCard from "./main-token-card";

type Props = {
  commodityType: CommodityType;
};

export default async function MainTokenListData({ commodityType }: Props) {
  const { data: mainTokenList } = await getMainTokenList({
    size: 3,
    commodityTypeId: commodityType.id,
  });

  return (
    <>
      {mainTokenList.map((mainToken) => (
        <MainTokenCard key={mainToken.id} mainToken={mainToken} />
      ))}
      {[...Array(4 - mainTokenList.length)].map((_, index) => (
        <CommodityTypeEmptyCard key={index} />
      ))}
    </>
  );
}
