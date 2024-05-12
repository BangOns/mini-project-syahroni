"use client";
export default function Error({ error, reset }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-5xl text-red-500 font-semibold">
        Error! Someting wrong error
      </h1>
      <button type="button" className="rounded py-3 px-4 text-xl">
        Reset
      </button>
    </div>
  );
}
