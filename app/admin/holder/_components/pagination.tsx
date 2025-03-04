import { getUserCount } from "@/actions/core/user.action";
import { AlertError } from "@/components/ui-extension/alerts";
import Pagination from "@/components/ui-extension/pagination";

type Props = {
  searchParams: any;
};

export default async function UserPagination({ searchParams }: Props) {
  const result = await getUserCount(searchParams);

  if (result.error) {
    return <AlertError title={result.error} />;
  }

  return (
    <Pagination total={result.data} page={Number(searchParams.page || 1)} />
  );
}
