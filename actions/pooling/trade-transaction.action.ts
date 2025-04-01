"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { TradeTransaction } from "@/types/pooling.type";
import { revalidateTag } from "next/cache";

export async function createTradeTransaction(values: any) {
  return apiRequest<TradeTransaction>("/trade-transaction/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("trade-transaction");
    },
  });
}

export async function getTradeTransactionList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<TradeTransaction[]>(`/trade-transaction/list?${params}`, {
    next: {
      tags: ["trade-transaction"],
    },
    cache: "no-store",
  });
}

export async function getTradeTransactionCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/trade-transaction/count?${params}`, {
    next: {
      tags: ["trade-transaction"],
    },
    cache: "no-store",
  });
}
