import { createSlice } from "@reduxjs/toolkit";
import { allProductsData, changeProductStatus, oneProductData } from "./thunk";

const initialState = {
  products: [],
  product: {},
  changedProductStatus: {},
  error: null,
  keyword: "",
  page: 1,
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetProductState(state) {
      state.product = {};
    },
    resetProductsState(state) {
      state.products = [];
    },
    resetErrorState(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allProductsData.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(allProductsData.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(oneProductData.fulfilled, (state, action) => {
      state.product = action.payload;
    });
    builder.addCase(oneProductData.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(changeProductStatus.fulfilled, (state, action) => {
      state.changedProductStatus = action.payload;
    });
    builder.addCase(changeProductStatus.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const { setKeyword, setPage, resetProductState } = ProductSlice.actions;

export default ProductSlice.reducer;
