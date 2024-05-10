import { showFormattedDate } from "../utils/FormatDate";
import { app } from "./init";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import bcryptjs from "bcryptjs";
import { Icons } from "../utils/IconsImport";
const firestore = getFirestore(app);

export async function retrieveData(collect) {
  const q = await getDocs(collection(firestore, collect));
  const data = q.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return data;
}

export async function deleteUserById(collect, id) {
  await deleteDoc(doc(firestore, collect, id));
  await filterDataRoleMahasiswa(collect);
  return {
    message: "User berhasil di hapus",
  };
}

export async function login(data, callback) {
  let generateDate = showFormattedDate(new Date());
  let dateNew = {
    date: generateDate,
    isAbsen: true,
    times: `${new Date().getHours()}:${new Date().getMinutes()}`,
  };
  const q = collection(firestore, data.pelajaran);
  const checkUser = query(q, where("name", "==", data.name));
  const snapShot = await getDocs(checkUser);
  const user = snapShot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  const checkPassword =
    user.length !== 0
      ? bcryptjs.compareSync(data.password, user[0].password)
      : false;

  if (user.length !== 0 && checkPassword && user[0].role === "Mahasiswa") {
    const updateUser = doc(firestore, data.pelajaran, user[0].id);
    let checkPrecence = user[0].precence.filter((value) => {
      return (
        value.date.toLocaleLowerCase() === generateDate.toLocaleLowerCase()
      );
    });

    if (checkPrecence.length === 0) {
      user[0].dateNow = dateNew;
      user[0].precence = [...user[0].precence, dateNew];
      const newuser = user[0];
      await updateDoc(updateUser, newuser);
    }

    return callback({
      status: true,
      data: user[0],
      statusCode: 200,
      message: "Selamat anda sudah login",
    });
  } else if (user.length !== 0 && checkPassword && user[0].role === "Dosen") {
    return callback({
      status: true,
      data: user[0],
      statusCode: 200,
      message: "Selamat Datang Dosen " + user[0].name + " anda sudah login",
    });
  } else {
    return callback({
      status: false,
      statusCode: 500,
      message: "Nama atau Password salah",
    });
  }
}

export async function RegisterUser(data, callback) {
  let generateDate = showFormattedDate(new Date());
  let dateNew = {
    date: generateDate,
    times: `${new Date().getHours()}:${new Date().getMinutes()}`,
    isAbsen: true,
  };
  const keyPassword = await bcryptjs.hash(data.password, 10);

  let newUser = {
    ...data,
    password: keyPassword,
    imageProfile: "",
  };
  if (data.role === "Mahasiswa") newUser.precence = [dateNew];
  try {
    await addDoc(collection(firestore, data.pelajaran), newUser);
    return callback({
      status: true,
      data,
      statusCode: 200,
      message: "Selamat akun anda telah berhasil dibuat",
    });
  } catch (error) {
    return callback({
      status: false,
      statusCode: 500,
      message: "Mohon maaf ada kesalahan saat anda mendaftarkan akun",
    });
  }
}
export async function retrieveDataById(collect, id) {
  const getUsers = await getDoc(doc(firestore, collect, id));
  if (getUsers.exists()) {
    return getUsers.data();
  } else {
    return null;
  }
}

export async function FeedbackUpload(data, callback) {
  let generateDate = showFormattedDate(new Date());
  let dateNew = {
    date: generateDate,
    times: `${new Date().getHours()}:${new Date().getMinutes()}`,
  };
  let FeedbackDataFull = {
    ...data,
    createdAt: dateNew,
  };
  try {
    await addDoc(collection(firestore, "feedback"), FeedbackDataFull);
    return callback({
      status: true,
      statusCode: 200,
      message: "Terima kasih atas Feedback anda",
    });
  } catch (error) {
    return callback({
      status: false,
      statusCode: 400,
      message: "Maaf Feedback anda gagal dikirim, silahkan coba lagi",
    });
  }
}

export async function filterDataRoleMahasiswa(collect) {
  const data = await retrieveData(collect);
  let generateDate = showFormattedDate(new Date());

  const filterRoleMahasiswa = data.filter((value) => {
    return value.role === "Mahasiswa";
  });
  const filterMahasiswaHadir = filterRoleMahasiswa.filter((value) => {
    return value?.precence.find((value) => {
      return value.date.toLowerCase() === generateDate.toLowerCase();
    });
  });
  const filterMahasiswaTidakHadir = filterRoleMahasiswa.filter((value) => {
    return value?.dateNow?.date.toLowerCase() !== generateDate.toLowerCase();
  });
  const ListDataCard = [
    {
      Title: "Jumlah Mahasiswa",
      Value: filterRoleMahasiswa.length,
      Icon: Icons.IconsJumlahMahasiswa,
      BgColor: "bg-indigo-400",
    },
    {
      Title: "Sudah Absen",
      Value: filterMahasiswaHadir.length,
      Icon: Icons.IconsSudahAbsen,
      BgColor: "bg-green-500",
    },
    {
      Title: "Belum Absen",
      Value: filterMahasiswaTidakHadir.length,
      Icon: Icons.IconsBelumAbsen,
      BgColor: "bg-red-500",
    },
    {
      Title: "Tanggal Hari ini",
      Value: generateDate,
      Icon: Icons.IconsCalendar,
      BgColor: "bg-slate-300",
      FontSize: "text-xs",
    },
  ];
  return { ListDataCard, filterRoleMahasiswa, filterMahasiswaHadir };
}
export async function retrieveDataFeedback(callback) {
  try {
    const q = await getDocs(collection(firestore, "feedback"));
    const data = q.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return callback({
      status: 200,
      data,
    });
  } catch (error) {
    return callback({
      status: 400,
      message: "data tidak ditemukan",
    });
  }
}

export async function updateUserPrecence(collect, data, callback) {
  const getUsers = await getDoc(doc(firestore, collect, data.id));
  const users = {
    id: getUsers.id,
    ...getUsers.data(),
  };
  const updateUser = doc(firestore, collect, users.id);
  if (data.imageProfile !== "hapus") {
    users.imageProfile = data.imageProfile;
  } else {
    users.imageProfile = "";
  }
  if (data.password) {
    const keyPassword = await bcryptjs.hash(data.password, 10);
    users.password = keyPassword;
  }
  users.name =
    data.name === users.name || data.name === "" ? users.name : data.name;

  const updatesUser = users;
  await updateDoc(updateUser, updatesUser);
  await retrieveDataById(collect, updatesUser.id);
  return callback({
    status: 200,
    message: "Selamat anda telah mengubah akun anda",
    data: true,
  });
}
