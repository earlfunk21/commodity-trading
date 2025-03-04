import { getMainToken } from "@/actions/pooling/main-token.action";
import MainTokenUpdateForm from "@/app/admin/main-token/[code]/update/_components/form";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  code: string;
};

export default async function MainTokenUpdateData({ code }: Props) {
  const { data: mainToken, error } = await getMainToken(code);

  if (error) {
    return <AlertError title={error} />;
  }

  return <MainTokenUpdateForm mainToken={mainToken} />;
}
