import { getBlog } from "@/actions/pooling/blog.action";
import { AlertError } from "@/components/ui-extension/alerts";
import { Blog } from "@/types/pooling.type";

type Props = {
  blogSlug: string;
  children: (props: { blog: Blog }) => Promise<JSX.Element>;
};

export default async function WithBlog({ blogSlug, children }: Props) {
  const { data: blog, error } = await getBlog(blogSlug);

  if (error) {
    return <AlertError title={error} />;
  }

  return children({ blog });
}
