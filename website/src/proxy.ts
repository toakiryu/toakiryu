import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  let response: any;
  if (typeof intlMiddleware === "function") {
    response = intlMiddleware(request);
  } else {
    response = undefined;
  }

  if (!response) {
    const i18nUnavailable = new URL("/i18n-unavailable", request.url);
    return NextResponse.rewrite(i18nUnavailable);
  }

  // カスタムヘッダーを追加する処理
  response.headers.set("x-url", request.url);
  response.headers.set("x-origin", request.nextUrl.origin);
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
