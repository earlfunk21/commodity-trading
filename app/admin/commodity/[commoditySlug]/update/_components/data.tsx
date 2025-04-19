import { getCommodity } from "@/actions/pooling/commodity.action";
import { AlertError } from "@/components/ui-extension/alerts";
import CommodityUpdateForm from "./form";

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
