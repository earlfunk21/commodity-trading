"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { Admin } from "@/types/core.type";
import { revalidateTag } from "next/cache";

export async function createAdmin(values: any) {
  return apiRequest<Admin>("/admin/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("admin");
    },
  });
}

export async function getAdminList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<Admin[]>(`/admin/list?${params}`, {
    next: {
      tags: ["admin"],
    },
    cache: "no-store",
  });
}

export async function getAdminCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/admin/count?${params}`, {
    next: {
      tags: ["admin"],
    },
    cache: "no-store",
  });
}

export async function getAdmin(id: string) {
  return apiRequest<Admin>(`/admin/get/${id}`, {
    next: {
      tags: [id],
      revalidate: 300,
    },
  });
}

export async function getCurrentAdmin() {
  return apiRequest<Admin>(`/admin/current-admin`, {
    cache: "no-store",
  });
}

export async function updateAdmin(id: string, values: any) {
  return apiRequest<Admin>(`/admin/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("admin");
      revalidateTag(id);
    },
  });
}

export async function removeAdmin(id: string) {
  return apiRequest<Admin>(`/admin/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("admin");
    },
  });
}
