"use server";
import { signIn, signOut } from "@/auth";
import { apiRequest } from "@/lib/fetch";
import { AuthError, User } from "next-auth";
import { revalidateTag } from "next/cache";

export async function authenticate(values: any) {
  try {
    await signIn("credentials", {
      ...values,
      redirect: false,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Password or Username",
            message: error.message,
          };
        case "AccessDenied":
          return {
            error: "You do not have permission to access this app",
            message: error.message,
          };
        default:
          return {
            error: "Something went wrong",
            message: "Please contact the admin",
          };
      }
    }
    return {
      error: "Something went wrong",
      message: "Please contact the admin",
    };
  }
}

export async function logout() {
  await signOut({ redirect: true, redirectTo: "/login" });
}

export async function login(values: any) {
  return apiRequest<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    afterRequest: () => {
      revalidateTag("user");
    },
  });
}

export async function forgotPassword(email: string) {
  return apiRequest(`/auth/forgot-password/${email}`, {
    method: "PATCH",
  });
}

export async function resetPassword(values: any) {
  return apiRequest<User>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function registerHolder(values: any) {
  return apiRequest<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
