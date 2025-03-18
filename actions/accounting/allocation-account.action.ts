import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { AllocationAccount } from "@/types/accounting.type";

export async function getAllocationAccountList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AllocationAccount[]>(`/allocation-account/list?${params}`, {
    next: {
      tags: ["allocation-account"],
    },
    cache: "no-store",
  });
}
