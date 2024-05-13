import React, { Fragment } from "react";

import LayoutNavbar from "./Component_Navbar/Micro_Component_Navbar/LayoutNavbar";
import { ListLink } from "@/app/libs/utils/List_Link_Navbar";
import LinkNavbar from "./Component_Navbar/Micro_Component_Navbar/LinkNavbar";
import { cookies } from "next/headers";
import { retrieveDataById } from "@/app/libs/firebase/services";

async function getDataUser() {
  const getCookies = cookies().get("token");
  try {
    if (getCookies) {
      const getKeyInCookies = cookies().get("token").value.split("||");
      const response = await retrieveDataById(
        getKeyInCookies[2],
        getKeyInCookies[0]
      );
      return { response };
    }
  } catch (error) {
    return new Error("Gagal mengambil data user");
  }
}

export default async function Navbar() {
  const { response } = await getDataUser();
  return (
    <Fragment>
      {response && (
        <LayoutNavbar imageProfile={response.imageProfile} name={response.name}>
          {response.role === "Mahasiswa"
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
