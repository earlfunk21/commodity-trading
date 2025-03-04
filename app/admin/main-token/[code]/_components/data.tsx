import { getMainToken } from "@/actions/pooling/main-token.action";
import MainTokenCard from "@/app/admin/main-token/[code]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  code: string;
};

export default async function MainTokenDetailsData({ code }: Props) {
  const { data: mainToken, error } = await getMainToken(code);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!mainToken) {
    throw new Error("MainToken not found");
  }

  return <MainTokenCard mainToken={mainToken} />;
}
