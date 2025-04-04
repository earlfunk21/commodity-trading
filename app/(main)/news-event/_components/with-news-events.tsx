import { getNewsEventList } from "@/actions/pooling/news-event.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { NewsEvent } from "@/types/pooling.type";

type Props = {
  searchParams: any;
  children: (props: { newsEvents: NewsEvent[] }) => Promise<JSX.Element[]>;
};

export default async function WithNewsEvents({ searchParams, children }: Props) {
  const { data: newsEvents, error } = await getNewsEventList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ newsEvents: newsEvents });
}
