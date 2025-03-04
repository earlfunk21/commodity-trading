import { getComplan } from "@/actions/complan-system/complan.action";
import ComplanCard from "@/app/admin/complan/[complanId]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  id: string;
};

export default async function ComplanDetailsData({ id }: Props) {
  const { data: complan, error } = await getComplan(id);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!complan) {
    throw new Error("Complan not found");
  }

  return <ComplanCard complan={complan} />;
}
