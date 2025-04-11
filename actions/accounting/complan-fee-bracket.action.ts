"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Complan, ComplanFeeBracket } from "@/types/accounting.type";
import { revalidateTag } from "next/cache";

export async function createComplanFeeBracket(values: any) {
  return apiRequest<Complan>("/complan-fee-bracket/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("complan-fee-bracket");
    },
  });
}

export async function getComplanFeeBracketList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<ComplanFeeBracket[]>(`/complan-fee-bracket/list?${params}`, {
    next: {
      tags: ["complan-fee-bracket"],
    },
    cache: "no-store",
  });
}

export async function getComplanFeeBracketCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/complan-fee-bracket/count?${params}`, {
    next: {
      tags: ["complan-fee-bracket"],
    },
    cache: "no-store",
  });
}

export async function getComplanFeeBracket(id: string) {
  return apiRequest<ComplanFeeBracket>(`/complan-fee-bracket/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function updateComplanFeeBracket(id: string, values: any) {
  return apiRequest<ComplanFeeBracket>(`/complan-fee-bracket/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("complan-fee-bracket");
      revalidateTag(id);
    },
  });
}

export async function removeComplanFeeBracket(id: string) {
  return apiRequest<ComplanFeeBracket>(`/complan-fee-bracket/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("complan-fee-bracket");
    },
  });
}
