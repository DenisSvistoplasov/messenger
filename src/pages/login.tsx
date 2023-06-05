import { LoginForm } from '@/components/LoginForm/LoginForm';
import styles from '../styles/login.module.scss';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { authAPI } from '@/firestoreAPI/api';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setAuthData } from '@/store/authSlice';
import { emailToLogin } from '@/utils/login_email';
import Link from 'next/link';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { Paths } from '@/constants/paths';


export default function Login() {
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState('');
  const { push } = useRouter();

  function submit(login: string, password: string) {
    setIsFetching(true);
    setServerError('');
    authAPI.signIn(login, password)
      // .then(() => {
      //   push(Paths.messenger);
      // })
      .catch((error:FirebaseError) => {
        setIsFetching(false);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') setServerError('Неверный логин или пароль');
        else setServerError(error.code);
      });
  }

  return (
    <div className={styles.wrapper}>
      <LoginForm title='Авторизация' onSubmit={submit} className={styles.form} disabled={isFetching} serverError={serverError} />

      <div className={styles.redirect}>
        Ещё нет аккаунта? <Link href={Paths.signUp}>Создать аккаунт</Link>
      </div>
    </div>
  );
}