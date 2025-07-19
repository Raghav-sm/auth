import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware is running on:", request.nextUrl.pathname);
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/Signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login", "/Signup", "/profile", "/profile/:path*"],
};
