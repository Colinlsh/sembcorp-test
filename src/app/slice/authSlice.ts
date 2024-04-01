import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  actionCodeSettings,
  auth,
  getFirebaseAuthErrorMessage,
  googleProvider,
} from "../utils/common"; // Adjust the import path
import { FirebaseError } from "firebase/app";
import { UserRegistration } from "../models";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for signing in
export const signInAsync = createAsyncThunk<
  // Return type of the payload creator
  User,
  // First argument to the payload creator
  UserRegistration,
  // Types for ThunkAPI
  {
    rejectValue: string; // Type of the rejection value
  }
>("auth/signInAsync", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    // dispatch(getRainbowHistory());
    return response.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Handle FirebaseError and return a custom error message
      const error_message = getFirebaseAuthErrorMessage(error);
      // dispatch(setModal({ show: true, message: error_message }));
      return rejectWithValue(error_message);
    }
    // For other errors, log and return a generic message
    console.error(error);
    return rejectWithValue("Registration failed. Please try again.");
  }
});

export const signInWithGoogleAsync = createAsyncThunk<
  // Type of the payload returned by the fulfilled action
  User,
  // Arguments for the payload creator (void in this case, as no arguments are needed)
  void,
  // Types for ThunkAPI
  {
    rejectValue: string; // Type of the rejection value
  }
>("auth/signInWithGoogleAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    // dispatch(getRainbowHistory());
    return response.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Handle FirebaseError and return a custom error message
      const error_message = getFirebaseAuthErrorMessage(error);
      // dispatch(setModal({ show: true, message: error_message }));
      return rejectWithValue(error_message);
    }
    // For other errors, log and return a generic message
    console.error(error);
    return rejectWithValue("Registration failed. Please try again.");
  }
});

// Async thunk for user registration
export const registerAsync = createAsyncThunk<
  User, // This should match the expected return type of the payload creator
  UserRegistration, // First argument type for the payload creator
  {
    rejectValue: string; // Type for rejection value
  }
>("auth/registerAsync", async ({ email, password }, { rejectWithValue }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Handle FirebaseError and return a custom error message
      const error_message = getFirebaseAuthErrorMessage(error);
      // dispatch(setModal({ show: true, message: error_message }));
      return rejectWithValue(error_message);
    }
    // For other errors, log and return a generic message
    console.error(error);
    return rejectWithValue("Registration failed. Please try again.");
  }
});

// Async thunk for sending password reset email
export const sendPasswordResetEmailAsync = createAsyncThunk(
  "auth/sendPasswordResetEmailAsync",
  async (email: string, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Handle FirebaseError and return a custom error message
        const error_message = getFirebaseAuthErrorMessage(error);
        // dispatch(setModal({ show: true, message: error_message }));
        return rejectWithValue(error_message);
      }
      // For other errors, log and return a generic message
      console.error(error);
      return rejectWithValue(
        "Failed to send password reset email. Please try again."
      );
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "auth/signOutAsync",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      // dispatch(setClearHistory({}));
      // dispatch(setClearCheckResponse({}));
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Handle FirebaseError specifically
        const error_message = getFirebaseAuthErrorMessage(error); // You can use error.code as well
        console.log(error_message);
        // dispatch(setModal({ show: true, message: error_message }));
      } else {
        return rejectWithValue("Sign out failed. Please try again.");
      }
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
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Handling signInWithGoogleAsync
      .addCase(signInWithGoogleAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogleAsync.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
      })
      .addCase(signInWithGoogleAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(sendPasswordResetEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPasswordResetEmailAsync.fulfilled, (state) => {
        state.loading = false;
        // You might want to update the state to reflect that the email was sent
      })
      .addCase(sendPasswordResetEmailAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(signOutAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
