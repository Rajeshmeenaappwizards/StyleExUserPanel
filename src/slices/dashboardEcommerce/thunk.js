import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
 getBookingData,
 getFavoriteData,

} from "../../helpers/fakebackend_helper";

export const getRevenueChartsData = createAsyncThunk("dashboardEcommerce/getRevenueChartsData", async (data) => {
  try {
    var response;
    if (data === "all") {
      response = getAllRevenueDataApi(data);
    }
    if (data === "month") {
      response = getMonthRevenueDataApi(data);
    }
    if (data === "halfyear") {
      response = getHalfYearRevenueDataApi(data);
    }
    if (data === "year") {
      response = getYearRevenueDataApi(data);
    }
    return response;
  } catch (error) {
    return error;
  }
});

export const getBookingApiData = createAsyncThunk("dashboardEcommerce/getBookingApiData", async (data) => {
  try {
    var response;
    response = getBookingData(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const getFavoriteApiData = createAsyncThunk("dashboardEcommerce/getFavoriteApiData", async (data) => {
  try {
    var response;
    response = getFavoriteData(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const getBestSellingProductData = createAsyncThunk("dashboardEcommerce/getBestSellingProductData", async (data) => {
  try {
    var response;
    response = getDashboardProductData(data);
    return response;
  } catch (error) {
    return error;
  }
});
// export const getTopVendorsApiData = createAsyncThunk("dashboardEcommerce/getTopVendorsApiData", async (data) => {
//   try {
//     var response;
//     response = getTopVendorsData(data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// });
// export const getRecentOrderApiData = createAsyncThunk("dashboardEcommerce/getRecentOrderApiData", async (data) => {
//   try {
//     var response;
//     response = getRecentOrderData(data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// });
// export const getTopCategoriesApiData = createAsyncThunk("dashboardEcommerce/getTopCategoriesApiData", async (data) => {
//   try {
//     var response;
//     response = getTopCategories(data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// });
// export const getRevenueChartDashboardData = createAsyncThunk("dashboardEcommerce/getRevenueChartDashboardData", async (data) => {
//   try {
//     var response;
//     response = getRevenueChartDashboardApi(data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// });