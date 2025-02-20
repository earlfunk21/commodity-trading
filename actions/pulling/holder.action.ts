"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Holder } from "@/types/pulling.type";
import { revalidateTag } from "next/cache";

export async function createHolder(values: any) {
  return apiRequest<Holder>("/holder/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("holder");
    },
  });
}

export async function getHolderList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Holder[]>(`/holder/list?${params}`, {
    next: {
      tags: ["holder"],
    },
    cache: "no-store",
  });
}

export async function getHolderCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/holder/count?${params}`, {
    next: {
      tags: ["holder"],
    },
    cache: "no-store",
  });
}

export async function getHolder(id: string) {
  return apiRequest<Holder>(`/holder/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function getCurrentHolder() {
  return apiRequest<Holder>(`/holder/current-holder`, {
    cache: "no-store",
  });
}

export async function updateHolder(id: string, values: any) {
  return apiRequest<Holder>(`/holder/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("holder");
      revalidateTag(id);
    },
  });
}

export async function removeHolder(id: string) {
  return apiRequest<Holder>(`/holder/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("holder");
    },
  });
}
