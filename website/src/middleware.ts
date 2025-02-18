import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const maintenance = process.env.NEXT_PUBLIC_MAINTENANCE;

  // ステータスに応じたリダイレクト処理
  if (maintenance === "true" && currentPath !== "/maintenance") {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  } else if (maintenance === "false" && currentPath === "/maintenance") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 通常のレスポンスを作成
  const response = NextResponse.next();
  response.headers.set("x-pathname", currentPath);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
