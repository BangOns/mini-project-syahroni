import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";
import React from "react";

export default function HeaderProfile() {
  return (
    <header className="w-full flex h-[50px] mb-12  gap-[14px] items-center">
      <Image
        src={Icons.IconsManageAccount}
        alt="account"
        className=" w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
      />
      <h2 className="text-2xl md:text-[40px]  font-medium ">Kelola Akun</h2>
    </header>
  );
}
