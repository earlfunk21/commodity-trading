import { getSubTokenCount } from "@/actions/pooling/sub-token.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";

type Props = {
  searchParams: any;
};

export default async function SubTokenPagination({ searchParams }: Props) {
  const result = await getSubTokenCount(searchParams);

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination total={result.data} page={Number(searchParams.page || 1)} />
  );
}
