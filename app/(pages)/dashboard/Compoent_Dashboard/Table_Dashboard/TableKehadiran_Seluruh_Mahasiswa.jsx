"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Icons } from "@/app/libs/utils/IconsImport";
import { showFormattedDate } from "@/app/libs/utils/FormatDate";
import { useDispatch, useSelector } from "react-redux";
import {
  getIDMahasiswaState,
  ModalTableKehadiranDetailMahasiswaState,
} from "@/app/libs/redux/feature/PopModalsSlice";
import { DeleteUser } from "@/app/libs/redux/feature/getUserSlice";
import { toast } from "react-toastify";

export default function TableAllHadirMahasiswa({ DataSeluruhMahasiswa }) {
  const generateDate = showFormattedDate(new Date());
  const { DeleteUserFullField } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (DeleteUserFullField) {
      toast.success(DeleteUserFullField.message);
    }
  }, [DeleteUserFullField]);

  return (
    <section className=" overflow-x-auto  mb-5">
      <table className=" table  w-full ">
        <thead className="w-full     ">
          <tr className=" border border-t-0 border-l-0 border-r-0   border-b-black ">
            <th className="text-start pb-[7px] text-sm sm:text-lg  text-black  font-semibold">
              ID
            </th>
            <th className="text-start pb-[7px] text-sm sm:text-lg  text-black  font-semibold">
              Mahasiswa
            </th>
            <th className="text-start pb-[7px]  text-black text-sm sm:text-lg font-semibold">
              Pelajaran
            </th>
            <th className="text-start pb-[7px]  text-black text-sm sm:text-lg font-semibold">
              Kehadiran
            </th>
            <th className="text-start pb-[7px] px-0 text-black text-sm sm:text-lg font-semibold">
              Kelola Mahasiswa
            </th>
          </tr>
        </thead>
        <tbody>
          {DataSeluruhMahasiswa?.map((mahasiswa, i) => {
            const checkHadirMahasiswa = mahasiswa.precence.some(
              (item) => item.date.toLowerCase() === generateDate.toLowerCase()
            );
            return (
              <tr
                key={i}
                className=" border border-b-0 border-l-0 border-r-0   border-t-black"
              >
                <td className="text-start py-[18px] max-sm:text-sm   ">
                  {mahasiswa.id}
                </td>
                <td className="text-start py-[18px] max-sm:text-sm   ">
                  {mahasiswa.name}
                </td>
                <td className="text-start py-[18px] max-sm:text-sm  ">
                  {mahasiswa.pelajaran}
                </td>
                <td
                  className={`text-start py-[18px] max-sm:text-sm ${
                    checkHadirMahasiswa ? "text-green-500" : "text-red-500"
                  }  `}
                >
                  {checkHadirMahasiswa ? "Hadir" : "Belum Hadir"}
                </td>
                <td className="text-start py-[18px]  flex justify-between px-0   ">
                  <figure
                    className="flex gap-2 items-center text-sm lg:text-base cursor-pointer "
                    onClick={() => {
                      dispatch(getIDMahasiswaState(mahasiswa.id));
                      dispatch(ModalTableKehadiranDetailMahasiswaState(true));
                    }}
                  >
                    <p>List Kehadiran</p>
                    <Image
                      src={Icons.IconsDropdown}
                      alt="dropdown"
                      className="w-3 h-3 -rotate-90 "
                    />
                  </figure>
                  <p
                    className="text-red-500 underline cursor-pointer"
                    onClick={() => dispatch(DeleteUser(mahasiswa.id))}
                  >
                    Hapus Akun
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
