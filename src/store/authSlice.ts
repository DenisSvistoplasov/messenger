import { IUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: '',
    userId: '',
    isAuth: false,
    isAuthLoading: true
  },
  reducers: {
    setAuthData(state, action: PayloadAction<{ login: string, userId: string; isAuth:boolean}>) {
      state.isAuth = action.payload.isAuth;
      state.login = action.payload.login;
      state.userId = action.payload.userId;
      state.isAuthLoading = false;
    }
  }
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;