import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const response = NextResponse.next();

  const isLoggedIn = req.cookies.get("token")?.value === "true";

  if (
    !isLoggedIn &&
    req.nextUrl.pathname !== "/students" &&
    req.nextUrl.pathname.toString().startsWith("/students")
  ) {
    return NextResponse.redirect(new URL("/students?unauth=true", req.url));
  }

  if (
    !isLoggedIn &&
    req.nextUrl.pathname !== "/courses" &&
    req.nextUrl.pathname.toString().startsWith("/courses")
  ) {
    return NextResponse.redirect(new URL("/courses?unauth=true", req.url));
  }

  // const authHeader = req.headers.get("Authorization");
  // const xApiKey = req.headers.get("x-api-key");

  // if (
  //   req.nextUrl.pathname.startsWith("/api") &&
  //   (authHeader?.split(" ")[1] !== "secret-token" ||
  //     xApiKey !== "super-secret-api-key")
  // ) {
  //   return NextResponse.json({ success: false }, { status: 401 });
  // }

  return response;
}

// /students
// /courses
// /students/something -> /students
// /courses/something -> /courses
