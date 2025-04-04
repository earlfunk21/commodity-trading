import LoadingIcon from "@/components/loading-icon";
import { Suspense } from "react";
import NewsEventDetailsCard from "./_components/card";
import WithNewsEvent from "./_components/data";

type Props = {
  params: {
    slug: string;
  };
};

export default function NewsEventDetailsPage({ params }: Props) {
  return (
    <main className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-4 pb-16">
      <div className="container mx-auto max-w-7xl">
        <Suspense fallback={<LoadingIcon />}>
          <WithNewsEvent slug={params.slug}>
            {async ({ newsEvent }) => (
              <NewsEventDetailsCard newsEvent={newsEvent} />
            )}
          </WithNewsEvent>
        </Suspense>
      </div>
    </main>
  );
}
