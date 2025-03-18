import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { AllocationAccountTransaction } from "@/types/accounting.type";

export async function getAllocationAccountTransactionList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AllocationAccountTransaction[]>(
    `/allocation-account-transaction/list?${params}`,
    {
      next: {
        tags: ["allocation-account-transaction"],
      },
      cache: "no-store",
    }
  );
}

export async function getAllocationAccountTransactionCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/allocation-account-transaction/count?${params}`, {
    next: {
      tags: ["allocation-account-transaction"],
    },
    cache: "no-store",
  });
}
