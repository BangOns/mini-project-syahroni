import { RegisterUser } from "@/app/libs/firebase/services";
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = await req.json();
  const datas = await RegisterUser(res, (value) => {
    return value;
  });
  return NextResponse.json({
    status: datas.status,
    data: datas.data.nama,
    message: datas.message,
  });
}
