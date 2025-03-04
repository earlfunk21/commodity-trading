import { getCommodity } from "@/actions/pooling/commodity.action";
import CommodityCard from "@/app/admin/commodity/[slug]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  slug: string;
};

export default async function CommodityDetailsData({ slug }: Props) {
  const { data: commodity, error } = await getCommodity(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!commodity) {
    throw new Error("Commodity not found");
  }

  return <CommodityCard commodity={commodity} />;
}
