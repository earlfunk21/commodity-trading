import { getBlog } from "@/actions/pooling/blog.action";
import BlogCard from "@/app/admin/blog/[slug]/_components/card";
import { AlertError } from "@/components/ui-extension/alerts";

type Props = {
  slug: string;
};

export default async function BlogDetailsData({ slug }: Props) {
  const { data: blog, error } = await getBlog(slug);

  if (error) {
    return <AlertError title={error} />;
  }

  if (!blog) {
    throw new Error("Blog not found");
  }

  return <BlogCard blog={blog} />;
}
