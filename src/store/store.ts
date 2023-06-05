import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import dialogsSlice from './dialogsSlice';
import authSlice from './authSlice';
import messagesSlice from './messagesSlice';
import unconnectedUsersSlice from './unconnectedUsersSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    dialogs: dialogsSlice,
    messages: messagesSlice,
    auth: authSlice,
    unconnectedUsers: unconnectedUsersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;