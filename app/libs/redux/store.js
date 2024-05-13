import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./feature/getUserSlice";
import PopModalsReducer from "./feature/PopModalsSlice";
import FeedbackReducer from "./feature/FeedbackSlice";
import ProfileChangeReducer from "./feature/ProfileChangeSlice";
import GenerateAIReducer from "./feature/GenerateAISlice";

export const store = configureStore({
  reducer: {
    users: UserSliceReducer,
    modals: PopModalsReducer,
    feedbacks: FeedbackReducer,
    profileChange: ProfileChangeReducer,
    aiGenerate: GenerateAIReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
