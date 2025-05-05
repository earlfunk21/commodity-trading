"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { TradeComplan } from "@/types/accounting.type";
import { revalidateTag } from "next/cache";

export async function createTradeComplan(values: any) {
  return apiRequest<TradeComplan>("/trade-complan/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("trade-complan");
    },
  });
}

export async function getTradeComplanList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<TradeComplan[]>(`/trade-complan/list?${params}`, {
    next: {
      tags: ["trade-complan"],
    },
    cache: "no-store",
  });
}

export async function getTradeComplanCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/trade-complan/count?${params}`, {
    next: {
      tags: ["trade-complan"],
    },
    cache: "no-store",
  });
}

export async function getTradeComplan(id: string) {
  return apiRequest<TradeComplan>(`/trade-complan/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function updateTradeComplan(id: string, values: any) {
  return apiRequest<TradeComplan>(`/trade-complan/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("trade-complan");
      revalidateTag(id);
    },
  });
}

export async function removeTradeComplan(id: string) {
  return apiRequest<TradeComplan>(`/trade-complan/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("trade-complan");
    },
  });
}
