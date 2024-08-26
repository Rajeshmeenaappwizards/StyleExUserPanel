import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changeProductStatusData,
  getAllProductsData,
  getOneProductData,
} from "../../helpers/fakebackend_helper";

export const allProductsData = createAsyncThunk(
  "products/getProductsData",
  async (params) => {
    try {
      const response = getAllProductsData(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const oneProductData = createAsyncThunk(
  "products/oneProductData",
  async (params) => {
    try {
      const response = getOneProductData(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const changeProductStatus = createAsyncThunk(
  "products/updateStatus",
  async (data) => {
    try {
      const response = changeProductStatusData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
