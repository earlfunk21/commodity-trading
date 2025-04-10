"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { MainTokenValue } from "@/types/pooling.type";
import { revalidateTag } from "next/cache";

export async function createMainTokenValue(values: any) {
  return apiRequest<MainTokenValue>("/main-token-value/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("main-token-value");
    },
  });
}

export async function getMainTokenValueList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<MainTokenValue[]>(`/main-token-value/list?${params}`, {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getMainTokenValueCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/main-token-value/count?${params}`, {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByMinute(mainTokenId: string) {
  return apiRequest<any[]>(`/main-token-value/token-values-by-minute/${mainTokenId}`, {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByHour(mainTokenId: string) {
  return apiRequest<any[]>(`/main-token-value/token-values-by-hour/${mainTokenId}`, {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByDay(mainTokenId: string) {
  return apiRequest<any[]>(`/main-token-value/token-values-by-day/${mainTokenId}`, {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByMonth(mainTokenId: string) {
  return apiRequest<any[]>(`/main-token-value/token-values-by-month/${mainTokenId}`, {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByYear(mainTokenId: string) {
  return apiRequest<any[]>(`/main-token-value/token-values-by-year/${mainTokenId}`, {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}
