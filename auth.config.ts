import type { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/auth/get-access-token?refreshToken=${token.user.refreshToken}`
  );

  const result = await response.json();

  if (result.error) {
    return null;
  }

  return {
    ...token,
    user: result.data,
  };
};

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      if (new Date().getTime() < token.user.expiresIn) {
        return token;
      }
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        return {
          ...session,
          ...token,
        };
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
