import { getMainTokenList } from "@/actions/pooling/main-token.action";
import MainTokenCard from "./main-token-card";

type Props = {
  commodityTypeSlug: string;
};

export default async function MainTokenListData({ commodityTypeSlug }: Props) {
  const { data: mainTokenList } = await getMainTokenList({
    commodityTypeSlug,
  });

  return (
    <div className="flex flex-col gap-6">
      {mainTokenList.map((mainToken) => (
        <MainTokenCard
          key={mainToken.id}
          mainToken={mainToken}
          commodityTypeSlug={commodityTypeSlug}
        />
      ))}
    </div>
  );
}
