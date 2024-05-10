import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    cookies().delete("token");
    return NextResponse.json({ status: 200, message: "Logout Berhasil" });
  } catch (error) {
    return NextResponse.json({ status: 400, message: "Logout Gagal" });
  }
}
