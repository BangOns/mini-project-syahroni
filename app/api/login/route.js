import { login } from "@/app/libs/firebase/services";
import { headers } from "@/next.config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function GET() {
//   return NextResponse.json({ status: 200, message: "Welcome to hell" });
// }
export async function POST(req) {
  const res = await req.json();

  const data = await login(res, (values) => {
    return values;
  });
  if (data.status) {
    cookies().set({
      name: "token",
      value: `${data.data.id}||${data.data.role}||${data.data.pelajaran}`,
      httpOnly: true,
      path: "/",
    });
    return Response.json({
      status: data.status,
      data: data.data,
      message: data.message,
    });
  } else {
    return Response.json({
      status: data.status,
      message: data.message,
    });
  }
}
