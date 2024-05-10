import React from "react";

export default function CardFeedback({ name, createdAt, judul, deskripsi }) {
  return (
    <section className="  md:min-w-[300px] border border-black/80 bg-white rounded-lg h-auto px-3 pt-[19px] ">
      <header className="w-full flex items-center gap-3">
        <div className="">
          <h1 className="text-base font-medium">{name}</h1>
          <p className="text-sm font-medium text-black/50">{createdAt.date}</p>
        </div>
      </header>
      <article className="w-full pt-3 pb-[10px]">
        <h2 className="font-medium pb-[2px]">{judul}</h2>
        <p className="text-sm">{deskripsi}</p>
      </article>
    </section>
  );
}
