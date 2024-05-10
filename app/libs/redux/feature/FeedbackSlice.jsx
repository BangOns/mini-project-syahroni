const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  // Get All Feedback
  AllFeedbackDosen: [],
  AllFeedbackDosenPending: false,
  //Feedback Upload
  FeedbackUploadDone: {},
  FeedbackUploadPending: false,
};

export const UploadFeedback = createAsyncThunk(
  "feedback/upload",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Akun anda tidak ditemukan");
    }
  }
);
export const GetAllFeedback = createAsyncThunk(
  "feedback/all",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "GET",
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Akun anda tidak ditemukan");
    }
  }
);

const FeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(UploadFeedback.fulfilled, (state, action) => {
        state.FeedbackUploadDone = action.payload;
        state.FeedbackUploadPending = false;
      })
      .addCase(UploadFeedback.pending, (state) => {
        state.FeedbackUploadPending = true;
      })
      .addCase(UploadFeedback.rejected, (state) => {
        state.FeedbackUploadPending = false;
      });
    builder
      .addCase(GetAllFeedback.fulfilled, (state, action) => {
        state.AllFeedbackDosen = action.payload;
        state.AllFeedbackDosenPending = false;
      })
      .addCase(GetAllFeedback.pending, (state) => {
        state.AllFeedbackDosenPending = true;
      })
      .addCase(GetAllFeedback.rejected, (state) => {
        state.AllFeedbackDosenPending = false;
      });
  },
});

export default FeedbackSlice.reducer;
