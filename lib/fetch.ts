"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Options<T> = {
  afterRequest?: (result: T) => void;
  beforeRequest?: () => void;
} & RequestInit;

type Response<T> = {
  data: T;
  statusCode: number;
  error?: string;
};

export async function apiRequest<ResponseData>(
  pathName: string,
  options: Options<ResponseData> = {}
): Promise<Response<ResponseData>> {
  const { afterRequest, beforeRequest, ...init } = options;

  if (beforeRequest) {
    beforeRequest();
  }

  const session = await auth();
  const headers: HeadersInit = new Headers(init.headers);
  if (session) {
    headers.append("Authorization", `Bearer ${session.user.accessToken}`);
  }
  const response = await fetch(`${process.env.SERVER_URL}${pathName}`, {
    ...init,
    headers,
  });
  const result = await response.json();

  if (session && result.statusCode === 401) {
    redirect("/logout");
  }

  if (afterRequest) {
    afterRequest(result);
  }
  
  return result;
}
