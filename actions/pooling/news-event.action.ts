"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { NewsEvent } from "@/types/pooling.type";
import { revalidateTag } from "next/cache";

export async function createNewsEvent(values: any) {
  return apiRequest<NewsEvent>("/news-event/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("news-event");
    },
  });
}

export async function getNewsEventList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<NewsEvent[]>(`/news-event/list?${params}`, {
    next: {
      tags: ["news-event"],
    },
    cache: "no-store",
  });
}

export async function getNewsEventCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/news-event/count?${params}`, {
    next: {
      tags: ["news-event"],
    },
    cache: "no-store",
  });
}

export async function getNewsEvent(slug: string) {
  return apiRequest<NewsEvent>(`/news-event/get/${slug}`, {
    next: {
      tags: [slug],
    },
    cache: "no-store",
  });
}

export async function updateNewsEvent(id: string, values: any) {
  return apiRequest<NewsEvent>(`/news-event/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: ({ data, error }) => {
      revalidateTag("news-event");
      if (!error) {
        revalidateTag(data.slug);
      }
    },
  });
}

export async function removeNewsEvent(slug: string) {
  return apiRequest<NewsEvent>(`/news-event/remove/${slug}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("news-event");
    },
  });
}
