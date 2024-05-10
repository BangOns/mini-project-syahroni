"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/app/libs/utils/IconsImport";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Role } from "@/app/libs/utils/List_Role";
import { Mapel } from "@/app/libs/utils/List_Pelajaran";
import {
  CreateUser,
  ResetRegister,
} from "@/app/libs/redux/feature/getUserSlice";
import { toast } from "react-toastify";

export default function FormRegister() {
  const { RegisterAccountPending, RegisterAccountFullField } = useSelector(
    (state) => state.users
  );
  const [dataUser, dataUserSet] = useState({
    name: "",
    password: "",
    pelajaran: "",
    role: "",
  });
  const [confPassword, confPasswordSet] = useState("");
  const [validateFormEmpty, validateFormEmptySet] = useState(false);
  const [isSamePassword, isSamePasswordSet] = useState(false);
  const [isSelectPelajaran, isSelectPelajaranSet] = useState(false);
  const [isSelectRole, isSelectRoleSet] = useState(false);
  const [isActivePassword, isActivePasswordSet] = useState(false);
  const [isActiveConfPassword, isActiveConfPasswordSet] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  async function handleRegister(e) {
    e.preventDefault();
    if (
      dataUser.name === "" ||
      dataUser.password === "" ||
      dataUser.pelajaran === "" ||
      dataUser.role === ""
    ) {
      validateFormEmptySet(true);
    } else {
      validateFormEmptySet(false);
      if (dataUser.password === confPassword) {
        isSamePasswordSet(false);
        const newUser = {
          ...dataUser,
        };
        dispatch(CreateUser(newUser));
      } else {
        isSamePasswordSet(true);
      }
    }
  }
  async function handlerSuccessCreateAccount() {
    if (RegisterAccountFullField) {
      if (RegisterAccountFullField.status) {
        router.push("/login");
        toast.success(RegisterAccountFullField.message);
      } else {
        toast.error(RegisterAccountFullField.message);
      }
    }
  }

  useEffect(() => {
    handlerSuccessCreateAccount();
  }, [RegisterAccountFullField]);
  return (
    <section className="w-full md:w-[377px] lg:w-[438px] flex-none  ">
      <article className="w-full h-full flex flex-col items-center justify-center ">
        <header className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center">
            ATTENDANCE
          </h1>
          <h3 className="text-sm md:text-base lg:text-lg font-medium text-center">
            Login to Your Account
          </h3>
        </header>
        <form
          action=""
          className="w-full shrink pt-[22px]"
          onSubmit={handleRegister}
        >
          <section className="w-full px-5  h-auto flex flex-col gap-5  lg:gap-[22px] ">
            <aside>
              <label
                htmlFor=""
                className="block pb-[10px] font-medium text-base md:text-md lg:text-lg"
              >
                Username
              </label>
              <input
                type="text"
                value={dataUser.name}
                onChange={(e) =>
                  dataUserSet({ ...dataUser, name: e.target.value })
                }
                placeholder="Masukkan Username"
                className="w-full h-[39px] p-2 lg:p-3 border border-opacity-30 placeholder:opacity-40 outline-none rounded-lg font-medium text-base lg:text-lg"
              />
            </aside>
            <aside>
              <label
                htmlFor=""
                className="block pb-[10px] font-medium text-base md:text-md lg:text-lg"
              >
                Role
              </label>
              <div className="w-full h-10 flex border rounded-lg items-center  relative cursor-pointer ">
                <div
                  className="grow flex items-center"
                  onClick={() => isSelectRoleSet(!isSelectRole)}
                >
                  <p
                    className={`p-3  ${
                      dataUser.role ? "opacity-100" : "opacity-30"
                    } font-medium text-base md:text-md lg:text-lg`}
                  >
                    {dataUser.role ? dataUser.role : "Pilih Role"}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-10  h-full  bg-slate-300 rounded-r-lg flex justify-center items-center"
                  onClick={() => isSelectRoleSet(!isSelectRole)}
                >
                  <Image
                    src={Icons.IconsDropdown}
                    alt="dropdown"
                    className="w-3 h-3"
                  />
                </button>
                <AnimatePresence>
                  {isSelectRole && (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      className="w-full z-[1] bg-white absolute top-10 border border-t-transparent rounded-b-lg"
                    >
                      {Role?.map((items, index) => (
                        <div
                          key={index}
                          className=" w-full hover:bg-slate-300 cursor-pointer"
                          onClick={() => {
                            isSelectRoleSet(false);
                            dataUserSet({ ...dataUser, role: items });
                          }}
                        >
                          <p className="px-3 py-1 text-lg font-medium">
                            {items}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </aside>
            <aside>
              <label
                htmlFor=""
                className="block pb-[10px] font-medium text-base md:text-md lg:text-lg"
              >
                Pelajaran
              </label>
              <div className="w-full h-10 flex border rounded-lg items-center  relative cursor-pointer ">
                <div
                  className="grow flex items-center"
                  onClick={() => isSelectPelajaranSet(!isSelectPelajaran)}
                >
                  <p
                    className={`p-3  ${
                      dataUser.pelajaran ? "opacity-100" : "opacity-30"
                    } font-medium text-base md:text-md lg:text-lg`}
                  >
                    {dataUser.pelajaran
                      ? dataUser.pelajaran
                      : "Pilih Pelajaran"}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-10  h-full  bg-slate-300 rounded-r-lg flex justify-center items-center"
                  onClick={() => isSelectPelajaranSet(!isSelectPelajaran)}
                >
                  <Image
                    src={Icons.IconsDropdown}
                    alt="dropdown"
                    className="w-3 h-3"
                  />
                </button>
                <AnimatePresence>
                  {isSelectPelajaran && (
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      className="w-full z-[1] bg-white absolute top-10 border border-t-transparent rounded-b-lg"
                    >
                      {Mapel?.map((items) => (
                        <div
                          key={items}
                          className=" w-full hover:bg-slate-300 cursor-pointer"
                          onClick={() => {
                            isSelectPelajaranSet(false);
                            dataUserSet({ ...dataUser, pelajaran: items });
                          }}
                        >
                          <p
                            key={items}
                            className="px-3 py-1 text-lg font-medium"
                          >
                            {items}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </aside>
            <aside>
              <label htmlFor="" className="block pb-[10px] font-medium text-lg">
                Password
              </label>
              <div className="flex w-full h-[39px] justify-between border border-opacity-30 rounded-lg">
                <input
                  type={isActivePassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  className="shrink  p-2 lg:p-3  placeholder:opacity-40 outline-none rounded-l-lg font-medium text-lg"
                  value={dataUser.password}
                  onChange={(e) => {
                    validateFormEmptySet(false);
                    dataUserSet({ ...dataUser, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="w-[40px] bg-slate-300 rounded-r-lg flex justify-center items-center"
                  onClick={() => isActivePasswordSet(!isActivePassword)}
                >
                  <Image
                    src={Icons.IconsEyesPassword}
                    alt="dropdown"
                    className="w-6 h-6 "
                  />
                </button>
              </div>
            </aside>
            <aside>
              <label htmlFor="" className="block pb-[10px] font-medium text-lg">
                Confirm Password
              </label>
              <div className="flex w-full h-[39px] justify-between border border-opacity-30 rounded-lg">
                <input
                  type={isActiveConfPassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  className="shrink  p-2 lg:p-3  placeholder:opacity-40 outline-none rounded-l-lg font-medium text-lg"
                  value={confPassword}
                  onChange={(e) => {
                    isSamePasswordSet(false);
                    confPasswordSet(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="w-[40px] bg-slate-300 rounded-r-lg flex justify-center items-center"
                  onClick={() => isActiveConfPasswordSet(!isActiveConfPassword)}
                >
                  <Image
                    src={Icons.IconsEyesPassword}
                    alt="dropdown"
                    className="w-6 h-6 "
                  />
                </button>
              </div>
            </aside>
          </section>
          <section className="w-full flex flex-col gap-4 pt-[22px] px-5">
            {isSamePassword && (
              <p className="text-red-500 text-sm">
                Konfirmasi Password Tidak Sesuai
              </p>
            )}
            {validateFormEmpty && (
              <p className="text-red-500 text-sm">Input Tidak Boleh Kosong</p>
            )}
            <button
              type="submit"
              disabled={RegisterAccountPending ? true : false}
              className="w-full bg-sky-700 py-2 font-medium text-white rounded-lg text-lg"
            >
              {RegisterAccountPending ? "Loading..." : "Register"}
            </button>
            <div className="w-full flex justify-center items-center gap-[9.5px]">
              <div className="w-[50px] bg-black h-[1px]"></div>
              <p className="font-medium text-base">OR</p>
              <div className="w-[50px] bg-black h-[1px]"></div>
            </div>
            <div className="w-full">
              <p className="text-center">
                Sudah Punya Akun ?{" "}
                <Link
                  href={"/login"}
                  className="text-sky-400 decoration-sky-400 decoration-1 underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </section>
        </form>
      </article>
    </section>
  );
}
