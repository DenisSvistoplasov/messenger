import { User } from "firebase/auth";
import { emailToLogin } from "./login_email";

export const formatAuthData = (user: User|null) => ({
  userId: user?.uid || '',
  login: emailToLogin(user?.email || ''),
  isAuth: !!user
});