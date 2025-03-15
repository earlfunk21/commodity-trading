import { getPurchaseTokenList } from "@/actions/pooling/purchase-token.action";
import PurchaseTokenTable from "@/app/holder/purchase-token/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function PurchaseTokenListData({ searchParams }: Props) {
  const { data: purchaseTokenList, error } = await getPurchaseTokenList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (purchaseTokenList.length === 0) {
    return <AlertInfo title="No purchase tokens found" />;
  }

  return <PurchaseTokenTable purchaseTokenList={purchaseTokenList} />;
}
