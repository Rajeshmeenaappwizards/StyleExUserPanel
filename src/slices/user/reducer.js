import { createSlice } from "@reduxjs/toolkit";
import { allUsersData, changeStatus, oneUserData } from "./thunk";

export const initialState = {
  chngedStatus: {}, 
  allUsers: [],
  oneUser: [],
  error: {},
  keyword: "",
  page: 1,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserKeyword(state, action) {
      state.keyword = action.payload;
    },
    setPageUser(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allUsersData.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
    builder.addCase(allUsersData.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(oneUserData.fulfilled, (state, action) => {
      state.oneUser = action.payload;
    });
    builder.addCase(oneUserData.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(changeStatus.fulfilled, (state, action) => {
      state.chngedStatus = action.payload;
    });
    builder.addCase(changeStatus.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const { setUserKeyword, setPageUser } = UserSlice.actions;

export default UserSlice.reducer;
