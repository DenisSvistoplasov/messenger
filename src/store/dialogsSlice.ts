import { IDialog } from "@/types/dialog";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const getDialogs = createAsyncThunk(
  'dialogs/getDialogs',
  async (userId: string) => {

  }
);

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: {
    dialogs: [] as IDialog[],
    isLoading: true,
    error: '',
  },
  reducers: {
    setDialogsData(state, action: PayloadAction<IDialog[]>) {
      state.dialogs = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    clearDialogsData(state) {
      state.dialogs = [];
      state.isLoading = true;
      state.error = '';
    }
  }
});

export default dialogsSlice.reducer;
export const { setDialogsData, clearDialogsData } = dialogsSlice.actions;

export const selectDialogs = (state: RootState) => state.dialogs;
export const selectInterlocutorIdByDialogId = (dialogId: string) => (state: RootState) => state.dialogs.dialogs.find(dialog => dialog.dialogId === dialogId)?.userData.id || '';
