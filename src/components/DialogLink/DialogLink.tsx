import { IMessage } from '@/types/message';
import styles from './DialogLink.module.scss';
import { classnames } from '@/utils/classnames';
import { useEffect, useRef } from 'react';
import { User } from '../User/User';
import Link from 'next/link';
import { IDialog } from '@/types/dialog';
import { Paths } from '@/constants/paths';
import { useRouter } from 'next/router';
import { allMessagesAreRead } from '@/firestoreAPI/api';
import { IUser } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { playNotification } from '@/utils/audioPlayer';
const DEFAULT_USER_ICON = '/defaultUser.svg';

interface IDialogLinkProps {
  className?: string;
  dialogId: string;
  unreadMessagesCount: number;
  interlocutorData: IUser;
  isActive?: boolean;
}

export function DialogLink({ className, dialogId, unreadMessagesCount, interlocutorData, isActive }: IDialogLinkProps) {
  const { query } = useRouter();
  const isDialogCurrent = query.dialogId === dialogId;
  const prevUnreadMessagesCount = useRef(unreadMessagesCount);

  useEffect(() => {
    const isAppActive = document.hidden === false;
    if ((!isActive || !isAppActive) && unreadMessagesCount > prevUnreadMessagesCount.current) {
      playNotification();
    }
    prevUnreadMessagesCount.current = unreadMessagesCount;
  }, [unreadMessagesCount]);

  useEffect(() => {
    if (isDialogCurrent && unreadMessagesCount) {
      // allMessagesAreRead(dialogId, userId);
    }
  }, [isDialogCurrent, unreadMessagesCount, dialogId, interlocutorData.id]);

  return (
    <Link className={classnames(styles.link, className, { [styles.active]: isActive })} href={Paths.messenger + '/' + dialogId}>
        <User className={styles.user} userData={interlocutorData} />
        {unreadMessagesCount > 0 && <div className={styles.messagesCount}>{unreadMessagesCount}</div>}
    </Link>
  );
}