"use client";
import { storage } from "@/app/libs/firebase/init";
import { UpdateUserById } from "@/app/libs/redux/feature/getUserSlice";
import { modalChangePassword } from "@/app/libs/redux/feature/PopModalsSlice";
import { changeProfile } from "@/app/libs/redux/feature/ProfileChangeSlice";
import { Icons } from "@/app/libs/utils/IconsImport";
import { ImageDummies } from "@/app/libs/utils/ImageDummyImport";
import {
  deleteObject,
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function FormChangeProfile({
  nameUser,
  imageProfile,
  idUser,
  pelajaran,
}) {
  const { attributProfile } = useSelector((state) => state?.profileChange);
  const { UpdateUserByIDSPending, UpdateUserByIDSFullField } = useSelector(
    (state) => state?.users
  );
  const dispatch = useDispatch();
  const [isSelectRemovePictureProfile, isSelectRemovePictureProfileSet] =
    useState(false);
  const [loadRemovePicuture, loadRemovePicutureSet] = useState(false);
  const [username, usernameSet] = useState(nameUser || "");
  const [profileImageDisplay, profileImageDisplaySet] = useState(null);
  const [profileImageFile, profileImageFileSet] = useState(null);
  const validateUsername = username === nameUser || username.length <= 0;
  async function handleChangeImageProfile(e) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    profileImageDisplaySet(imageUrl);
    profileImageFileSet(file);
  }
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      if (profileImageFile) {
        const storageRef = refStorage(storage, `/${pelajaran}/${username}.png`);
        await uploadBytes(storageRef, profileImageFile);
        const url = await getDownloadURL(storageRef);
        const UpdateUser = {
          id: idUser,
          name: username,
          imageProfile: url,
          password: attributProfile.password,
        };
        handleSubmitFinal(UpdateUser);
      } else {
        const UpdateUser = {
          id: idUser,
          name: username,
          imageProfile: "",
          password: attributProfile.password,
        };
        handleSubmitFinal(UpdateUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(changeProfile({ props: "password", value: "" }));
    }
  }
  function DeleteProfilePicture() {
    loadRemovePicutureSet(true);
    try {
      const storageRef = refStorage(storage, `/${pelajaran}/${username}.png`);
      deleteObject(storageRef).then(() => {
        const UpdateUser = {
          id: idUser,
          name: username,
          imageProfile: "hapus",
          password: attributProfile.password,
        };
        handleSubmitFinal(UpdateUser);
        toast.success("Profile picture deleted successfully");
        isSelectRemovePictureProfileSet(false);
      });
    } catch (error) {
      console.log(error);
    } finally {
      loadRemovePicutureSet(false);
    }
  }
  function handleSubmitFinal(data) {
    dispatch(UpdateUserById(data));
  }
  useEffect(() => {
    if (UpdateUserByIDSFullField)
      toast.success(UpdateUserByIDSFullField.message);
  }, [UpdateUserByIDSFullField]);
  return (
    <form
      onSubmit={HandleSubmit}
      className="w-full flex flex-col  gap-[50px] lg:gap-0 lg:flex-row justify-between"
    >
      <figure className="w-full lg:w-1/2 flex flex-col  md:flex-row gap-[34px] items-center lg:items-start">
        <div className="w-[150px] h-[150px] rounded-full border border-blue-500 overflow-hidden">
          <Image
            src={
              profileImageDisplay
                ? profileImageDisplay
                : imageProfile
                ? imageProfile
                : ImageDummies.ImageDummy
            }
            width={150}
            height={150}
            alt="profile"
            className="w-full h-full rounded-full"
          />
        </div>
        <figcaption className="flex items-center gap-[10px] md:block relative">
          {/* Modals Validate Remove Foto Profile */}
          <div
            className={`w-[300px] min-h-[150px] px-3 ${
              isSelectRemovePictureProfile ? "flex" : "hidden"
            } flex-col items-center gap-5 justify-center absolute bg-white rounded border-slate-300`}
          >
            <p className="text-center font-medium">
              Apakah kamu yakin ingin menghapus gambar profil ini?
            </p>
            <div className="w-full flex justify-center gap-3">
              <button
                type="button"
                className="text-white px-2 py-1 rounded bg-red-500"
                onClick={DeleteProfilePicture}
              >
                {loadRemovePicuture ? "Loading..." : "Ya Hapus"}
              </button>
              <button
                type="button"
                className="text-white px-2 py-1 rounded bg-slate-500"
                onClick={() => isSelectRemovePictureProfileSet(false)}
              >
                Tidak
              </button>
            </div>
          </div>
          {/* Validate Change Foto Profile */}
          <input
            type="file"
            id="imageProfile"
            className="hidden"
            accept="image/*"
            onChange={handleChangeImageProfile}
          />
          <button
            type="button"
            className="min-w-[130px] py-[10px] px-[9px] flex items-center gap-[11px] text-green-500 border border-green-500 rounded-lg font-semibold md:mb-[21px]"
            onClick={() => document.getElementById("imageProfile").click()}
          >
            <Image src={Icons.IconsChangeImage} alt="change image" />
            Ubah
          </button>
          <button
            type="button"
            disabled={imageProfile ? false : true}
            className="min-w-[130px]  py-[10px] px-[9px] disabled:opacity-50 disabled:cursor-default flex items-center gap-[11px] text-red-500 border border-red-500 rounded-lg font-semibold"
            onClick={() => isSelectRemovePictureProfileSet(true)}
          >
            <Image src={Icons.IconsTrash} alt="remove image" />
            Hapus
          </button>
        </figcaption>
      </figure>
      <section className="w-full md:w-4/5 lg:w-1/2">
        <div className="w-full mb-6">
          <label htmlFor="" className=" block font-semibold text-xl pb-2">
            Username
          </label>
          <input
            type="text"
            className="w-full h-[41px] md:h-[51px] rounded-lg outline-none border border-black py-[11px] px-5 text-xl font-semibold bg-white  placeholder:text-black/20"
            placeholder="Edit username"
            value={username}
            onChange={(e) => usernameSet(e.target.value)}
          />
        </div>
        <div className="w-full flex max-sm:justify-center sm:justify-start lg:justify-end gap-3">
          <button
            type="button"
            className="py-2 px-3 md:py-[11px] md:px-[22px] font-semibold bg-slate-500 rounded text-white max-sm:text-xs"
            onClick={() => dispatch(modalChangePassword(true))}
          >
            Change Password
          </button>
          <button
            type="submit"
            className="py-1 px-3 md:py-[11px] md:px-[22px] font-semibold bg-blue-500 rounded text-white max-sm:text-sm disabled:opacity-80"
            disabled={
              validateUsername &&
              !attributProfile.password &&
              !profileImageDisplay
                ? true
                : false
            }
          >
            {UpdateUserByIDSPending ? "Loading" : "Update"}
          </button>
        </div>
      </section>
    </form>
  );
}
