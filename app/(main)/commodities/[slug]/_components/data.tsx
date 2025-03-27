import { getBlog } from "@/actions/pooling/blog.action";
import { AlertError } from "@/components/ui-extension/alerts";
import BlogDetailsCard from "./card";

type Props = {
  slug: string;
};

export default async function BlogDetailsData({ slug }: Props) {
  const { data: blog, error } = await getBlog(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!blog) {
    return <AlertError title="Blog not found" />;
  }

  return <BlogDetailsCard blog={blog} />;
}
