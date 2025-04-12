import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { AccountTransaction } from "@/types/accounting.type";

export async function getAccountTransactionList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AccountTransaction[]>(
    `/account-transaction/list?${params}`,
    {
      next: {
        tags: ["account-transaction"],
      },
      cache: "no-store",
    }
  );
}

export async function getAccountTransactionCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/account-transaction/count?${params}`, {
    next: {
      tags: ["account-transaction"],
    },
    cache: "no-store",
  });
}

export async function getAccountTransactionListByUser(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AccountTransaction[]>(
    `/account-transaction/list-by-user?${params}`,
    {
      next: {
        tags: ["account-transaction"],
      },
      cache: "no-store",
    }
  );
}

export async function getAccountTransactionCountByUser(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/account-transaction/count-by-user?${params}`, {
    next: {
      tags: ["account-transaction"],
    },
    cache: "no-store",
  });
}
