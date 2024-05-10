import { retrieveData } from "@/app/libs/firebase/services";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await retrieveData("users");

  return NextResponse.json({ status: 200, data: response });
}
