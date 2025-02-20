import { getHolder } from "@/actions/pulling/holder.action";
import HolderCard from "@/app/(main)/holder/[holderId]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  holderId: string;
};

export default async function HolderDetailsData({ holderId }: Props) {
  const { data: holder, error } = await getHolder(holderId);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!holder) {
    throw new Error("Holder not found");
  }

  return <HolderCard holder={holder} />;
}
