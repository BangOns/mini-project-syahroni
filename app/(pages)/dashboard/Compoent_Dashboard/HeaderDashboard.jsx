import { retrieveDataById } from "@/app/libs/firebase/services";
import { cookies } from "next/headers";
import React from "react";

export default async function HeaderDashboard() {
  const getIdByCookies = cookies().get("token").value.split("||")[0];
  const getMapelByCookies = cookies().get("token").value.split("||")[2];
  const data = await retrieveDataById(getMapelByCookies, getIdByCookies);
  return (
    <section className="w-full  pb-[33px] flex justify-between gap-6 lg:gap-0 flex-wrap lg:flex-nowrap ">
      <header className="max-w-md">
        <h1 className=" text-3xl lg:text-[40px] font-medium ">
          Halo, {data ? data.name : "null"}
        </h1>
        <h2 className="text-xl opacity-60 py-6 ">
          Selamat Datang! Dosen {data ? data.pelajaran : "Null"}
        </h2>
        <hr className="bg-black h-[2px] w-11/12" />
      </header>
    </section>
  );
}
