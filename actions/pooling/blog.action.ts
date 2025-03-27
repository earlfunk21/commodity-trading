"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Blog } from "@/types/pooling.type";
import { revalidateTag } from "next/cache";

export async function createBlog(values: any) {
  return apiRequest<Blog>("/blog/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("blog");
    },
  });
}

export async function getBlogList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Blog[]>(`/blog/list?${params}`, {
    next: {
      tags: ["blog"],
    },
    cache: "no-store",
  });
}

export async function getBlogListByPublic() {
  const params = createURLParams({ infinite: true });
  return apiRequest<Blog[]>(`/blog/list-by-public?${params}`, {
    next: {
      tags: ["blog"],
    },
    cache: "no-store",
  });
}

export async function getBlog(slug: string) {
  return apiRequest<Blog>(`/blog/get/${slug}`, {
    next: {
      tags: [slug],
      revalidate: 300,
    },
  });
}

export async function getCurrentBlog() {
  return apiRequest<Blog>(`/blog/current-blog`, {
    cache: "no-store",
  });
}

export async function updateBlog(id: string, values: any) {
  return apiRequest<Blog>(`/blog/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: ({ data, error }) => {
      revalidateTag("blog");
      if (!error) {
        revalidateTag(data.slug);
      }
    },
  });
}

export async function removeBlog(id: string) {
  return apiRequest<Blog>(`/blog/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("blog");
    },
  });
}

export async function uploadBlogImage(slug: string, formData: FormData) {
  return apiRequest<Blog>(`/blog/upload-image/${slug}`, {
    method: "PUT",
    body: formData,
    afterRequest: () => {
      revalidateTag("blog");
      revalidateTag(slug);
    },
  });
}
