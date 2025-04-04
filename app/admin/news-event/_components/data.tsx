import { getNewsEventList } from "@/actions/pooling/news-event.action";
import NewsEventTable from "@/app/admin/news-event/_components/table";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";

type Props = {
  searchParams: any;
};

export default async function NewsEventListData({ searchParams }: Props) {
  const { data: newsEventList, error } = await getNewsEventList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (newsEventList.length === 0) {
    return <AlertInfo title="No news events found" />;
  }

  return <NewsEventTable newsEventList={newsEventList} />;
}
