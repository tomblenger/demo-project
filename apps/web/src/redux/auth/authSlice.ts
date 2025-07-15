import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// user type
type IUser = {
  _id: string;
  name: string;
  email: string;
  role?: string | undefined;
  image?: string | undefined;
  phone?: string | undefined;
};
type IAuth = {
  accessToken: string;
  user: IUser;
};

interface AuthState {
  accessToken: string | null;
  user: any | null;
}

// Always start with null state to prevent hydration mismatches
// Auth will be populated by useAuthCheck hook on client side
const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
