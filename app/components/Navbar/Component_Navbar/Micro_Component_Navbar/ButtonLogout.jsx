import { Logout } from "@/app/libs/redux/feature/getUserSlice";
import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ButtonLogout() {
  const router = useRouter();
  const dispath = useDispatch();
  async function logout() {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
      });
      const data = await response.json();
      router.push("/login");
      toast.success(data.message);
      dispath(Logout());
    } catch (error) {
      toast.error("Logout Gagal");
    }
  }
  return (
    <button
      className="w-[126px] h-[60px] absolute top-40 shadow bg-white flex justify-center items-center rounded-lg opacity-100 z-10 right-0 gap-2 cursor-pointer"
      onClick={() => logout()}
    >
      <Image
        src={Icons.IconsLogout}
        alt="logout"
        className="w-[30px] h-[30px]"
      />
      <p className="text-red-500  font-semibold">Logout</p>
    </button>
  );
}
