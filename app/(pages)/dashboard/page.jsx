import { Fragment } from "react";
import CardDashboard from "./Compoent_Dashboard/CardDashboard";
import TableKehadiranSeluruhMahasiswa from "./Compoent_Dashboard/Container_Table_Kehadiran_Seluruh_Mahasiswa";
import HeaderDashboard from "./Compoent_Dashboard/HeaderDashboard";
import { filterDataRoleMahasiswa } from "@/app/libs/firebase/services";
import { cookies } from "next/headers";

async function getCookies() {
  const getCookies = cookies().get("token");
  try {
    if (getCookies) {
      const CookiesMapel = cookies().get("token")?.value.split("||")[2];
      const { ListDataCard, filterRoleMahasiswa } =
        await filterDataRoleMahasiswa(CookiesMapel);
      return { ListDataCard, filterRoleMahasiswa };
    }
  } catch (error) {
    console.log(error);
  }
}

export default async function Dashboard() {
  const { ListDataCard, filterRoleMahasiswa } = await getCookies();
  return (
    <Fragment>
      <HeaderDashboard />
      <section className="w-full flex gap-[40px] flex-wrap justify-center md:justify-start md:flex-nowrap ">
        {ListDataCard?.map((items, index) => (
          <CardDashboard key={index} {...items} />
        ))}
      </section>
      <TableKehadiranSeluruhMahasiswa
        DataSeluruhMahasiswa={filterRoleMahasiswa}
      />
    </Fragment>
  );
}
