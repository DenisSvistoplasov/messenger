import { IMessage } from "./message";
import { IUser } from "./user";


export interface IDialog {
  dialogId: string;
  userData: IUser;
  unreadMessagesCount: number;
}