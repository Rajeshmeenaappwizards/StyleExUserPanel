import { createSlice } from "@reduxjs/toolkit";
import { registerApi } from "./thunk";

export const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  registerData: {},
  success: false,
  error: false,
};

const registerSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    registerUserSuccessful(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.registrationError = null;
    },
    registerUserFailed(state, action) {
      state.user = null;
      state.loading = false;
      state.registrationError = action.payload;
      state.error = true;
    },
    resetRegisterFlagChange(state) {
      state.success = false;
      state.error = false;
    },
    apiErrorChange(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUserLogout = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerApi.fulfilled, (state, action) => {
      state.registerData = action.payload;
    });
    builder.addCase(registerApi.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} = registerSlice.actions;

export default registerSlice.reducer;
