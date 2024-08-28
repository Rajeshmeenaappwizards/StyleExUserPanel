import { createSlice } from "@reduxjs/toolkit";
import { allCategories, allProductsData, changeProductStatus, deleteProduct, postProduct } from "./thunk";

const initialState = {
  products: [],
  categories: [],
  product: {},
  postedProduct: {},
  deletedProduct: {},
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
    resetpostedProduct(state, action) {
      state.postedProduct = {};
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

    builder.addCase(changeProductStatus.fulfilled, (state, action) => {
      state.changedProductStatus = action.payload;
    });
    builder.addCase(changeProductStatus.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.postedProduct = action.payload;
    });
    builder.addCase(postProduct.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(allCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(allCategories.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.deletedProduct = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const { setKeyword, setPage, resetProductState, resetpostedProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
