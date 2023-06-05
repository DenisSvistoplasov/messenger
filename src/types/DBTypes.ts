import { Timestamp } from "firebase/firestore";

export interface IDBDialog{
  dialogId: string;
  lastMessageCreatedAt: Timestamp;
  unreadMessageCounts: {
    [key: string]: number;
  };
  userIds: [string, string];
}

export interface IDBMessage{
  messageId: string;
  createdAt: Timestamp;
  dialogId: string;
  recipientId: string;
  senderId: string;
  text: string;
  isUnread?: boolean;
}

export interface IDBUser{
  id: string;
  login: string;
  displayedName?: string;
  icon?: string;
}