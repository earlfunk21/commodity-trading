import { getMainToken } from "@/actions/pooling/main-token.action";
import { AlertError } from "@/components/ui-extension/alerts";
import MainTokenValueCreateForm from "./create-form";

type Props = {
  code: string;
};

export default async function MainTokenValueCreateData({ code }: Props) {
  const { data: mainToken, error } = await getMainToken(code);

  if (error) {
    return <AlertError title={error} />;
  }

  return <MainTokenValueCreateForm mainToken={mainToken} />;
}
