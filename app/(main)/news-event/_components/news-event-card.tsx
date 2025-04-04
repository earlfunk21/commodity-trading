import { NewsEvent } from "@/types/pooling.type";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  newsEvent: NewsEvent;
};

export default function NewsEventCard({ newsEvent }: Props) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm overflow-hidden border border-zinc-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 h-2"></div>
      <div className="px-6 py-5 flex-1">
        <div className="inline-block px-3 py-1 text-sm font-semibold text-orange-300 bg-orange-950/60 rounded-full mb-4">
          {newsEvent.slug}
        </div>
        <h2 className="text-xl font-bold text-white mb-3">{newsEvent.title}</h2>
        <div className="flex items-center text-gray-400 text-sm mt-4">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>{format(newsEvent.updatedAt, "PPp")}</span>
        </div>
      </div>
      <div className="px-6 py-3 bg-zinc-950/50 border-t border-zinc-800 flex justify-end">
        <Link
          href={`news-event/${newsEvent.slug}`}
          className="text-orange-400 hover:text-orange-300 font-medium text-sm flex items-center group">
          Read more
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
