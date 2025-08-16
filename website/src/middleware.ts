import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routing } from "./i18n/routing";

// 既存のミドルウェアを作成
const intlMiddleware = createMiddleware(routing);

// Clerk でのルートマッチャーの定義（この範囲で認証が適用される）
const isProtectedRoute = createRouteMatcher([
  "/((?!api|_next|.*\\..*).*)",
  "/(api|trpc)(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Clerk: 認証は auth に含まれる
  if (isProtectedRoute(request)) {
    console.debug("auth", auth);
    const response = await intlMiddleware(request as NextRequest);

    // カスタムヘッダー追加
    response.headers.set("x-url", request.url);
    response.headers.set("x-origin", request.nextUrl.origin);
    response.headers.set("x-pathname", request.nextUrl.pathname);

    return response;
  }

  // 認証対象外の場合
  return await intlMiddleware(request as NextRequest);
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
    // // Skip Next.js internals and all static files, unless found in search params
    // "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // // Always run for API routes
    // "/(api|trpc)(.*)",
  ],
};
