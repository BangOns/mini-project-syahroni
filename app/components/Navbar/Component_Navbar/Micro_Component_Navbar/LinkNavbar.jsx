import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LinkNavbar({ page, icons, name }) {
  return (
    <Link href={page} className="flex gap-[10px] pb-[50px] items-center">
      <Image src={icons} alt={name} />
      <p className="font-medium text-white text-base">{name}</p>
    </Link>
  );
}
