import { TextEditorViewer } from "@/components/ui-extension/text-editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/types/pooling.type";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogDetailsCard({ blog }: BlogCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>{blog.slug}</CardDescription>
      </CardHeader>
      <CardContent>
        <TextEditorViewer content={blog.content} />
      </CardContent>
    </Card>
  );
}
