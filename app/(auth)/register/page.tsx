import { validateUsername } from "@/actions/core/user.action";
import Link from "next/link";
import RegisterForm from "./_components/register-form";

type Props = {
  searchParams: {
    referror?: string;
  };
};

export default async function Register({ searchParams }: Props) {
  const { referror } = searchParams;

  if (!!referror) {
    const { data: isValidUsername } = await validateUsername(referror);

    if (!isValidUsername) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto my-8">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Invalid Referral Code
          </h2>
          <p className="text-gray-600 text-center mb-6">
            The referral code "{referror}" was not found in our system.
          </p>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
              Register without referral
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Go to homepage
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 w-full">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill in your details to register
          </p>
        </div>
        <RegisterForm referror={searchParams.referror} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
