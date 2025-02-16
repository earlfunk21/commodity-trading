"use client";
import { Button } from "@/components/ui/button";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
      <div className="text-red-500 mb-4">
        <OctagonAlert className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {error.message ?? "Oops! Something went wrong"}
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        We apologize for the inconvenience. Please try again or contact support
        if the problem persists.
      </p>
      <Button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                 transition-colors duration-200 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2"
        asChild>
        <Link href="..">Go back</Link>
      </Button>
    </div>
  );
}
