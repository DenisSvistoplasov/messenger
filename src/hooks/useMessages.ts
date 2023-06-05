import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useEffect } from "react";
import { messageAPI, onMessagesChange } from "@/firestoreAPI/api";
import { useAuth } from "./useAuth";
import { addMessagesData, selectMessages, setMessagesData } from "@/store/messagesSlice";

export function useMessages(dialogId: string) {
  const dispatch = useAppDispatch();
  const { isAuth, userId } = useAuth();

  useEffect(() => {
    const returnedData = onMessagesChange(
      dialogId,
      userId,
      messages => dispatch(setMessagesData({ dialogId, messages })),
      messages => dispatch(addMessagesData({ dialogId, messages }))
    );

    return () => {
      returnedData.messagesPromise?.then(() => {
        returnedData.unsubscribe?.();
      });
    };
  }, [isAuth, dialogId, userId]);

  return useAppSelector(selectMessages(dialogId));
}