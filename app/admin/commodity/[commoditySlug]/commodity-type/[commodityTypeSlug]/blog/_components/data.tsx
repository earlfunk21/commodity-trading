import { getBlogList } from "@/actions/pooling/blog.action";
import { AlertError, AlertInfo } from "@/components/ui-extension/alerts";
import BlogTable from "./table";

type Props = {
  searchParams: any;
};

export default async function BlogListData({ searchParams }: Props) {
  const { data: blogList, error } = await getBlogList(searchParams);

  if (error) {
    return <AlertError title={error} />;
  }

  if (blogList.length === 0) {
    return <AlertInfo title="No blogs found" />;
  }

  return <BlogTable blogList={blogList} />;
}
