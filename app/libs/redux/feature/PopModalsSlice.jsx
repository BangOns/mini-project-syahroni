import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ModalsFeedback: false,

  // Table Kehadiran
  Button_FilterKehadiranMhasiswa: false,
  FilterKehadiranMhasiswa: false,
  // Modal Tabel detail Kehadiran
  ModalTableKehadiranDetailMahasiswa: false,
  getIDMahasiswa: "",

  //  Modal Password
  ModalChangePasswordsActive: false,
};

export const PopModalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    modalsFeedbackState: (state, action) => {
      state.ModalsFeedback = action.payload;
    },
    actionButtonFilterKehadiranMhasiswa: (state, action) => {
      state.Button_FilterKehadiranMhasiswa = action.payload;
    },
    ModalTableKehadiranDetailMahasiswaState: (state, action) => {
      state.ModalTableKehadiranDetailMahasiswa = action.payload;
    },
    getIDMahasiswaState: (state, action) => {
      state.getIDMahasiswa = action.payload;
    },
    modalChangePassword: (state, action) => {
      state.ModalChangePasswordsActive = action.payload;
    },
  },
});

export const {
  modalsFeedbackState,
  actionButtonFilterKehadiranMhasiswa,
  ModalTableKehadiranDetailMahasiswaState,
  getIDMahasiswaState,
  modalChangePassword,
} = PopModalsSlice.actions;
export default PopModalsSlice.reducer;
