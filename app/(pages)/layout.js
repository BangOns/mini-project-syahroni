import { Fragment } from "react";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <Navbar />
      <article className=" lg:pl-[calc(251px+62px)] px-7 md:px-[62px] w-full pt-12 bg-slate-50 overflow-x-hidden  h-full ">
        {children}
      </article>
    </Fragment>
  );
}
