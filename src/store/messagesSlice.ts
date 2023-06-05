import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IMessage } from "@/types/message";

interface IInitialState {
  [dialogId: string]: {
    messages: IMessage[];
    isLoaded: boolean;
    error: string;
  };
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {} as IInitialState,
  reducers: {
    setMessagesData(state, action: PayloadAction<{ dialogId: string, messages: IMessage[]; }>) {
      state[action.payload.dialogId] = {
        messages: action.payload.messages,
        error: '',
        isLoaded: true
      };
    },
    addMessagesData(state, action: PayloadAction<{ dialogId: string, messages: IMessage[]; }>) {
      state[action.payload.dialogId].messages.push(...action.payload.messages);
    },
    markMessageAsRead(state, action: PayloadAction<{ dialogId: string, messageId: string; }>) {
      const targetMessage = state[action.payload.dialogId].messages.find(message => message.messageId === action.payload.messageId);
      if (targetMessage?.isUnread) targetMessage.isUnread = false;
    },
    markMessageAsSent(state, action: PayloadAction<{ dialogId: string, messageId: string; }>) {
      const targetMessage = state[action.payload.dialogId].messages.find(message => message.messageId === action.payload.messageId);
      if (targetMessage) targetMessage.isNotSent = false;
    },
    clearMessagesData(state) {
      for (const dialogId in state) {
        delete state[dialogId];
      }
    }
  }
});

export default messagesSlice.reducer;
export const { setMessagesData, addMessagesData, markMessageAsRead, markMessageAsSent, clearMessagesData } = messagesSlice.actions;

export const selectMessages = (dialogId: string) => (state: RootState) => state.messages[dialogId] || { messages: [], error: '', isLoaded: false };
export const selectStoredDialogs = (state: RootState) => Object.keys(state.messages);
