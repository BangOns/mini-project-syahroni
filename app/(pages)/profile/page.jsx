import { Fragment } from "react";
import TableKehadiranMahasiswa from "./Component_Profile/TableKehadiranMahasiswa";
import Feedback from "./Component_Profile/Feedback/Feedback";
import FormChangeProfile from "./Component_Profile/FormChangeProfile";
import ModalChangePassword from "./Component_Profile/ModalChangePassword";
import HeaderProfile from "./Component_Profile/HeaderProfile";
import {
  retrieveDataById,
  retrieveDataFeedback,
} from "@/app/libs/firebase/services";
import { cookies } from "next/headers";

export default async function Profile() {
  const getCollectionWithCookies = cookies().get("token")?.value.split("||")[2];
  const getIDWithCookies = cookies().get("token")?.value.split("||")[0];
  const data = await retrieveDataById(
    getCollectionWithCookies,
    getIDWithCookies
  );
  const dataFeedback = await retrieveDataFeedback((value) => value);
  return (
    <Fragment>
      {/* Header */}
      <HeaderProfile />
      {/* Form Change Profile */}
      <FormChangeProfile
        usernames={data.name}
        idUser={data.id}
        imageProfile={data.imageProfile}
      />
      {/* Fitur Khusus */}
      {data.role === "Dosen" ? (
        <Feedback dataFeedback={dataFeedback.data} pelajaran={data.pelajaran} />
      ) : (
        <TableKehadiranMahasiswa
          pelajaran={data.pelajaran}
          kehadiran={data.precence}
        />
      )}

      {/* Form Change Password */}
      <ModalChangePassword passwordUser={data.password} />
    </Fragment>
  );
}
