import { getCurrentUser } from "@/actions/core/user.action";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/core.type";
import Link from "next/link";

export default async function AuthButtons() {
  const session = await auth();

  if (session) {
    const { data: user } = await getCurrentUser();

    switch (user.role) {
      case UserRole.Owner:
      case UserRole.Admin:
        return (
          <Button
            className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition-opacity"
            asChild>
            <Link href="/admin">Go to Dashboard</Link>
          </Button>
        );

      default:
        return (
          <Button
            className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition-opacity"
            asChild>
            <Link href="/holder">Go to Dashboard</Link>
          </Button>
        );
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="hidden sm:inline-flex rounded-full"
        asChild>
        <Link href="/login">Sign In</Link>
      </Button>
      <Button
        className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition-opacity"
        asChild>
        <Link href="/login">Get Started</Link>
      </Button>
    </>
  );
}
