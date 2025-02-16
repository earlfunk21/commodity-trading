"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { AdminPermission, ResourcePermission } from "@/types/core.type";
import { revalidateTag } from "next/cache";

export async function createAdminPermission(values: any) {
  return apiRequest<AdminPermission>("/admin-permission/create", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("admin-permission");
    },
  });
}

export async function getAdminPermissionList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AdminPermission[]>(`/admin-permission/list?${params}`, {
    next: {
      tags: ["admin-permission"],
    },
    cache: "no-store",
  });
}

export async function getAdminPermissionListByAdmin(query?: any) {
  const params = createURLParams(query);
  return apiRequest<AdminPermission[]>(
    `/admin-permission/list-by-admin?${params}`,
    {
      cache: "no-store",
    }
  );
}

export async function getResourcePermissionList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<ResourcePermission[]>(
    `/admin-permission/permissions?${params}`,
    {
      next: {
        tags: ["permission"],
      },
      cache: "no-store",
    }
  );
}

export async function removeAdminPermission(id: string) {
  return apiRequest<AdminPermission>(`/admin-permission/remove/${id}`, {
    method: "DELETE",
    afterRequest: () => {
      revalidateTag("admin-permission");
    },
  });
}

export async function addAllPermissionsOfAdmin(adminId: string) {
  return apiRequest<AdminPermission>(
    `/admin-permission/add-all-permissions-of-admin/${adminId}`,
    {
      method: "PATCH",
      afterRequest: () => {
        revalidateTag("admin-permission");
      },
    }
  );
}

export async function removeAllPermissionsOfAdmin(adminId: string) {
  return apiRequest<AdminPermission>(
    `/admin-permission/remove-all-permissions-of-admin/${adminId}`,
    {
      method: "DELETE",
      afterRequest: () => {
        revalidateTag("admin-permission");
      },
    }
  );
}
