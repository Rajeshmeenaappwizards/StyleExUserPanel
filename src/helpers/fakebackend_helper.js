import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//Swipe admin

//? LOGIN API
export const postLogin = (data) =>
  api.create(`${url.BASE_URL}/auth/login`, data);

//Users
export const getAllUsersData = (data) =>
  api.get(`${url.BASE_URL}/admin/user`, data);

export const getOneUserData = (ID, data) =>
  api.get(`${url.BASE_URL}/admin/user/${ID}`, data);

export const changeStatusData = (data) =>
  api.put(`${url.BASE_URL}/admin/user/status`, data);

//Products
export const getAllProductsData = (data) =>
  api.get(`${url.BASE_URL}/product`, data);

export const changeProductStatusData = (data) =>
  api.put(`${url.BASE_URL}/admin/product/status`, data);

export const getOneProductData = (ID) =>
  api.get(`${url.BASE_URL}/admin/product/details/${ID}`);

// is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

export const postOtp = (data) =>
  api.create(`${url.BASE_URL}/auth/verify-otp`, data);

export const postRegister = (data) =>
  api.create(`${url.BASE_URL}/api/admin/register`, data);

export const postWelcome = (data) =>
  api.create(`${url.BASE_URL}/api/admin/login/as-user`, data);

//Swipe
export const getBookingData = (data) =>
  api.get(`${url.BASE_URL}/api/user/dashboard/request`, data);
export const getFavoriteData = () =>
  api.get(`${url.BASE_URL}/api/user/dashboard/favoritekey`);
export const getShortSlots = (ID) =>
  api.get(`${url.BASE_URL}/api/booking/available-slots/${ID}/short-term`);
export const getLongSlots = (ID) =>
  api.get(`${url.BASE_URL}/api/booking/available-slots/${ID}/long-term`);
export const booking = (data) =>
  api.create(`${url.BASE_URL}/api/booking/book`, data);
export const shortBooking = (data) =>
  api.create(`${url.BASE_URL}/api/booking/book/short-term`, data);
export const longBooking = (data) =>
  api.create(`${url.BASE_URL}/api/booking/book/long-term`, data);
