import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changeProductStatusData,
  deleteOneProductData,
  getAllCategoriesData,
  getAllProductsData,
  getOneProductsData,
  postProductData,
  updateProductData,
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

export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async (params) => {
    try {
      const response = getOneProductsData(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (data) => {
    try {
      const response = postProductData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    try {
      const response = updateProductData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (data) => {
    try {
      const response = deleteOneProductData(data);
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

export const allCategories = createAsyncThunk(
  "products/categories",
  async (data) => {
    try {
      const response = getAllCategoriesData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
