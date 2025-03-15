"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { MainTokenTransaction } from "@/types/pooling.type";

export async function getMainTokenTransactionList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<MainTokenTransaction[]>(
    `/main-token-transaction/list?${params}`,
    {
      next: {
        tags: ["main-token-transaction"],
      },
      cache: "no-store",
    }
  );
}

export async function getMainTokenTransactionCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/main-token-transaction/count?${params}`, {
    next: {
      tags: ["main-token-transaction"],
    },
    cache: "no-store",
  });
}

export async function getMainTokenTransaction(id: string) {
  return apiRequest<MainTokenTransaction>(`/main-token-transaction/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}
