import { getMainToken } from "@/actions/pooling/main-token.action";
import MainTokenCard from "@/app/(main)/commodities/[commoditySlug]/[commodityTypeSlug]/[mainTokenCode]/_components/main-token-card";

type Props = {
  commoditySlug: string;
  commodityTypeSlug: string;
  mainTokenCode: string;
};

export default async function MainTokenData({
  commoditySlug,
  commodityTypeSlug,
  mainTokenCode,
}: Props) {
  const { data: mainToken } = await getMainToken(mainTokenCode);

  return (
    <div className="flex flex-col gap-6">
      <MainTokenCard
        commoditySlug={commoditySlug}
        mainToken={mainToken}
        commodityTypeSlug={commodityTypeSlug}
      />
    </div>
  );
}
