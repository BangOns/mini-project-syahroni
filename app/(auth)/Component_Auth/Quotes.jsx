"use client";
import React, { useEffect, useState } from "react";
import BubbleAnimate from "./BubbleAnimate";

export default function Quotes() {
  const [count, countSet] = useState(0);
  const ListQuotes = [
    {
      pengarang: "Dalaila Lama",
      deskripsi: "The purpose of our lives is to be happy.",
    },
    {
      pengarang: "Anonymous",
      deskripsi:
        "Setiap detik sangatlah berharga karena waktu mengetahui banyak hal, termasuk rahasia hati",
    },
    {
      pengarang: "Anonymous",
      deskripsi:
        "Setiap langkah sangatlah berharga karena langkahmu dapat mengetahui banyak hal, termasuk rahasia hati",
    },
  ];
  useEffect(() => {
    const setTimeOut = setTimeout(() => {
      countSet((prev) => (prev += 1));
    }, [5000]);
    if (count >= ListQuotes.length - 1) {
      countSet(0);
    }
    return () => clearTimeout(setTimeOut);
  }, [count]);
  return (
    <section className="shrink flex max-sm:hidden  justify-center  w-full h-screen bg-sky-700 relative overflow-y-hidden">
      <BubbleAnimate />
      <article className="max-w-2xl h-auto self-center ">
        <div className="w-full px-10 transition">
          <p className="md:text-xl lg:text-2xl  text-center text-white font-normal ">
            "{ListQuotes[count].deskripsi}"
          </p>
          <p className="text-2xl pt-9 text-center text-white font-normal">
            {ListQuotes[count].pengarang}
          </p>
        </div>
      </article>
    </section>
  );
}
