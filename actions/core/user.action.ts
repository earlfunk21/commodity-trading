"use server";
import { apiRequest } from "@/lib/fetch";
import { createURLParams } from "@/lib/utils";
import { User } from "@/types/core.type";
import { revalidateTag } from "next/cache";

export async function getCurrentUser() {
  return apiRequest<User>("/user/get-current-user", {
    next: {
      tags: ["current-user"],
      revalidate: 300,
    },
  });
}

export async function getUserList(query?: any) {
  const params = createURLParams(query);
  return apiRequest<User[]>(`/user/list?${params}`, {
    next: {
      tags: ["user-list"],
    },
    cache: "no-cache",
  });
}

export async function getUserCount(query?: any) {
  const params = createURLParams(query);
  return apiRequest<number>(`/user/count?${params}`, {
    next: {
      tags: ["user-count"],
    },
    cache: "no-cache",
  });
}

export async function getUser(username: string) {
  return apiRequest<User>(`/user/get/${username}`, {
    next: {
      tags: [username],
      revalidate: 300,
    },
  });
}

export async function validateUsername(username: string) {
  return apiRequest<boolean>(`/user/validate-username/${username}`, {
    next: {
      tags: [`validate-username-${username}`],
    },
    cache: "no-store",
  });
}

export async function validateEmail(email: string) {
  return apiRequest<boolean>(`/user/validate-email/${email}`, {
    next: {
      tags: [`validate-email-${email}`],
    },
    cache: "no-store",
  });
}

export async function updateUser(username: string, data: any) {
  return apiRequest(`/user/update/${username}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag(username);
      revalidateTag("user-list");
      revalidateTag("user-count");
    },
  });
}
