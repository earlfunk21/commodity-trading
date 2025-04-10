import { getBlog } from "@/actions/pooling/blog.action";
import { AlertError } from "@/components/ui-extension/alerts";
import BlogUpdateForm from "./form";

type Props = {
  slug: string;
};

export default async function BlogUpdateData({ slug }: Props) {
  const { data: blog, error } = await getBlog(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  return <BlogUpdateForm blog={blog} />;
}
