import { Fragment } from "react";
import FormFeedback from "./Component_LandingPage/FormFeedback";
import MainLandingPage from "./Component_LandingPage/Main_LandingPage";
import { cookies } from "next/headers";
import Navbar from "../Navbar/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function getDataUser() {
  const getKeyInCookies = cookies().get("token").value.split("||");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userId/${getKeyInCookies[0]}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Set-Cookie": cookies().get("token").value,
        },
      }
    );
    return response.json();
  } catch (error) {
    return new Error("Gagal mengambil data user");
  }
}
async function GenerateAI(pelajaran) {
  const GenerateAPIKey = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GENERATE_AI_API
  );
  try {
    const GenerateModel = await GenerateAPIKey.getGenerativeModel({
      model: "gemini-pro",
    });
    const prompt = `Saya adalah seorang pelajar yang sangat tertarik untuk memperluas pemahaman saya di setiap bidang pembelajaran. Apakah Anda bisa memberikan penjelasan lengkap tentang pelajaran ${pelajaran}, termasuk materi yang dicakup dan konsep-konsep inti yang harus saya pahami?`;
    const requestInput = await GenerateModel.generateContent(prompt);
    const responseText = await requestInput.response.text();

    return responseText;
  } catch (error) {
    return new Error(
      "Mohon ada kesalahan menghubungkan API Gemini AI atau ada kesalahan menghubungkan ke internet"
    );
  }
}
export default async function LandingPage() {
  const dataUser = await getDataUser();
  const generateAI = dataUser && (await GenerateAI(dataUser?.data.pelajaran));
  return (
    <Fragment>
      <Navbar />
      <MainLandingPage dataUser={dataUser} generateAI={generateAI} />
      {/* Form Feedback */}
      <FormFeedback dataUser={dataUser} />
    </Fragment>
  );
}