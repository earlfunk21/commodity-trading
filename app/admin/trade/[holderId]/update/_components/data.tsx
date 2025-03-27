import { getHolder } from "@/actions/pooling/holder.action";
import HolderUpdateForm from "@/app/admin/holder/[holderId]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  holderId: string;
};

export default async function HolderUpdateData({ holderId }: Props) {
  const { data: holder, error } = await getHolder(holderId);

  if (error) {
    return <AlertError title={error} />;
  }

  return <HolderUpdateForm holder={holder} />;
}
