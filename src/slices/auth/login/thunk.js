//Include Both Helper File with needed methods
import {
  postFakeLogin,
  postJwtLogin,
  postLogin,
  postOtp,
  postSocialLogin,
  postWelcome,
} from "../../../helpers/fakebackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag, resetLoginData } from './reducer';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = (user, history) => async (dispatch) => {
  // try {
  //   let response;
  //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //     let fireBaseBackend = getFirebaseBackend();
  //     response = fireBaseBackend.loginUser(
  //       user.email,
  //       user.password
  //     );
  //   } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
  //     response = postJwtLogin({
  //       email: user.email,
  //       password: user.password
  //     });

  //   } else if (process.env.REACT_APP_DEFAULTAUTH) {
  //     response = postFakeLogin({
  //       email: user.email,
  //       password: user.password,
  //     });
  //   }

  //   var data = await response;

  //   if (data) {
  //     localStorage.setItem("authUser", JSON.stringify(data));
  //     if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
  //       var finallogin = JSON.stringify(data);
  //       finallogin = JSON.parse(finallogin)
  //       data = finallogin.data;
  //       if (finallogin.status === "success") {
  //         dispatch(loginSuccess(data));
  //         history('/dashboard')
  //       } else {
  //         dispatch(apiError(finallogin));
  //       }
  //     } else {
  //       dispatch(loginSuccess(data));
  //       history('/dashboard')
  //     }
  //   }
  // } catch (error) {
  //   dispatch(apiError(error));
  // }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("authUser");
      dispatch(logoutUserSuccess(true));
      dispatch(resetLoginData());

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type, history) => async (dispatch) => {
  // try {
  //   let response;

  //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //     const fireBaseBackend = getFirebaseBackend();
  //     response = fireBaseBackend.socialLoginUser(type);
  //   }
  //   //  else {
  //     //   response = postSocialLogin(data);
  //     // }
      
  //     const socialdata = await response;
  //   if (socialdata) {
  //     localStorage.setItem("authUser", JSON.stringify(response));
  //     dispatch(loginSuccess(response));
  //     history('/dashboard')
  //   }

  // } catch (error) {
  //   dispatch(apiError(error));
  // }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const loginApi = createAsyncThunk("/auth/login", async (data) => {
  try {
    var response;
    response = postLogin(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const otpApi = createAsyncThunk("/auth/verify-otp", async (data) => {
  try {
    var response;
    response = postOtp(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const WelcomeApi = createAsyncThunk("/api/admin/login/as-user", async (data) => {
  try {
    var response;
    response = postWelcome(data);
    return response;
  } catch (error) {
    return error;
  }
});