import {
  deleteUserById,
  retrieveDataById,
  updateUserPrecence,
} from "@/app/libs/firebase/services";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(params) {
  const ids = params.headers.getSetCookie().toString().split("||")[0];
  const Collections = params.headers.getSetCookie().toString().split("||")[2];
  const response = await retrieveDataById(Collections, ids);

  return NextResponse.json({ status: 200, data: response });
}

export async function PATCH(req) {
  const dataRequest = await req.json();
  const getIdByCookies = cookies().get("token").value.split("||")[0];
  const getCollectionByCookies = cookies().get("token").value.split("||")[2];
  dataRequest.id = getIdByCookies;
  const response = await updateUserPrecence(
    getCollectionByCookies,
    dataRequest,
    (value) => {
      return value;
    }
  );
  return NextResponse.json({
    status: response.status,
    data: response.data,
    message: response.message,
  });
}

export async function DELETE(params) {
  const ids = params.nextUrl.pathname.split("/")[3];
  const Collections = cookies().get("token").value.split("||")[2];
  const response = await deleteUserById(Collections, ids);
  return NextResponse.json({ status: 200, message: response.message });
}
