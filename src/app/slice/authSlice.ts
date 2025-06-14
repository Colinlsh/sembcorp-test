import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../models";
// import agent from "../api/agent";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// // Async thunk for signing in
// export const signInAsync = createAsyncThunk<
//   // Return type of the payload creator
//   User,
//   // First argument to the payload creator
//   UserLoginModel,
//   // Types for ThunkAPI
//   {
//     rejectValue: string; // Type of the rejection value
//   }
// >("auth/signInAsync", async (user_login, { rejectWithValue }) => {
//   try {
//     const response = await agent.SmartWater.signin(user_login);
//     // dispatch(getRainbowHistory());

//     if (response === undefined) throw new Error("No response from server");

//     return response;
//   } catch (error) {
//     // For other errors, log and return a generic message
//     console.error(error);
//     return rejectWithValue("Registration failed. Please try again.");
//   }
// });

export const signOutAsync = createAsyncThunk(
  "auth/signOutAsync",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(clearUser());
      // dispatch(clearWiFiConnection());
    } catch (error) {
      return rejectWithValue("Sign out failed. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling signInAsync
      // .addCase(signInAsync.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(signInAsync.fulfilled, (state, action) => {
      //   state.user = action.payload ?? null;
      //   state.isAuthenticated = !!action.payload;
      //   state.isLoading = false;
      // })
      // .addCase(signInAsync.rejected, (state, action) => {
      //   state.error = action.payload as string;
      //   state.isLoading = false;
      // })
      // Handling signInWithGoogleAsync
      .addCase(signOutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(signOutAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
