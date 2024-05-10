"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/app/libs/utils/IconsImport";
import { Ekspresi } from "@/app/libs/utils/List_Ekspresi";
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
        name: dataUser?.data.name,
        pelajaran: dataUser?.data.pelajaran,
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
              className="w-full h-[40px] rounded py-[11px] px-[10px] border border-black/25 outline-none"
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
              className="w-full h-[90px] rounded py-[11px] px-[10px] border border-black/25 outline-none"
            />
          </section>
          {/* <section className="w-1/2 pt-[10px]">
            <label
              htmlFor="ekspresi"
              className="block font-medium text-base pb-1"
            >
              Ekspresi *
            </label>
            <div className="w-full h-[40px] flex border rounded-[4px] items-center  relative cursor-pointer ">
              <div
                className="grow flex items-center"
                onClick={() => isSelectSet(!isSelect)}
              >
                <p
                  className={`p-3  ${
                    ekspresi ? "opacity-100" : "opacity-30"
                  } font-medium text-base md:text-md lg:text-lg`}
                >
                  {ekspresi ? ekspresi : "Ekspresi"}
                </p>
              </div>
              <button
                type="button"
                className="w-[30px]  h-full  bg-slate-300 rounded-r-[4px] flex justify-center items-center"
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
                    className="w-full z-[1] bg-white absolute top-10 border border-t-transparent rounded-b-[4px]"
                  >
                    {Ekspresi?.map((items) => (
                      <div
                        key={items}
                        className=" w-full hover:bg-slate-300 cursor-pointer"
                        onClick={() => {
                          isSelectSet(false);
                          ekspresiSet(items);
                        }}
                      >
                        <p
                          key={items}
                          className="px-3 py-1 text-base font-medium"
                        >
                          {items}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section> */}
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
