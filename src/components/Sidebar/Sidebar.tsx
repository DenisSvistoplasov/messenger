import styles from './Sidebar.module.scss';
import { classnames } from '@/utils/classnames';
import { memo, useEffect } from 'react';
import { Dialogs } from '../Dialogs/Dialogs';
import { UnconnectedUsersList } from '../UnconnectedUsersList/UnconnectedUsersList';
import { dialogAPI, userAPI } from '@/firestoreAPI/api';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useAuth } from '@/hooks/useAuth';
import { setDialogsData } from '@/store/dialogsSlice';
import { setUnconnectedUsersData } from '@/store/unconnectedUsersSlice';
import { Unsubscribe } from 'firebase/firestore';

interface ISidebarProps {
  className?: string;
}

export function Sidebar_({ className }: ISidebarProps) {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();

  useEffect(() => {
    let unsubscribeUnconnectedUsersChange: Unsubscribe;
    let unsubscribeDialogsChange: Unsubscribe;

    unsubscribeDialogsChange = dialogAPI.onDialogsChange(userId, dialogsData => {
      dispatch(setDialogsData(dialogsData));

      const interlocutorIds = dialogsData.map(dialog => dialog.userData.id);
      unsubscribeUnconnectedUsersChange = userAPI.onUnconnectedUsersChange([...interlocutorIds, userId], users => {
        dispatch(setUnconnectedUsersData(users));
      });
    });

    return () => {
      unsubscribeDialogsChange?.();
      unsubscribeUnconnectedUsersChange?.();
    };
  }, [userId]);

  return (
    <aside className={classnames(styles.wrapper, className)}>
      <Dialogs />
      <UnconnectedUsersList />
    </aside>
  );
}

export const Sidebar = memo(Sidebar_);