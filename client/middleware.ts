// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //const access_token = request.cookies.get("access_token");
  //const refresh_token = request.cookies.get("refresh_token");
  console.log("middleware access_token==> ", request.cookies);
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
    const isAuth = await res.json();

    if (!isAuth) {
      const response = NextResponse.redirect(new URL(`/login`, request.url));
      // console.log("NextResponse ==> ", response.cookies);

      response.cookies.delete("refresh_token");
      return response;
    }
    return NextResponse.next();
  } catch (err) {
    console.log("middleware err==> ", err);
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/lessons/:path*",
    "/folders/:path*",
    "/reports/:path*",
    "/account/:path*",
  ],
};
