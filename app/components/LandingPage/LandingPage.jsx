import { Fragment } from "react";
import FormFeedback from "./Component_LandingPage/FormFeedback";
import MainLandingPage from "./Component_LandingPage/Main_LandingPage";
import { cookies } from "next/headers";
import Navbar from "../Navbar/Navbar";
import { retrieveDataById } from "@/app/libs/firebase/services";

async function getDataUser() {
  const getCookies = cookies().get("token");
  try {
    if (getCookies) {
      const getKeyInCookies = cookies().get("token").value.split("||");
      const response = await retrieveDataById(
        getKeyInCookies[2],
        getKeyInCookies[0]
      );
      return response;
    }
  } catch (error) {
    return new Error("Gagal mengambil data user");
  }
}

export default async function LandingPage() {
  const response = await getDataUser();
  return (
    <Fragment>
      <Navbar />
      <MainLandingPage dataUser={response} />
      {/* Form Feedback */}
      <FormFeedback dataUser={response} />
    </Fragment>
  );
}
