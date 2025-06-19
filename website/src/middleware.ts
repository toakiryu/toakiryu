import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// 既存のミドルウェアを作成
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // intlMiddleware を実行して、結果を取得
  let response = intlMiddleware(request);

  // intlMiddleware がレスポンスを返さなかった場合、デフォルトのNextResponseを作成
  if (!response) {
    response = NextResponse.next();
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
