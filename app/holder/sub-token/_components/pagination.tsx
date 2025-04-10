import { getSubTokenCountByHolder } from "@/actions/pooling/sub-token.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";

type Props = {
  searchParams: any;
};

export default async function SubTokenPagination({ searchParams }: Props) {
  const result = await getSubTokenCountByHolder(searchParams);

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination
      total={result.data}
      page={Number(searchParams.page || 1)}
      hideInfinite
      hideSizes
    />
  );
}
