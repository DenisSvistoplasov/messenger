import { guestAllowedPaths } from "@/constants/allowedPaths";
import { Paths } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { Loader } from "./Loader/Loader";

export function AccessChecker({ children }: { children: ReactNode; }) {
  const { pathname, push } = useRouter();
  const { isAuth, isAuthLoading } = useAuth();
  const isAllowedPath = guestAllowedPaths.some(path => pathname.startsWith(path));
  
  useEffect(() => {
    if (!isAuthLoading && !isAuth && !isAllowedPath) push(Paths.login);
    if (!isAuthLoading && isAuth && isAllowedPath) push(Paths.messenger);
  }, [isAuth, isAuthLoading, isAllowedPath]);

  if (!isAuthLoading && isAuth && !isAllowedPath) return <>{children}</>;
  if (!isAuthLoading && !isAuth && isAllowedPath) return <>{children}</>;
  return <Loader center dark />;
}