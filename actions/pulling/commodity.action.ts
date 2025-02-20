"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Commodity } from "@/types/pulling.type";
import { revalidateTag } from "next/cache";

export async function createCommodity(values: any) {
  return apiRequest<Commodity>("/commodity/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("commodity");
    },
  });
}

export async function getCommodityList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Commodity[]>(`/commodity/list?${params}`, {
    next: {
      tags: ["commodity"],
    },
    cache: "no-store",
  });
}

export async function getCommodityCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/commodity/count?${params}`, {
    next: {
      tags: ["commodity"],
    },
    cache: "no-store",
  });
}

export async function getCommodity(slug: string) {
  return apiRequest<Commodity>(`/commodity/get/${slug}`, {
    next: {
      tags: [slug],
      revalidate: 300,
    },
  });
}

export async function getCurrentCommodity() {
  return apiRequest<Commodity>(`/commodity/current-commodity`, {
    cache: "no-store",
  });
}

export async function updateCommodity(id: string, values: any) {
  return apiRequest<Commodity>(`/commodity/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: ({ data, error }) => {
      revalidateTag("commodity");
      if (!error) {
        revalidateTag(data.slug);
      }
    },
  });
}

export async function removeCommodity(id: string) {
  return apiRequest<Commodity>(`/commodity/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("commodity");
    },
  });
}

export async function uploadCommodityImage(slug: string, formData: FormData) {
  return apiRequest<Commodity>(`/commodity/upload-image/${slug}`, {
    method: "PUT",
    body: formData,
    afterRequest: () => {
      revalidateTag("commodity");
      revalidateTag(slug);
    },
  });
}
