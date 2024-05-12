"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icons } from "@/app/libs/utils/IconsImport";
import { useDispatch, useSelector } from "react-redux";
import { modalsFeedbackState } from "@/app/libs/redux/feature/PopModalsSlice";
import { UploadFeedback } from "@/app/libs/redux/feature/FeedbackSlice";
import { toast } from "react-toastify";
export default function FormFeedback({ dataUser }) {
  const { ModalsFeedback } = useSelector((state) => state.modals);
  const { FeedbackUploadDone, FeedbackUploadPending } = useSelector(
    (state) => state?.feedbacks
  );

  const [dataFeedback, dataFeedbackSet] = useState({
    judul: "",
    deskripsi: "",
  });
  const [isErrorFeedback, isErrorFeedbackSet] = useState(false);
  const dispatch = useDispatch();
  function handleChange(e) {
    const { name, value } = e.target;
    dataFeedbackSet({
      ...dataFeedback,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!dataFeedback.judul || !dataFeedback.deskripsi) {
      isErrorFeedbackSet(true);
    } else {
      const feedbackUser = {
        ...dataFeedback,
        name: dataUser?.name,
        pelajaran: dataUser?.pelajaran,
      };
      dispatch(UploadFeedback(feedbackUser));
      isErrorFeedbackSet(false);
    }
  }
  function handleCloseModalsFeedback() {
    dispatch(modalsFeedbackState(false));
    dataFeedbackSet({
      judul: "",
      deskripsi: "",
    });
  }

  function handlerSuccessUploadFeedback() {
    if (FeedbackUploadDone) {
      if (FeedbackUploadDone.status) {
        handleCloseModalsFeedback();
        toast.success(FeedbackUploadDone.message);
      } else {
        toast.error(FeedbackUploadDone.message);
      }
    }
  }

  useEffect(() => {
    handlerSuccessUploadFeedback();
  }, [FeedbackUploadDone]);

  return (
    <aside
      className={` ${
        ModalsFeedback ? "flex" : "hidden"
      }  w-screen h-screen overflow-x-hidden top-0 left-0 bg-slate-200/30  justify-center items-center fixed `}
    >
      <section className="w-full h-full md:w-[438px] md:h-[400px] bg-white rounded-lg shadow">
        <header className="flex px-5 h-[50px] border-b-[1px] border-b-black/20 justify-between items-center">
          <h1 className="text-lg font-medium">Buat Feedback!</h1>
          <Image
            src={Icons.IconsCloseBlack}
            alt="close"
            className="w-5 h-5 cursor-pointer"
            onClick={handleCloseModalsFeedback}
          />
        </header>
        <form className="pt-3 px-5" onSubmit={handleSubmit}>
          <section className="w-full">
            <label htmlFor="judul" className="block font-medium text-base pb-1">
              Judul
            </label>
            <input
              type="text"
              name="judul"
              id="judul"
              value={dataFeedback.judul}
              onChange={handleChange}
              placeholder="Masukkan Judul"
              className="w-full h-[40px] bg-white  rounded py-[11px] px-[10px] border border-black/25 outline-none"
            />
          </section>
          <section className="w-full pt-[10px]">
            <label
              htmlFor="deskripsi"
              className="block font-medium text-base pb-1"
            >
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              value={dataFeedback.deskripsi}
              onChange={handleChange}
              placeholder="Masukkan Deskripsi"
              className="w-full h-[90px] bg-white  rounded py-[11px] px-[10px] border border-black/25 outline-none"
            />
          </section>

          <section className="w-full flex flex-col items-end justify-center pt-[16px] ">
            {isErrorFeedback && (
              <p className="text-xs text-red-500 pb-3">
                Input tidak boleh kosong
              </p>
            )}
            <button
              type="submit"
              disabled={FeedbackUploadPending ? true : false}
              className="px-[13px] py-[7px] text-sm md:text-base   text-white  bg-blue-800 rounded-[4px]"
            >
              {FeedbackUploadPending ? "Loading..." : "Feedback"}
            </button>
          </section>
        </form>
      </section>
    </aside>
  );
}
