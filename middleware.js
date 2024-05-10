import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const PagesDosen = ["/dashboard"];
  const PagesMahasiswa = ["/"];
  const PageBoth = ["/", "/dashboard", "/profile"];

  const token = cookies().get("token");
  if (!token && PageBoth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (
      token?.value.includes("Dosen") &&
      PagesMahasiswa.includes(request.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (
      token?.value.includes("Mahasiswa") &&
      PagesDosen.includes(request.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}
