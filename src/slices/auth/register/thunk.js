

// action
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRegister } from "../../../helpers/fakebackend_helper";
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange
} from "./reducer";

// initialize relavant method of both Auth
// const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
export const registerUser = (user) => async (dispatch) => {
  // try {
  //   let response;

  //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //     response = fireBaseBackend.registerUser(user.email, user.password);
  //     // yield put(registerUserSuccessful(response));
  //   } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
  //     response = postJwtRegister('/post-jwt-register', user);
  //     // yield put(registerUserSuccessful(response));
  //   } else if (process.env.REACT_APP_API_URL) {
  //     response = postFakeRegister(user);
  //     const data = await response;

  //     if (data.message === "success") {
  //       dispatch(registerUserSuccessful(data));
  //     } else {
  //       dispatch(registerUserFailed(data));
  //     }
  //   }
  // } catch (error) {
  //   dispatch(registerUserFailed(error));
  // }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const registerApi = createAsyncThunk("api/admin//register", async (data) => {
  try {
    var response;
    response = postRegister(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const apiError = () => {
  try {
    const response = apiErrorChange();
    return response;
  } catch (error) {
    return error;
  }
};