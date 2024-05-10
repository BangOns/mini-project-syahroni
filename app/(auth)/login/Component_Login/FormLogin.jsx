"use client";
import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Mapel } from "@/app/libs/utils/List_Pelajaran";
import {
  ClearDataRegister,
  LoginUser,
} from "@/app/libs/redux/feature/getUserSlice";
import { toast } from "react-toastify";

export default function FormLogin() {
  const { userLoginPending, userLoginFullField } = useSelector(
    (state) => state.users
  );
  const [users, usersSet] = useState({
    name: "",
    password: "",
  });
  const [pelajaran, pelajaranSet] = useState("");
  const [isError, isErrorSet] = useState(false);
  const [isSelect, isSelectSet] = useState(false);
  const [isSelectPassword, isSelectPasswordSet] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  function handleChange(e) {
    const { name, value } = e.target;
    isErrorSet(false);
    usersSet({
      ...users,
      [name]: value,
    });
  }
  async function SubmitLogin(e) {
    e.preventDefault();
    if (pelajaran === "" || users.name === "" || users.password === "") {
      isErrorSet(true);
    } else {
      isErrorSet(false);
      const user = {
        ...users,
        pelajaran,
      };
      dispatch(LoginUser(user));
    }
  }
  async function handlerSuccessLoginAccount() {
    if (userLoginFullField) {
      if (userLoginFullField.status) {
        router.push("/");
        toast.success(userLoginFullField.message);
      } else {
        toast.error(userLoginFullField.message);
      }
    }
  }
  useEffect(() => {
    handlerSuccessLoginAccount();
  }, [userLoginFullField]);
  return (
    <section className="w-full md:w-[377px] lg:w-[438px] flex-none  ">
      <article className="w-full h-full flex flex-col items-center justify-center ">
        <header className="flex flex-col items-center justify-center gap-10">
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
          onSubmit={SubmitLogin}
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
                placeholder="Masukkan Username"
                type="text"
                name="name"
                value={users.name}
                onChange={handleChange}
                className="w-full h-[39px] p-2 lg:p-3 border border-opacity-30 bg-white placeholder:opacity-40 outline-none rounded-lg font-medium text-base lg:text-lg"
              />
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
                  onClick={() => isSelectSet(!isSelect)}
                >
                  <p
                    className={`p-3  ${
                      pelajaran ? "opacity-100" : "opacity-30"
                    } font-medium text-base md:text-md lg:text-lg`}
                  >
                    {pelajaran ? pelajaran : "Pilih Pelajaran"}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-10  h-full  bg-slate-300 rounded-r-lg flex justify-center items-center"
                  onClick={() => isSelectSet(!isSelect)}
                >
                  <Image
                    src={Icons.IconsDropdown}
                    alt="dropdown"
                    className="w-3 h-3"
                  />
                </button>
                <AnimatePresence>
                  {isSelect && (
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
                        >
                          <p
                            key={items}
                            className="px-3 py-1 text-lg font-medium"
                            onClick={() => {
                              isErrorSet(false);
                              isSelectSet(!isSelect);
                              pelajaranSet(items);
                            }}
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
                  type={isSelectPassword ? "text" : "password"}
                  value={users.password}
                  name="password"
                  placeholder="Masukkan Password"
                  className="shrink  p-2 lg:p-3 bg-white  placeholder:opacity-40 outline-none rounded-l-lg font-medium text-lg"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="w-[40px] bg-slate-300 rounded-r-lg flex justify-center items-center"
                  onClick={() => isSelectPasswordSet(!isSelectPassword)}
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
            {isError && (
              <p className="text-red-500 text-sm">
                Seluruh input tidak boleh kosong
              </p>
            )}
            <button
              disabled={userLoginPending ? true : false}
              type="submit"
              className="w-full bg-sky-700 py-2 font-medium text-white rounded-lg text-lg"
            >
              {userLoginPending ? "Loading..." : "Login"}
            </button>
            <div className="w-full flex justify-center items-center gap-[9.5px]">
              <div className="w-[50px] bg-black h-[1px]"></div>
              <p className="font-medium text-base">OR</p>
              <div className="w-[50px] bg-black h-[1px]"></div>
            </div>
            <div className="w-full flex justify-center gap-2">
              <p className="text-center">Buat Akun ? </p>
              <p
                onClick={() => {
                  router.push("/register");
                  dispatch(ClearDataRegister());
                }}
                className="text-sky-400  decoration-sky-400 decoration-1 underline cursor-pointer"
              >
                Register
              </p>
            </div>
          </section>
        </form>
      </article>
    </section>
  );
}
