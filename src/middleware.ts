import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");
  console.log(session);
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
  //   headers: {
  //     Cookie: `session=${session?.value}`,
  //   },
  // });

  // if (responseAPI.status !== 200) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todos/:path*"],
};
