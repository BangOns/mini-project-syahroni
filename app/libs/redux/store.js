import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./feature/getUserSlice";
import PopModalsReducer from "./feature/PopModalsSlice";
import FeedbackReducer from "./feature/FeedbackSlice";
import ProfileChangeReducer from "./feature/ProfileChangeSlice";

export const store = configureStore({
  reducer: {
    users: UserSliceReducer,
    modals: PopModalsReducer,
    feedbacks: FeedbackReducer,
    profileChange: ProfileChangeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
