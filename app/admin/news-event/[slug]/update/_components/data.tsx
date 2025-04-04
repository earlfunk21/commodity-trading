import { getNewsEvent } from "@/actions/pooling/news-event.action";
import { AlertError } from "@/components/ui-extension/alerts";
import NewsEventUpdateForm from "./form";

type Props = {
  slug: string;
};

export default async function NewsEventUpdateData({ slug }: Props) {
  const { data: newsEvent, error } = await getNewsEvent(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  return <NewsEventUpdateForm newsEvent={newsEvent} />;
}
