import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "ACTS Commodity Forward Trading",
  description:
    "A modern platform for commodity forward trading, price discovery, and contract management for agricultural and commodity markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
