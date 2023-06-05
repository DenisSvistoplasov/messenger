import { IMessage } from '@/types/message';
import styles from './CurrentUser.module.scss';
import { classnames } from '@/utils/classnames';
import { useEffect, useRef } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { User } from '../User/User';
import { Loader } from '../utils/Loader/Loader';
import Link from 'next/link';
import { Paths } from '@/constants/paths';
const DEFAULT_USER_ICON = '/defaultUser.svg';

interface ICurrentUserProps {
  className?: string;
}

export function CurrentUser({ className }: ICurrentUserProps) {
  const { error, isLoading, userData } = useUserData();

  return (
    <>
      {error ?
        'ERROR: ' + error :
        isLoading ?
          <Loader size={30} /> :
          <Link href={Paths.settings}>
            <User userData={userData} />
          </Link>}
    </>

  );
}