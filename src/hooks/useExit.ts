import { clearUserData } from "@/store/userSlice";
import { useAppDispatch } from "./reduxHooks";
import { clearDialogsData } from "@/store/dialogsSlice";
import { authAPI } from "@/firestoreAPI/api";
import { clearMessagesData } from "@/store/messagesSlice";


export function useExit() {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(clearUserData());
    dispatch(clearDialogsData());
    dispatch(clearMessagesData());
    authAPI.logOut();
  };
}