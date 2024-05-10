"use client";
import React, { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";

export default function TableKehadiranMahasiswa({ pelajaran, kehadiran }) {
  const [isSelectKehadiran, isSelectKehadiranSet] = useState(false);
  return (
    <article className="w-full pt-28">
      <hr className="w-full h-[2px] bg-black/60" />
      <header className="w-full flex justify-between pt-[19px]">
        <h1 className="text-xl sm:text-2xl font-medium">Daftar Kehadiranmu</h1>
      </header>
      <section className="pt-[31px] overflow-x-auto  mb-5">
        <table className=" table  w-full ">
          <thead className="w-full     ">
            <tr className=" border border-t-0 border-l-0 border-r-0   border-b-black ">
              <th className="text-start pb-[7px] text-sm sm:text-lg lg:pr-[130px] text-black  font-semibold">
                No
              </th>
              <th className="text-start pb-[7px] lg:pr-[130px] text-black text-sm sm:text-lg font-semibold">
                Pelajaran
              </th>
              <th className="text-start pb-[7px] lg:pr-[130px] text-black text-sm sm:text-lg font-semibold">
                Kehadiran
              </th>
              <th className="text-start pb-[7px] text-black text-sm sm:text-lg font-semibold">
                Tanggal & Waktu
              </th>
            </tr>
          </thead>
          <tbody>
            {kehadiran?.map((items, i) => (
              <Fragment key={i}>
                <tr className=" border border-b-0 border-l-0 border-r-0   border-t-black">
                  <td className="text-start py-[18px] max-sm:text-sm">
                    {i + 1}
                  </td>
                  <td className="text-start py-[18px] max-sm:text-sm  ">
                    {pelajaran}
                  </td>
                  <td
                    className={`text-start py-[18px] max-sm:text-sm ${
                      items.isAbsen ? "text-green-500" : "text-red-500"
                    }  `}
                  >
                    {items.isAbsen ? "hadir" : "Tidak Hadir"}
                  </td>
                  <td className="text-start py-[18px] max-sm:text-sm  ">
                    {items.date}, {items.times} WIB
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}
