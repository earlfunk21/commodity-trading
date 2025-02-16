"use client";
import { ConfirmDialogProvider } from "@/components/ui-extension/confirm-dialog";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ConfirmDialogProvider
          defaultOptions={{
            title: "Are you sure you want to proceed?",
          }}
        >
          {children}
        </ConfirmDialogProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
