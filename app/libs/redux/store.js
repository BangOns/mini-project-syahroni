import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./feature/getUserSlice";
import PopModalsReducer from "./feature/PopModalsSlice";
import FeedbackReducer from "./feature/FeedbackSlice";
import ProfileChangeReducer from "./feature/ProfileChangeSlice";
import GeneateAIReducer from "./feature/GeneateAISlice";

export const store = configureStore({
  reducer: {
    users: UserSliceReducer,
    modals: PopModalsReducer,
    feedbacks: FeedbackReducer,
    profileChange: ProfileChangeReducer,
    aiGenerate: GeneateAIReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
