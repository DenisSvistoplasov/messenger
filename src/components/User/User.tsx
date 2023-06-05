import { IMessage } from '@/types/message';
import styles from './User.module.scss';
import { classnames } from '@/utils/classnames';
import { useEffect, useRef } from 'react';
import { IUser } from '@/types/user';
const DEFAULT_USER_ICON = '/defaultUser.svg';

interface IUserProps {
  className?: string;
  // login: string;
  // displayedName?: string;
  // icon?: string;
  userData: IUser;
}

export function User({ className, userData:{login, displayedName, icon}}: IUserProps) {

  return (
    <div className={classnames(styles.wrapper, className)} >
      <img src={icon || DEFAULT_USER_ICON} alt="user icon" className={styles.icon} />
      <span className={styles.name}>{displayedName || login}</span>
    </div>
  );
}