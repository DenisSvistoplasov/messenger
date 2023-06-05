import { Sidebar } from '@/components/Sidebar/Sidebar';
import styles from '../../styles/messenger.module.scss';
import { Chat } from '@/components/Chat/Chat';
import { IMessage } from '@/types/message';
import { useEffect, useState } from 'react';
// import { onMessagesChange, addMessage } from '@/firestoreAPI/api';
import { createId } from '@/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { Header } from '@/components/Header/Header';
import { auth } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectAuth } from '@/store/authSlice';
import { dialogAPI } from '@/firestoreAPI/api';
import { Paths } from '@/constants/paths';



export default function NewConversation() {
  const { isAuth, isAuthLoading, userId } = useAppSelector(selectAuth);
  const { push, query } = useRouter();
  const interlocutorId = (query.interlocutorId || '') as string;

  function sendMessage(text: string) {
    return dialogAPI.createDialogWithMessage(userId, interlocutorId, text)
      .then(dialogId => push(Paths.messenger + '/' + dialogId));
  }

  return (
    <div className={styles.wrapper}>
      {isAuth && !isAuthLoading && // ???
        <>
          <Header />
          <main className={styles.main}>
            <Sidebar className={styles.sidebar} />
            <Chat sendMessage={sendMessage} userId={userId} />
          </main>
        </>
      }
    </div>
  );
}