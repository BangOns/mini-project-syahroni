import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import { ReduxProvider } from "./libs/redux/provider";
import { cookies } from "next/headers";
export const metadata = {
  title: "MyPresence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <ToastContainer />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
