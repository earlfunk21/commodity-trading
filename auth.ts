import { login } from "@/actions/core/auth.action";
import { authConfig } from "@/auth.config";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const result = await login(credentials);

        if (result.error) {
          const authError = new AuthError();
          authError.type = "CredentialsSignin";
          authError.message = result.error;
          throw authError;
        }

        return result.data;
      },
    }),
  ],
});
