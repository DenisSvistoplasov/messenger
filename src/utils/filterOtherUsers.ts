import { IDialog } from "@/types/dialog";
import { IUser } from "@/types/user";

export function filterOtherUsers(dialogs: IDialog[], userId: string, allUsers: IUser[]) {
  const presentedUserIds = dialogs.map(dialog => dialog.userData.id).concat(userId);
  const otherUsers = allUsers.filter(user => !presentedUserIds.includes(user.id));
  return otherUsers;
}