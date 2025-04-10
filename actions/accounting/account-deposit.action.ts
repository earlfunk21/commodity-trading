"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { AccountDeposit } from "@/types/accounting.type";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createAccountDeposit(values: any) {
  return apiRequest<AccountDeposit>("/account-deposit/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("account-deposit");
      revalidatePath("/admin/user/[username]", "page");
    },
  });
}

export async function getAccountDepositList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AccountDeposit[]>(`/account-deposit/list?${params}`, {
    next: {
      tags: ["account-deposit"],
    },
    cache: "no-store",
  });
}

export async function getAccountDepositCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/account-deposit/count?${params}`, {
    next: {
      tags: ["account-deposit"],
    },
    cache: "no-store",
  });
}

export async function getAccountDepositListByUser(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AccountDeposit[]>(`/account-deposit/list-by-user?${params}`, {
    next: {
      tags: ["account-deposit"],
    },
    cache: "no-store",
  });
}

export async function getAccountDepositCountByUser(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/account-deposit/count-by-user?${params}`, {
    next: {
      tags: ["account-deposit"],
    },
    cache: "no-store",
  });
}
