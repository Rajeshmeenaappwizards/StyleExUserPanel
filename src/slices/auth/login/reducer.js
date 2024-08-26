import { createSlice } from "@reduxjs/toolkit";
import { loginApi, otpApi, WelcomeApi } from "./thunk";

export const initialState = {
  user: {},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
  loginData: {},
  welcomeData: {},
  otpData: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    otpSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
    },
    reset_login_flag(state) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    },
    resetLoginData(state) {
      state.loginData = {};
    },
    resetOtpData(state) {
      state.otpData = {};
    },
    resetError(state) {
      state.error = null;
    },
    resetWelcomeApi(state) {
      state.welcomeData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.loginData = action.payload;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(WelcomeApi.fulfilled, (state, action) => {
      state.welcomeData = action.payload;
    });
    builder.addCase(WelcomeApi.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(otpApi.fulfilled, (state, action) => {
      state.otpData = action.payload;
    });
    builder.addCase(otpApi.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {
  apiError,
  loginSuccess,
  otpSuccess,
  logoutUserSuccess,
  resetOtpData,
  reset_login_flag,
  resetLoginData,
  resetWelcomeApi,
  resetError,
} = loginSlice.actions;

export default loginSlice.reducer;
