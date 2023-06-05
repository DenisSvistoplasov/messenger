import { Sidebar } from '@/components/Sidebar/Sidebar';
import styles from '../../styles/messenger.module.scss';
import { Chat } from '@/components/Chat/Chat';
import { useCallback } from 'react';
import { Header } from '@/components/Header/Header';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectAuth } from '@/store/authSlice';
import { messageAPI } from '@/firestoreAPI/api';
import { selectInterlocutorIdByDialogId } from '@/store/dialogsSlice';
import { IMessage } from '@/types/message';
import { createId } from '@/utils/utils';
import { addMessagesData, markMessageAsRead, markMessageAsSent } from '@/store/messagesSlice';

export default function Messenger() {
  const { isAuth, isAuthLoading, userId } = useAppSelector(selectAuth);
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const dialogId = (query.dialogId || '') as string;
  const interlocutorId = useAppSelector(selectInterlocutorIdByDialogId(dialogId));

  const sendMessage = useCallback((text: string) => {
    const messageId = createId(text);
    const sendingMessagePromise = messageAPI.sendMessage(dialogId, userId, interlocutorId, text, messageId);
    const localMessage: IMessage = {
      createdAt: new Date().toString(),
      dialogId,
      messageId,
      recipientId: interlocutorId,
      senderId: userId,
      text,
      isUnread: true,
      isNotSent: true
    };
    dispatch(addMessagesData({ dialogId, messages: [localMessage] }));
    sendingMessagePromise.then(() => {
      dispatch(markMessageAsSent({ dialogId, messageId }));
      messageAPI.onMessageIsRead(messageId, () => dispatch(markMessageAsRead({ dialogId, messageId })));
    });
    return sendingMessagePromise;
  }, [dialogId, userId, interlocutorId]);

  return (
    <div className={styles.wrapper}>
      {true && // ???
        <>
          <Header />
          <main className={styles.main}>
            <Sidebar className={styles.sidebar} />
            <Chat dialogId={dialogId} sendMessage={sendMessage} userId={userId} />
          </main>
        </>
      }
    </div>
  );
}
