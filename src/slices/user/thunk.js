import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changeStatusData,
  getAllUsersData,
  getOneUserData,
} from "../../helpers/fakebackend_helper";

export const allUsersData = createAsyncThunk(
  "users/getUsersData",
  async (params) => {
    try {
      const response = getAllUsersData(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const oneUserData = createAsyncThunk(
  "users/getOneUserData",
  async ({ ID, data }) => {
    try {
      const response = getOneUserData( ID, data );
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const changeStatus = createAsyncThunk(
  "users/updateStatus",
  async ( data ) => {
    try {
      const response = changeStatusData( data );
      return response;
    } catch (error) {
      return error;
    }
  }
);
