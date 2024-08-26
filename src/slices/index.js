import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import UserSlice from "./user/reducer";
import ProductSlice from "./product/reducer";

// Dashboard Ecommerce   Swipe
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,

  UserSlice: UserSlice,
  ProductSlice:ProductSlice,

  DashboardEcommerce: DashboardEcommerceReducer,
});

export default rootReducer;
