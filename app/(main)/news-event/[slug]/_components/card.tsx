import { TextEditorViewer } from "@/components/ui-extension/text-editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsEvent } from "@/types/pooling.type";
import { format } from "date-fns";
import Link from "next/link";

interface NewsEventCardProps {
  newsEvent: NewsEvent;
}

export default function NewsEventDetailsCard({ newsEvent }: NewsEventCardProps) {
  return (
    <Card
      key={newsEvent.id}
      className="border-none bg-gradient-to-br from-zinc-900 to-black shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-zinc-500">{newsEvent.slug}</span>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight">
          {newsEvent.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TextEditorViewer content={newsEvent.content} />
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full mt-4">
          <span className="text-xs text-zinc-500">
            Updated: {format(new Date(newsEvent.updatedAt), "MMM dd, yyyy")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
