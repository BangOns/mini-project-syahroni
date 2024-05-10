"use client";
import { modalsFeedbackState } from "@/app/libs/redux/feature/PopModalsSlice";
import { Icons } from "@/app/libs/utils/IconsImport";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import { useDispatch } from "react-redux";

export default function MainLandingPage({ dataUser, generateAI }) {
  const dispatch = useDispatch();
  return (
    <article className=" lg:pl-[calc(251px+62px)] px-7 md:px-[62px] w-full pt-12    ">
      <section className="w-full pb-10 lg:pb-20 flex justify-between gap-6 lg:gap-0 flex-wrap lg:flex-nowrap">
        <header className="max-w-md">
          <h1 className=" text-3xl lg:text-[40px] font-medium ">
            Hello, {dataUser ? dataUser?.data?.name : "Null"}
          </h1>
          <h2 className="text-xl opacity-60 py-6 ">
            Terima kasih sudah absen hari ini !
          </h2>
          <hr className="bg-black h-[2px] w-11/12" />
        </header>
        <section className=" max-w-[350px] md:max-w-[390px] lg:max-w-[463px] h-auto bg-blue-300 rounded-lg flex ">
          <div className="pt-[26px] pl-4 md:pl-[21px] mb-[21px] ">
            <h1 className="font-semibold text-lg md:text-xl lg:text-2xl pb-[15px]">
              Berikan Feedback Terbaik kepada Dosen!
            </h1>
            <button
              type="button"
              className="px-[13px] py-[7px] text-sm md:text-base   text-white  bg-blue-800 rounded-[4px]"
              onClick={() => dispatch(modalsFeedbackState(true))}
            >
              Feedback
            </button>
          </div>
          <figure className="grow w-3/5 md:w-1/2  h-[140px]">
            <Image src={Icons.IconsFeedback} alt="feedback" />
          </figure>
        </section>
      </section>
      <section>
        <header className="w-full ">
          <h1 className="text-2xl font-medium pb-3">
            Pelajari Materi Dibawah ini!
          </h1>
          <hr className="h-[2px] bg-black opacity-20" />
        </header>
        <article className="pt-3 pr-5">
          <Markdown
            components={{
              li(props) {
                const { node, ...rest } = props;
                return <li className="my-2" {...rest} />;
              },
            }}
          >
            {generateAI}
          </Markdown>
        </article>
      </section>
    </article>
  );
}
