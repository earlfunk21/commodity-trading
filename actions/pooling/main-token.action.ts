"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { MainToken } from "@/types/pooling.type";
import { revalidateTag } from "next/cache";

export async function createMainToken(values: any) {
  return apiRequest<MainToken>("/main-token/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("main-token");
    },
  });
}

export async function getMainTokenList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<MainToken[]>(`/main-token/list?${params}`, {
    next: {
      tags: ["main-token"],
    },
    cache: "no-store",
  });
}

export async function getMainTokenCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/main-token/count?${params}`, {
    next: {
      tags: ["main-token"],
    },
    cache: "no-store",
  });
}

export async function getMainToken(code: string) {
  return apiRequest<MainToken>(`/main-token/get/${code}`, {
    next: {
      tags: [code],
    },
    cache: "no-store",
  });
}

export async function updateMainToken(id: string, values: any) {
  return apiRequest<MainToken>(`/main-token/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: ({ data, error }) => {
      revalidateTag("main-token");
      if (!error) {
        revalidateTag(data.code);
      }
    },
  });
}

export async function releasedReferralCommission(id: string) {
  return apiRequest<MainToken>(
    `/main-token/released-referral-commission/${id}`,
    {
      method: "PATCH",
      afterRequest: ({ data, error }) => {
        revalidateTag("main-token");
        if (!error) {
          revalidateTag(data.code);
        }
      },
    }
  );
}

export async function releasedManagementFee(id: string) {
  return apiRequest<MainToken>(`/main-token/released-management-fee/${id}`, {
    method: "PATCH",
    afterRequest: ({ data, error }) => {
      revalidateTag("main-token");
      if (!error) {
        revalidateTag(data.code);
      }
    },
  });
}

export async function removeMainToken(code: string) {
  return apiRequest<MainToken>(`/main-token/remove/${code}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("main-token");
    },
  });
}
