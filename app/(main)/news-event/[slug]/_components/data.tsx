import { getNewsEvent } from "@/actions/pooling/news-event.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { NewsEvent } from "@/types/pooling.type";
import React from "react";

type Props = {
  slug: string;
  children: (props: { newsEvent: NewsEvent }) => Promise<JSX.Element>;
};

export default async function WithNewsEvent({
  slug,
  children,
}: Props) {
  const { data: newsEvent, error } = await getNewsEvent(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  console.log("newsEvent", newsEvent);

  return children({ newsEvent: newsEvent });
}
