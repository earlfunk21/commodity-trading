"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { SubToken } from "@/types/pooling.type";

export async function getSubTokenList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<SubToken[]>(`/sub-token/list?${params}`, {
    next: {
      tags: ["sub-token"],
    },
    cache: "no-store",
  });
}

export async function getSubTokenCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/sub-token/count?${params}`, {
    next: {
      tags: ["sub-token"],
    },
    cache: "no-store",
  });
}

export async function getSubTokenListByHolder(query?: any) {
  const params = createURLParams(query);
  return apiRequest<SubToken[]>(`/sub-token/list-by-holder?${params}`, {
    next: {
      tags: ["sub-token"],
    },
    cache: "no-store",
  });
}

export async function getSubTokenCountByHolder(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/sub-token/count-by-holder?${params}`, {
    next: {
      tags: ["sub-token"],
    },
    cache: "no-store",
  });
}
