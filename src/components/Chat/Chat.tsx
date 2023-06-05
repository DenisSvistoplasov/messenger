import { IMessage } from '@/types/message';
import styles from './Chat.module.scss';
import { classnames } from '@/utils/classnames';
import { ReactComponentElement, memo, useEffect, useRef } from 'react';
import { MessagesList } from '../MessagesList/MessagesList';
import { MessageForm } from '../MessageForm/MessageForm';

interface IChatProps {
  dialogId?: string;
  userId: string;
  className?: string;
  sendMessage: (text: string) => Promise<any>;
}

function Chat_({ userId, dialogId, className, sendMessage }: IChatProps) {
  const messagesListRef = useRef<HTMLUListElement>(null);

  function onSubmit(text: string) {
    sendMessage(text).then(() => {
      // console.log('scroll!!!');
      // messagesListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }

  return (
    <div className={classnames(styles.wrapper, className)}>
      <div className={styles.inner}>
        {dialogId ?
          <MessagesList
            dialogId={dialogId}
            userId={userId}
            listRef={messagesListRef}
          /> :
          <div className={styles.mockMessageList}>Отправьте первое сообщение</div>
        }
        <MessageForm className={styles.messageForm} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export const Chat = memo(Chat_);