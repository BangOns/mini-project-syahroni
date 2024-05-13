"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/app/libs/utils/IconsImport";
import { ImageDummies } from "@/app/libs/utils/ImageDummyImport";
import ButtonLogout from "./ButtonLogout";

export default function LayoutNavbar({ children, imageProfile, name }) {
  const [menuBar, menuBarSet] = useState(false);
  const [menuOptions, menuOptionsSet] = useState(false);

  return (
    <Fragment>
      {/* Menu bar */}
      <motion.aside
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className=" cursor-pointer lg:hidden  max-w-xs h-5 fixed top-14 md:top-2 flex flex-col justify-around right-7 md:right-[62px]"
        onClick={() => menuBarSet(true)}
      >
        <div className="w-5 h-[3px] bg-black "></div>
        <div className="w-5 h-[3px] bg-black "></div>
        <div className="w-5 h-[3px] bg-black "></div>
      </motion.aside>
      <div
        className={`${
          menuBar ? "block" : "hidden"
        }  w-screen h-screen absolute z-[5] bg-slate-400/60`}
      ></div>

      {/* Navbar */}
      <aside
        className={` ${
          menuBar ? "translate-x-0 z-10" : "-translate-x-full"
        } transition lg:translate-x-0 w-[251px] min-h-full fixed bg-cyan-600 px-[22px]`}
      >
        <Image
          src={Icons.IconsClose}
          alt="close"
          className={`${
            menuBar ? "block" : "hidden"
          } absolute right-4 top-3 w-8 h-8 cursor-pointer text-white`}
          onClick={() => menuBarSet(false)}
        />
        <div className="pt-[50px] flex flex-col gap-[50px]">
          <header className="w-full">
            <h1 className=" lg:text-center text-white text-xl lg:text-3xl font-bold">
              ATTENDANCE
            </h1>
          </header>
          <figure className="w-full flex gap-[10px]">
            <Image
              src={imageProfile ? imageProfile : ImageDummies.ImageDummy}
              alt="imgUser"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-[25px] bg-white"
            />
            <figcaption className="flex shrink w-full items-start  justify-between relative">
              <div>
                <p className="text-white text-base font-semibold pb-[13px]">
                  {name}
                </p>
                <div className="flex w-full items-center gap-2">
                  <div className="w-[9px] h-[9px] bg-green-400 rounded-full"></div>
                  <p className="text-white text-base font-medium">Online</p>
                </div>
              </div>
              <div
                className="flex gap-1 pt-2 cursor-pointer"
                onClick={() => menuOptionsSet(true)}
              >
                <div className="w-[8px] h-[8px] rounded-full bg-slate-200"></div>
                <div className="w-[8px] h-[8px] rounded-full bg-slate-200"></div>
                <div className="w-[8px] h-[8px] rounded-full bg-slate-200"></div>
              </div>
            </figcaption>
          </figure>
          <section>{children}</section>
        </div>
      </aside>
      {/*  Option Profile */}
      <section
        className={`w-screen h-screen absolute top-0 left-0 bg-slate-200/30 z-10 ${
          menuOptions ? "block" : "hidden"
        }   `}
        onClick={() => menuOptionsSet(false)}
      >
        <aside className="w-[350px] h-screen relative">
          <ButtonLogout />
        </aside>
      </section>
    </Fragment>
  );
}
