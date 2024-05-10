import React, { Fragment } from "react";
import TableAllHadirMahasiswa from "./Table_Dashboard/TableKehadiran_Seluruh_Mahasiswa";
import HeaderDashboardTableSeluruhMahasiswa from "./Table_Dashboard/HeaderTable_Kehadiran_Seluruh_Mahasiswa";
import ModalTableKehadiranDetailMahasiswa from "./Table_Dashboard/ModalTable_Kehadiran_Detail_Mahasiswa";

export default function TableKehadiranSeluruhMahasiswa({
  DataSeluruhMahasiswa,
}) {
  return (
    <Fragment>
      <article className="w-full pt-28">
        <hr className="w-full h-[2px] bg-black/60" />

        <HeaderDashboardTableSeluruhMahasiswa />
        <TableAllHadirMahasiswa DataSeluruhMahasiswa={DataSeluruhMahasiswa} />
      </article>
      <ModalTableKehadiranDetailMahasiswa
        DataMahasiswa={DataSeluruhMahasiswa}
      />
    </Fragment>
  );
}
