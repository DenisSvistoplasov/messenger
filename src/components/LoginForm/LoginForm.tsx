import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import styles from './LoginForm.module.scss';
import { classnames } from '@/utils/classnames';
import { Loader } from '../utils/Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { auth } from '@/firebase';

interface IProps {
  title: string;
  onSubmit: (login: string, password: string) => void;
  className?: string;
  disabled?: boolean;
  serverError?: string;
  disableAutocomplete?: boolean;
}

export function LoginForm({ title, onSubmit, className, disabled, serverError, disableAutocomplete = false }: IProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginValidationError, setLoginValidationError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const isFormInvalid = Boolean(loginValidationError || passwordValidationError);

  function submit(e: FormEvent) {
    e.preventDefault();

    const loginValidationError = validateLogin(login);
    const passwordValidationError = validatePassword(password);

    if (loginValidationError) {
      setLoginValidationError(loginValidationError);
    }
    if (passwordValidationError) {
      setPasswordValidationError(passwordValidationError);
    }
    if (!loginValidationError && !passwordValidationError) onSubmit(login, password);
  }

  function onFocusLogin() {
    setLoginValidationError('');
  }
  function onFocusPassword() {
    setPasswordValidationError('');
  }

  return (
    <form className={classnames(styles.form, className)} onSubmit={submit} autoComplete={disableAutocomplete ? 'none' : 'on'}>
      <h1 className={styles.title}>{title}</h1>

      <label className={styles.label}>
        <span>Логин</span>
        <input className={classnames({ [styles.invalid]: loginValidationError })}
          type="text"
          name='login'
          value={login}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value.trim())}
          onFocus={onFocusLogin}
          autoFocus
          disabled={disabled}
          autoComplete={disableAutocomplete ? 'none' : 'on'}
        />
        <span className={styles.validationError}>{loginValidationError}</span>
      </label>

      <label className={styles.label}>
        <span>Пароль</span>
        <input className={classnames({ [styles.invalid]: passwordValidationError })}
          type="password"
          name='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          onFocus={onFocusPassword}
          disabled={disabled}
          autoComplete={disableAutocomplete ? 'new-password' : 'current-password'}
        />
        <span className={styles.validationError}>{passwordValidationError}</span>
      </label>

      {serverError && <ErrorMessage message={serverError} block />}

      <button className={styles.btn} disabled={disabled || isFormInvalid}>
        {disabled ? <Loader size={20} dark /> : 'OK'}
      </button>
    </form>
  );
}

function validateLogin(value: string) {
  if (value === '') return "Это поле обязательно";
  if (value.length < 4) return "Должно быть не менее 4 символов";
  return '';
}
function validatePassword(value: string) {
  if (value === '') return "Это поле обязательно";
  if (value.length < 6) return "Должно быть не менее 6 символов";
  return '';
}
