import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Login
  userLoginFullField: {},
  userLoginPending: false,

  // Register
  RegisterAccountFullField: {},
  RegisterAccountPending: false,

  // Update user ID
  UpdateUserByIDSFullField: {},
  UpdateUserByIDSPending: false,
  // delete user
  DeleteUserFullField: {},
  DeleteUserPending: false,
};

export const LoginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/login", {
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
export const CreateUser = createAsyncThunk(
  "user/create",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Akun tidak berhasil dibuat");
    }
  }
);

export const DeleteUser = createAsyncThunk(
  "user/delete",
  async (dataid, thunkAPI) => {
    try {
      const response = await fetch(`/api/userId/${dataid}`, {
        method: "DELETE",
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Gagal menghapus user");
    }
  }
);

export const UpdateUserById = createAsyncThunk(
  "user/UpdateById",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`/api/userId/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Gagal mengambil data user");
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Logout: (state) => {
      state.userLoginFullField = {};
    },
    ClearDataRegister: (state) => {
      state.RegisterAccountFullField = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.userLoginFullField = action.payload;
        state.userLoginPending = false;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.userLoginPending = false;
      })
      .addCase(LoginUser.pending, (state) => {
        state.userLoginPending = true;
      });
    builder
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.RegisterAccountFullField = action.payload;
        state.RegisterAccountPending = false;
      })
      .addCase(CreateUser.rejected, (state) => {
        state.RegisterAccountPending = false;
      })
      .addCase(CreateUser.pending, (state) => {
        state.RegisterAccountPending = true;
      });

    builder
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.DeleteUserFullField = action.payload;
        state.DeleteUserPending = false;
      })
      .addCase(DeleteUser.rejected, (state) => {
        state.DeleteUserPending = false;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.DeleteUserPending = true;
      });
    builder
      .addCase(UpdateUserById.fulfilled, (state, action) => {
        state.UpdateUserByIDSFullField = action.payload;
        state.UpdateUserByIDSPending = false;
      })
      .addCase(UpdateUserById.pending, (state) => {
        state.UpdateUserByIDSPending = true;
      })
      .addCase(UpdateUserById.rejected, (state) => {
        state.UpdateUserByIDSPending = false;
      });
  },
});
export const { Logout, ClearDataRegister } = UserSlice.actions;
export default UserSlice.reducer;
