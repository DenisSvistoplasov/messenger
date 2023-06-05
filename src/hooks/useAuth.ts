import { auth } from "@/firebase";
import { useAppSelector } from "./reduxHooks";
import { selectAuth } from "@/store/authSlice";

export function useAuth() {
  return {
    ...useAppSelector(selectAuth),
    logOut: auth.signOut
  };
}