import { authConfig } from "@/auth.config";
import { AUTH_ROUTES, DEFAULT_REDIRECT, PUBLIC_ROUTES } from "@/lib/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isAuthenticated = !!session;

  const commoditiesRoute = nextUrl.pathname.startsWith("/commodities");
  const newsEventRoute = nextUrl.pathname.startsWith("/news-event");

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname) || commoditiesRoute || newsEventRoute;
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isAuthRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    const redirectUrl = new URL("/login", nextUrl);
    const callbackUrl = req.nextUrl.pathname;
    if (callbackUrl !== DEFAULT_REDIRECT) {
      redirectUrl.searchParams.append("callbackUrl", callbackUrl);
    }
    return Response.redirect(redirectUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
