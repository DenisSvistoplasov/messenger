import { LoginForm } from '@/components/LoginForm/LoginForm';
import styles from '../styles/login.module.scss';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { authAPI } from '@/firestoreAPI/api';
import { emailToLogin } from '@/utils/login_email';
import { setAuthData } from '@/store/authSlice';
import Link from 'next/link';
import { useState } from 'react';
import { error } from 'console';
import { FirebaseError } from 'firebase/app';
import { Paths } from '@/constants/paths';

export default function SignUp() {
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState('');
  const { push } = useRouter();

  function submit(login: string, password: string) {
    setIsFetching(true);
    setServerError('');
    authAPI.signUp(login, password)
      .then(() => {
        // push(Paths.settings);
      })
      .catch((error:FirebaseError) => {
        console.log('error: ', error);
        setIsFetching(false);
        if (error.code === 'auth/email-already-in-use') setServerError('Этот логин уже занят');
        else setServerError(error.code);
      });
  }

  return (
    <div className={styles.wrapper}>
      <LoginForm
        title='Регистрация'
        onSubmit={submit}
        className={styles.form}
        disabled={isFetching}
        serverError={serverError}
        disableAutocomplete
      />

      <div className={styles.redirect}>
        Уже есть аккаунт? <Link href={Paths.login}>Войти</Link>
      </div>
    </div>
  );
}