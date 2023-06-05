import { IMessage } from '@/types/message';
import styles from './MessagesList.module.scss';
import { IMessageProps, Message } from '../Message/Message';
import { classnames } from '@/utils/classnames';
import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useMessages } from '@/hooks/useMessages';
import { Loader } from '../utils/Loader/Loader';
import { InfoMessage } from '../InfoMessage/InfoMessage';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { MetaConditionalRender } from '../utils/MetaConditionalRender';
import { messageAPI } from '@/firestoreAPI/api';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { markMessageAsRead } from '@/store/messagesSlice';

interface IMessagesListProps {
  userId: string;
  dialogId: string;
  className?: string;
  listRef: RefObject<HTMLUListElement>;
}

export function MessagesList({ userId, dialogId, className, listRef }: IMessagesListProps) {
  const { messages, isLoaded, error } = useMessages(dialogId);
  const lastReadRef = useRef<HTMLLIElement>(null);
  const prevDialogIdRef = useRef('');
  const dispatch = useAppDispatch();
  const isFirstRender = prevDialogIdRef.current !== dialogId;

  let lastReadMessage: IMessage | null = null;

  for (let i = 1; i < messages.length; i++) {
    if (messages[i].recipientId === userId && messages[i].isUnread) {
      lastReadMessage = messages[i - 1];
      break;
    }
  }

  const messageElements: ReactNode[] = [];

  messages.forEach(message => {
    const messageProps: IMessageProps = { ...message, owner: message.senderId === userId };

    if (message === lastReadMessage) {
      messageProps.elementRef = lastReadRef;
    }
    if (message.isUnread && message.recipientId === userId) {
      messageProps.onInSight = () => {
        messageAPI.markMessageAsRead(userId, dialogId, message.messageId, message.text);
        dispatch(markMessageAsRead({ dialogId, messageId: message.messageId }));
      };
      messageProps.isUnread = true;
    }

    messageElements.push(<Message key={message.messageId} {...messageProps} />);
  });

  useEffect(() => {
    if (isFirstRender) {
      if (lastReadMessage) {
        lastReadRef.current?.scrollIntoView({ block: 'end' });
      }
      else {
        listRef.current?.scrollIntoView({ block: 'end' });
      }
    }
    else {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, lastReadMessage, lastReadRef.current, listRef.current]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    prevDialogIdRef.current = dialogId;
  }, [dialogId]);

  return (
    <div className={classnames(styles.wrapper, className)}>
      <MetaConditionalRender
        isLoading={!isLoaded}
        loaderSize={60}
        error={error}
        isEmpty={messages.length === 0}
        emptyMessage='Нет сообщений'
      >
        <SimpleBar style={{ maxHeight: '100%' }}>
          <ul className={styles.list} ref={listRef}>
            {messageElements}
          </ul>
        </SimpleBar>
      </MetaConditionalRender>
    </div>
  );
}