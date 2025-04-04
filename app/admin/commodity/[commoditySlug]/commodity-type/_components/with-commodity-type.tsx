import { getCommodityType } from "@/actions/pooling/commodity-type.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { CommodityType } from "@/types/pooling.type";

type Props = {
  commodityTypeSlug: string;
  children: (props: { commodityType: CommodityType }) => Promise<JSX.Element>;
};

export default async function WithCommodityType({
  commodityTypeSlug,
  children,
}: Props) {
  const { data: commodityType, error } = await getCommodityType(
    commodityTypeSlug
  );

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ commodityType });
}
