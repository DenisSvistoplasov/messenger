import { IUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  users: [] as IUser[],
  isLoading: true,
  error: '' as string | undefined,
};

const unconnectedUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setUnconnectedUsersData(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
      state.error = '';
      state.isLoading = false;
    }
  },
});

export default unconnectedUsersSlice.reducer;

export const { setUnconnectedUsersData } = unconnectedUsersSlice.actions;

export const selectUnconnectedUsers = (state: RootState) => state.unconnectedUsers;

