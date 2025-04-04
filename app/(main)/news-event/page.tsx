import LoadingIcon from "@/components/loading-icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { NewsEvent } from "@/types/pooling.type";
import { Suspense } from "react";
import NewsEventCard from "./_components/news-event-card";
import WithNewsEvents from "./_components/with-news-events";

type Props = {
  searchParams: any;
};

export default function NewsEventsPage({ searchParams }: Props) {
  return (
    <main className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-4 pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex pb-8">
          <Breadcrumb className="py-2 px-4 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem className="font-medium bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                News Events
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Latest Market News
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Stay updated with the latest events in the commodity market
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<LoadingIcon />}>
            <WithNewsEvents searchParams={searchParams}>
              {async ({ newsEvents }) =>
                newsEvents.map((item: NewsEvent) => (
                  <NewsEventCard key={item.id} newsEvent={item} />
                ))
              }
            </WithNewsEvents>
          </Suspense>
        </div>
      </div>
    </main>
  );
}
