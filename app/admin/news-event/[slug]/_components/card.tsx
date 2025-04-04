import { TextEditorViewer } from "@/components/ui-extension/text-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsEvent } from "@/types/pooling.type";

interface NewsEventCardProps {
  newsEvent: NewsEvent;
}

export default function NewsEventCard({ newsEvent }: NewsEventCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{newsEvent.title}</CardTitle>
        <CardDescription>{newsEvent.slug}</CardDescription>
      </CardHeader>
      <CardContent>
        <TextEditorViewer content={newsEvent.content} />
      </CardContent>
    </Card>
  );
}
