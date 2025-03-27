"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Trade } from "@/types/pooling.type";
import { revalidateTag } from "next/cache";

export async function createTrade(values: any) {
  return apiRequest<Trade>("/trade/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("trade");
    },
  });
}

export async function getTradeList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Trade[]>(`/trade/list?${params}`, {
    next: {
      tags: ["trade"],
    },
    cache: "no-store",
  });
}

export async function getTradeCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/trade/count?${params}`, {
    next: {
      tags: ["trade"],
    },
    cache: "no-store",
  });
}

export async function getTrade(id: string) {
  return apiRequest<Trade>(`/trade/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function updateTrade(id: string, values: any) {
  return apiRequest<Trade>(`/trade/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("trade");
      revalidateTag(id);
    },
  });
}

export async function removeTrade(id: string) {
  return apiRequest<Trade>(`/trade/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("trade");
    },
  });
}
