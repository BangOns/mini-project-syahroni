import React, { Fragment } from "react";

import { cookies } from "next/headers";
import LayoutNavbar from "./Component_Navbar/Micro_Component_Navbar/LayoutNavbar";
import { ListLink } from "@/app/libs/utils/List_Link_Navbar";
import LinkNavbar from "./Component_Navbar/Micro_Component_Navbar/LinkNavbar";

async function getDataUser() {
  const getCookies = cookies().get("token");
  try {
    if (getCookies) {
      const getKeyInCookies = cookies().get("token").value.split("||");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userId/${getKeyInCookies[0]}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Set-Cookie": cookies().get("token").value,
          },
        }
      );
      return response.json();
    }
  } catch (error) {
    return new Error("Gagal mengambil data user");
  }
}

export default async function Navbar() {
  const data = await getDataUser();
  return (
    <Fragment>
      {data && (
        <LayoutNavbar
          imageProfile={data.data.imageProfile}
          name={data.data.name}
        >
          {data.data.role === "Mahasiswa"
            ? ListLink?.Mahasiswa.map((items, index) => (
                <LinkNavbar key={index} {...items} />
              ))
            : ListLink?.Dosen.map((items, index) => (
                <LinkNavbar key={index} {...items} />
              ))}
        </LayoutNavbar>
      )}
    </Fragment>
  );
}
