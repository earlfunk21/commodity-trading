import LoadingIcon from "@/components/loading-icon";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import WithBlog from "../../_components/with-commodity-type";
import BlogUpdateForm from "./_components/form";
import RemoveBlogImage from "./_components/remove-image";
import BlogImagesForm from "./_components/upload-images-form";

type Props = {
  params: {
    blogSlug: string;
  };
};

export default function BlogUpdatePage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Update Form</CardTitle>
        <CardDescription>Update the blog details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIcon />}>
          <WithBlog blogSlug={params.blogSlug}>
            {async ({ blog }) => (
              <div className="grid grid-cols-2 gap-4">
                <BlogUpdateForm blog={blog} />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Blog Images</h3>
                  {blog.images && blog.images.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {blog.images.map((image) => (
                        <RemoveBlogImage
                          blogId={blog.id}
                          image={image}
                          key={image}>
                          <div className="w-[100px]">
                            <AspectRatio>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_FILE_URL}/blog/${image}`}
                                alt={image || "Blog image"}
                                className="object-cover"
                                fill
                              />
                            </AspectRatio>
                          </div>
                        </RemoveBlogImage>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic py-6 text-center border rounded-md">
                      No images available for this blog
                    </p>
                  )}
                  <BlogImagesForm blogId={blog.id} />
                </div>
              </div>
            )}
          </WithBlog>
        </Suspense>
      </CardContent>
    </Card>
  );
}
