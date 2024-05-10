import { showFormattedDate } from "@/app/libs/utils/FormatDate";
import React from "react";
import { useSelector } from "react-redux";

export default function DetailKehadiranMahasiswa({ DataMahasiswa }) {
  const generateDate = showFormattedDate(new Date());

  const { getIDMahasiswa } = useSelector((state) => state?.modals);
  const FindMahasiswaById = DataMahasiswa.find(
    (items) => items.id === getIDMahasiswa
  );
  const checkHadirMahasiswa = FindMahasiswaById.precence.some(
    (item) => item.date.toLowerCase() === generateDate.toLowerCase()
  );
  return (
    <article className="w-full pt-[31px] px-5">
      <section className=" overflow-x-auto  mb-5">
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
            {FindMahasiswaById?.precence?.map((items, i) => (
              <tr className=" border border-b-0 border-l-0 border-r-0   border-t-black">
                <td className="text-start py-[18px] max-sm:text-sm">{i + 1}</td>
                <td className="text-start py-[18px] max-sm:text-sm  ">
                  {FindMahasiswaById.pelajaran}
                </td>
                <td
                  className={`text-start py-[18px] max-sm:text-sm  ${
                    items.isAbsen ? "text-green-500" : "text-red-500"
                  } `}
                >
                  {items.isAbsen ? "Hadir" : "belum hadir"}
                </td>
                <td className="text-start py-[18px] max-sm:text-sm  ">
                  {items.date},{items.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}
