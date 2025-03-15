"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Complan } from "@/types/accounting.type";
import { revalidateTag } from "next/cache";

export async function createComplan(values: any) {
  return apiRequest<Complan>("/complan/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("complan");
    },
  });
}

export async function getComplanList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Complan[]>(`/complan/list?${params}`, {
    next: {
      tags: ["complan"],
    },
    cache: "no-store",
  });
}

export async function getComplanCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/complan/count?${params}`, {
    next: {
      tags: ["complan"],
    },
    cache: "no-store",
  });
}

export async function getComplan(id: string) {
  return apiRequest<Complan>(`/complan/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function updateComplan(id: string, values: any) {
  return apiRequest<Complan>(`/complan/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("complan");
      revalidateTag(id);
    },
  });
}

export async function removeComplan(id: string) {
  return apiRequest<Complan>(`/complan/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("complan");
    },
  });
}
