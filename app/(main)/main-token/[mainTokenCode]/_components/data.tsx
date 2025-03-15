import { getMainToken } from "@/actions/pooling/main-token.action";
import MainTokenCard from "@/app/(main)/main-token/[mainTokenCode]/_components/main-token-card";

type Props = {
  mainTokenCode: string;
};

export default async function MainTokenData({ mainTokenCode }: Props) {
  const { data: mainToken } = await getMainToken(mainTokenCode);

  return (
    <div className="flex flex-col gap-6">
      <MainTokenCard mainToken={mainToken} />
    </div>
  );
}
