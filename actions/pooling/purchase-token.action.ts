"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { PurchaseToken } from "@/types/pooling.type";
import { revalidateTag } from "next/cache";

export async function createPurchaseToken(values: any) {
  return apiRequest<PurchaseToken>("/purchase-token/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("purchase-token");
    },
  });
}

export async function createPurchaseTokenByHolder(values: any) {
  return apiRequest<PurchaseToken>("/purchase-token/create-by-holder", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("purchase-token");
    },
  });
}

export async function getPurchaseTokenList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<PurchaseToken[]>(`/purchase-token/list?${params}`, {
    next: {
      tags: ["purchase-token"],
    },
    cache: "no-store",
  });
}

export async function getPurchaseTokenCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/purchase-token/count?${params}`, {
    next: {
      tags: ["purchase-token"],
    },
    cache: "no-store",
  });
}

export async function getPurchaseTokenListByHolder(query?: any) {
  const params = createURLParams(query);
  return apiRequest<PurchaseToken[]>(
    `/purchase-token/list-by-holder?${params}`,
    {
      next: {
        tags: ["purchase-token"],
      },
      cache: "no-store",
    }
  );
}

export async function getPurchaseTokenCountByHolder(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/purchase-token/count-by-holder?${params}`, {
    next: {
      tags: ["purchase-token"],
    },
    cache: "no-store",
  });
}

export async function getPurchaseToken(id: string) {
  return apiRequest<PurchaseToken>(`/purchase-token/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function updatePurchaseToken(id: string, values: any) {
  return apiRequest<PurchaseToken>(`/purchase-token/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("purchase-token");
      revalidateTag(id);
    },
  });
}

export async function removePurchaseToken(id: string) {
  return apiRequest<PurchaseToken>(`/purchase-token/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("purchase-token");
    },
  });
}
