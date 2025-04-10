import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-center mx-auto py-16">
      <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent pb-6">
        Welcome to ACTS Commodity Forward Trading
      </h1>
      <p className="mt-6 text-[17px] md:text-lg text-gray-300">
        Experience Alternative Commodity Trading System (ACTS). Fair, Secured,
        Transparent and tailored fit commodity forward trading for country's
        trading atmosphere.
      </p>
      <div className="mt-12 flex items-center justify-center gap-4">
        <Button
          size="lg"
          className="rounded-full text-base bg-blue-600 hover:bg-blue-700 text-white"
          asChild>
          <Link href="/register">
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full text-base border-gray-500 text-gray-300 hover:bg-gray-700"
          asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
