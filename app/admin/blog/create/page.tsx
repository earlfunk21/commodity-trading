import BlogCreateForm from "@/app/admin/blog/create/_components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlogCreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new blog</CardTitle>
        <CardDescription>
          Create a new blog for the blog.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BlogCreateForm />
      </CardContent>
    </Card>
  );
}
