import { createSlice } from "@reduxjs/toolkit";
import { getBookingApiData, getFavoriteApiData } from "./thunk";

export const initialState = {
  getBookingData: [],
  getFavoriteData: [],
  loading: false,
  error: null,
};

const DashboardEcommerceSlice = createSlice({
  name: "DashboardEcommerce",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.getBookingData = action.payload;
      })
      .addCase(getBookingApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFavoriteApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavoriteApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.getFavoriteData = action.payload;
      })
      .addCase(getFavoriteApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetError } = DashboardEcommerceSlice.actions;

export default DashboardEcommerceSlice.reducer;
