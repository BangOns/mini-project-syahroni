const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  textAI: "",
};

export const GenerateAI = createAsyncThunk(
  "ai/get",
  async (pelajaran, thunkAPI) => {
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
      return thunkAPI.fulfillWithValue(responseText);
    } catch (error) {
      return new Error(
        "Mohon ada kesalahan menghubungkan API Gemini AI atau ada kesalahan menghubungkan ke internet"
      );
    }
  }
);

const GenerateAISlice = createSlice({
  name: "ai",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GenerateAI.fulfilled, (state, action) => {
        state.textAI = action.payload;
      })
      .addCase(GenerateAI.rejected, (state) => {
        state.textAI = "";
      });
  },
});

export default GenerateAISlice.reducer;
