"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Allocation } from "@/types/complan-system.type";
import { revalidateTag } from "next/cache";

export async function createAllocation(values: any) {
  return apiRequest<Allocation>("/allocation/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("allocation");
    },
  });
}

export async function getAllocationList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Allocation[]>(`/allocation/list?${params}`, {
    next: {
      tags: ["allocation"],
    },
    cache: "no-store",
  });
}

export async function getAllocationCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/allocation/count?${params}`, {
    next: {
      tags: ["allocation"],
    },
    cache: "no-store",
  });
}

export async function getAllocation(id: string) {
  return apiRequest<Allocation>(`/allocation/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function updateAllocation(id: string, values: any) {
  return apiRequest<Allocation>(`/allocation/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("allocation");
      revalidateTag(id);
    },
  });
}

export async function removeAllocation(id: string) {
  return apiRequest<Allocation>(`/allocation/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("allocation");
    },
  });
}
