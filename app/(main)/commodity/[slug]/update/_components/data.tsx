import { getCommodity } from "@/actions/pulling/commodity.action";
import CommodityUpdateForm from "@/app/(main)/commodity/[slug]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  slug: string;
};

export default async function CommodityUpdateData({ slug }: Props) {
  const { data: commodity, error } = await getCommodity(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  return <CommodityUpdateForm commodity={commodity} />;
}
