"use client";
import { modalChangePassword } from "@/app/libs/redux/feature/PopModalsSlice";
import { changeProfile } from "@/app/libs/redux/feature/ProfileChangeSlice";
import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import bcryptjs from "bcryptjs";
export default function ModalChangePassword({ passwordUser }) {
  const { ModalChangePasswordsActive } = useSelector((state) => state?.modals);
  const dispatch = useDispatch();
  const [password, passwordSet] = useState("");
  const [passwordNew, passwordNewSet] = useState("");
  const [isActivePassword, isActivePasswordSet] = useState(false);
  const [isActiveConfPassword, isActiveConfPasswordSet] = useState(false);
  function UpdatePassword(e) {
    e.preventDefault();
    if (bcryptjs.compareSync(password, passwordUser)) {
      dispatch(modalChangePassword(false));
      dispatch(changeProfile({ props: "password", value: passwordNew }));
      passwordNewSet("");
      passwordSet("");
    } else toast.error("Password lama tidak sesuai");
  }

  return (
    <Fragment>
      {ModalChangePasswordsActive && (
        <div
          className={` flex w-screen h-screen absolute bg-black/30 top-0 left-0  justify-center items-center`}
        >
          <article className=" w-full min-h-full md:w-[540px] md:min-h-[260px] bg-white">
            <header className="flex px-5 h-[50px] border-b-[1px] border-b-black/20 justify-between items-center">
              <h1 className="text-lg font-medium">Ubah Password</h1>
              <Image
                src={Icons.IconsCloseBlack}
                alt="close"
                className="w-5 h-5 cursor-pointer"
                onClick={() => dispatch(modalChangePassword(false))}
              />
            </header>
            <form className="w-full px-5 pt-2 " onSubmit={UpdatePassword}>
              <section className="w-full md:max-w-[437px] pb-5">
                <label
                  htmlFor=""
                  className="block font-medium text-base pb-[9px]"
                >
                  Password Lama
                </label>
                <div className="w-full border border-black/30 rounded h-[40px] md:h-[31px] flex items-center">
                  <input
                    type={isActivePassword ? "text" : "password"}
                    className="shrink w-full outline-none px-2 py-[6px] h-full font-medium bg-white "
                    placeholder="Masukkan Password Lama"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => passwordSet(e.target.value)}
                  />
                  <button
                    type="button"
                    className="w-[31px] h-full bg-slate-300 rounded-r flex justify-center items-center"
                    onClick={() => isActivePasswordSet(!isActivePassword)}
                  >
                    <Image
                      src={Icons.IconsEyesPassword}
                      alt="dropdown"
                      className="w-7 h-6 "
                    />
                  </button>
                </div>
              </section>

              <section className="w-full md:max-w-[437px]">
                <label
                  htmlFor=""
                  className="block font-medium text-base pb-[9px]"
                >
                  Password Baru
                </label>
                <div className="w-full border border-black/30 rounded h-[40px] md:h-[31px] flex items-center">
                  <input
                    type={isActiveConfPassword ? "text" : "password"}
                    className="shrink w-full outline-none px-2 h-full font-medium bg-white "
                    placeholder="Masukkan Password Baru"
                    autoComplete="off"
                    required
                    value={passwordNew}
                    onChange={(e) => passwordNewSet(e.target.value)}
                  />
                  <button
                    type="button"
                    className="w-[31px] h-full bg-slate-300 rounded-r flex justify-center items-center"
                    onClick={() =>
                      isActiveConfPasswordSet(!isActiveConfPassword)
                    }
                  >
                    <Image
                      src={Icons.IconsEyesPassword}
                      alt="dropdown"
                      className="w-7 h-6 "
                    />
                  </button>
                </div>
              </section>
              <div className="w-full md:max-w-[437px] flex justify-end gap-[10px] pt-5 mb-[13px]">
                <button
                  type="button"
                  className="py-[7px] px-[15px] bg-slate-500 rounded text-white"
                  onClick={() => {
                    dispatch(modalChangePassword(false));
                  }}
                >
                  Cancel
                </button>
                <button className="py-[7px] px-[15px] bg-blue-500 rounded text-white">
                  Update
                </button>
              </div>
            </form>
          </article>
        </div>
      )}
    </Fragment>
  );
}
