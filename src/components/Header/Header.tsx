import { auth } from '@/firebase';
import { User } from '../User/User';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectAuth } from '@/store/authSlice';
import { memo, useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { CurrentUser } from '../CurrentUser/CurrentUser';
import { clearUserData } from '@/store/userSlice';
import { useExit } from '@/hooks/useExit';

function Header_() {
  const exit = useExit();
 
  return (
    <header className={styles.header}>
      <CurrentUser />
      <button className={styles.exitBtn} onClick={exit}>Выход</button>
    </header>
  );
}

export const Header = memo(Header_);