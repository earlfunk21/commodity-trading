import { getNewsEvent } from "@/actions/pooling/news-event.action";
import NewsEventCard from "@/app/admin/news-event/[slug]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  slug: string;
};

export default async function NewsEventDetailsData({ slug }: Props) {
  const { data: newsEvent, error } = await getNewsEvent(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!newsEvent) {
    throw new Error("NewsEvent not found");
  }

  return <NewsEventCard newsEvent={newsEvent} />;
}
