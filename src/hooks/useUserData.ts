import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { listenUserData, selectUser } from "@/store/userSlice";

export function useUserData() {
  const dispatch = useAppDispatch();
  const { isAuth, userId } = useAuth();

  useEffect(() => {
    if (isAuth && userId) return dispatch(listenUserData(userId));
  }, [isAuth, userId]);

  return useAppSelector(selectUser);
}