import { userAPI } from "@/firestoreAPI/api";
import { IUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";
import { Unsubscribe } from "firebase/firestore";

const initialState = {
  userData: {
    id: '',
    login: '',
    displayedName: '',
    icon: '',
  } as IUser,
  isLoading: true,
  error: '' as string | undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser | undefined>) {
      state.isLoading = false;
      if (action.payload) {
        state.userData = action.payload;
        state.error = '';
      }
      else {
        state.userData = initialState.userData;
        state.error = 'Пользователь не найден';
      }

      state.isLoading = false;
    },
    clearUserData(state) {
      state.error = '';
      state.isLoading = true;
      state.userData = initialState.userData;
    },
  },
});

export default userSlice.reducer;

export const { setUserData, clearUserData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const listenUserData = (id: string): AppThunk<Unsubscribe> => (dispatch) => {
  return userAPI.onUserDataChange(id, userData => {
    dispatch(setUserData(userData));
  });
};