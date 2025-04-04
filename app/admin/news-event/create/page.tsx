import NewsEventCreateForm from "@/app/admin/news-event/create/_components/create-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewsEventCreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create News & Event</CardTitle>
        <CardDescription>
          Create a new news event for the pooling.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NewsEventCreateForm />
      </CardContent>
    </Card>
  );
}
