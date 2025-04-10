import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // Store token in Cookies for middleware authentication
      Cookies.set("bookatable-access-token", token, { path: "/" });
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove token from cookie
      Cookies.remove("bookatable-access-token", { path: "/" });
    },
  },
});

// selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
