// middleware.ts
import { ca, el, tr } from "date-fns/locale";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //const access_token = request.cookies.get("access_token");
  //const refresh_token = request.cookies.get("refresh_token");
  console.log("middleware access_token==> ", request.cookies);
  const { pathname } = request.nextUrl;
  console.log("middleware pathname==> ", pathname);

  let isAuth = false;

  try {
    const res = await fetch("http://auth-api:3013/auth", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.cookies.toString(),
      },
    });
    const payload = await res.json();
    if (payload) {
      isAuth = true;
    } else {
      isAuth = false;
    }
  } catch (e) {
    isAuth = false;
  }

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isAuthPage && !isAuth) {
    const response = NextResponse.next();
    response.cookies.delete("refresh_token");
    return response;
  } else if (isAuthPage && isAuth) {
    const response = NextResponse.redirect(new URL(`/lessons`, request.url));
    return response;
  } else if (isAuth && !isAuthPage) {
    const response = NextResponse.next();
    return response;
  } else {
    const response = NextResponse.redirect(new URL(`/login`, request.url));
    response.cookies.delete("refresh_token");
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/lessons/:path*",
    "/folders/:path*",
    "/reports/:path*",
    "/account/:path*",
    "/login",
    "/register",
  ],
};
