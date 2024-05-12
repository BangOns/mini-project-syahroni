import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "./libs/redux/provider";
export const metadata = {
  title: "Atendance",
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
