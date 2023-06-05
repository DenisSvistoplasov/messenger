import { FieldValue, Timestamp } from "firebase/firestore";
import { IUser } from "./user";
import { IDBMessage } from "./DBTypes";

export interface IMessage {
  messageId: string;
  createdAt: string;
  dialogId: string;
  recipientId: string;
  senderId: string;
  text: string;
  isUnread?: boolean;
  isNotSent?: boolean;
};