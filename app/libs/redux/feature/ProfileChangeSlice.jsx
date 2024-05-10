import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributProfile: {
    imageProfile: "",
    name: "",
    password: "",
  },
};

const ProfileChangeSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    changeProfile: (state, action) => {
      state.attributProfile = {
        ...state.attributProfile,
        [action.payload.props]: action.payload.value,
      };
    },
  },
});

export const { changeProfile } = ProfileChangeSlice.actions;

export default ProfileChangeSlice.reducer;
