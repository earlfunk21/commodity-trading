import LoginForm from "@/app/(auth)/login/_components/login-form";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: {
    callbackUrl?: string;
  }
}

export default async function LoginPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 w-full">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>
        <LoginForm callbackUrl={searchParams.callbackUrl} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <Button variant="outline" className="mt-2" asChild>
          <Link href="/enrollment-request-form">
            <GraduationCap />
            Enroll Now!
          </Link>
        </Button>
      </div>
    </div>
  );
}
