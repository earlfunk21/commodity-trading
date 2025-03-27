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

export async function getTokenValuesByMinute() {
  return apiRequest<any[]>("/main-token-value/token-values-by-minute", {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByHour() {
  return apiRequest<any[]>("/main-token-value/token-values-by-hour", {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByDay() {
  return apiRequest<any[]>("/main-token-value/token-values-by-day", {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByMonth() {
  return apiRequest<any[]>("/main-token-value/token-values-by-month", {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}

export async function getTokenValuesByYear() {
  return apiRequest<any[]>("/main-token-value/token-values-by-year", {
    next: {
      tags: ["main-token-value"],
    },
    cache: "no-store",
  });
}
