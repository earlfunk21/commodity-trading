"use client";
import { logout } from "@/actions/core/auth.action";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    logout();
  }, []);

  return null;
}
