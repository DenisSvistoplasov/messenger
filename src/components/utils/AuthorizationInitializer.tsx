import { auth } from "@/firebase";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setAuthData } from "@/store/authSlice";
import { formatAuthData } from "@/utils/formatAuthData";
import { User } from "firebase/auth";
import { ReactNode, useEffect } from "react";

export function AuthorizationInitializer({ children }: { children: ReactNode; }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authStateChanged = (authState: User | null) => {
      dispatch(setAuthData(formatAuthData(authState)));
    };
    return auth.onAuthStateChanged(authStateChanged);
  }, []);

  return <>{children}</>;
}