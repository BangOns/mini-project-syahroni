"use client";
import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";
import React from "react";

export default function CardDashboard({
  Title,
  Value,
  Icon,
  BgColor,
  FontSize,
}) {
  return (
    <section
      className={`w-3/4 md:w-[200px] h-[100px] ${BgColor} rounded-lg relative pl-[7px] pt-[6px]`}
    >
      <header className="">
        <h2 className="pb-[14px] text-sm lg:text-base ">{Title}</h2>
        <p className={`${FontSize ? FontSize : "lg:text-2xl"} font-medium`}>
          {Value}
        </p>
      </header>
      <Image
        src={Icon}
        alt={Title}
        className="absolute -bottom-[1px] right-[11px]"
      />
    </section>
  );
}
