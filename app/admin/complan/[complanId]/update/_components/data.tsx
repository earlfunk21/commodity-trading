import { getComplan } from "@/actions/accounting/complan.action";
import ComplanUpdateForm from "@/app/admin/complan/[complanId]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  id: string;
};

export default async function ComplanUpdateData({ id }: Props) {
  const { data: complan, error } = await getComplan(id);

  if (error) {
    return <AlertError title={error} />;
  }

  console.log(complan);

  return <ComplanUpdateForm complan={complan} />;
}
