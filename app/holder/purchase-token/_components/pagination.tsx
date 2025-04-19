import { getPurchaseTokenCountByHolder } from "@/actions/pooling/purchase-token.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";

type Props = {
  searchParams: any;
};

export default async function PurchaseTokenPagination({ searchParams }: Props) {
  const result = await getPurchaseTokenCountByHolder(searchParams);

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination total={result.data} page={Number(searchParams.page || 1)} />
  );
}
