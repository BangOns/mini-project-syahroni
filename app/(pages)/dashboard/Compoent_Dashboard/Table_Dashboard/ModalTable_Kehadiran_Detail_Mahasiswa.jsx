"use client";
import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIDMahasiswaState,
  ModalTableKehadiranDetailMahasiswaState,
} from "@/app/libs/redux/feature/PopModalsSlice";
import DetailKehadiranMahasiswa from "./DetailKehadiranMahasiswa";

export default function ModalTableKehadiranDetailMahasiswa({ DataMahasiswa }) {
  const { ModalTableKehadiranDetailMahasiswa, getIDMahasiswa } = useSelector(
    (state) => state?.modals
  );
  const getName = DataMahasiswa.find(
    (items) => items.id === getIDMahasiswa
  )?.name;
  const dispatch = useDispatch();
  return (
    <article
      className={` ${
        ModalTableKehadiranDetailMahasiswa ? "flex" : "hidden"
      } w-screen h-screen fixed bg-black/30 top-0 left-0  justify-center items-center sm:px-10 max-sm:px-0`}
    >
      <article className=" w-full max-sm:h-full md:w-3/4 sm:min-h-[355px] bg-white rounded">
        <header className="flex px-5 h-[50px] border-b-[1px] border-b-black/20 justify-between items-center">
          <h1 className="text-lg font-medium">
            Daftar Kehadiran {getName ? getName : "null"}
          </h1>
          <Image
            src={Icons.IconsCloseBlack}
            alt="close"
            className="cursor-pointer "
            onClick={() => {
              dispatch(getIDMahasiswaState(""));
              dispatch(ModalTableKehadiranDetailMahasiswaState(false));
            }}
          />
        </header>
        {ModalTableKehadiranDetailMahasiswa && (
          <DetailKehadiranMahasiswa DataMahasiswa={DataMahasiswa} />
        )}
      </article>
    </article>
  );
}
