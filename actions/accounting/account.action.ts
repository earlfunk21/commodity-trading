"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Account } from "@/types/accounting.type";

export async function getAccountList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Account[]>(`/account/list?${params}`, {
    next: {
      tags: ["account"],
    },
    cache: "no-store",
  });
}

export async function getAccountCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/account/count?${params}`, {
    next: {
      tags: ["account"],
    },
    cache: "no-store",
  });
}

export async function getAccount(userId: string) {
  return apiRequest<Account>(`/account/get/${userId}`, {
    next: {
      tags: ["account-" + userId],
    },
    cache: "no-store",
  });
}

export async function getAccountByUser() {
  return apiRequest<Account | null>(`/account/get-by-user`, {
    cache: "no-store",
    next: {
      tags: ["account-by-user"],
    },
  });
}
