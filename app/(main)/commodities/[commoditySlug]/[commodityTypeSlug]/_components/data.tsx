import { getMainTokenList } from "@/actions/pooling/main-token.action";
import MainTokenCard from "@/app/(main)/commodities/[commoditySlug]/[commodityTypeSlug]/_components/main-token-card";

type Props = {
  commoditySlug: string;
  commodityTypeSlug: string;
};

export default async function MainTokenListData({
  commoditySlug,
  commodityTypeSlug,
}: Props) {
  const { data: mainTokenList } = await getMainTokenList({
    commodityTypeSlug,
  });

  return (
    <div className="flex flex-col gap-6">
      {mainTokenList.map((mainToken) => (
        <MainTokenCard
          key={mainToken.id}
          commoditySlug={commoditySlug}
          mainToken={mainToken}
          commodityTypeSlug={commodityTypeSlug}
        />
      ))}
    </div>
  );
}
