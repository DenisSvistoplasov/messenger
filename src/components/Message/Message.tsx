import styles from './Message.module.scss';
import { classnames } from '@/utils/classnames';
import { getElapsedTime } from '@/utils/getElapsedTime';
import { Timestamp } from 'firebase/firestore';
import { Tail } from '../utils/Tail';
import { RefObject, useEffect, useRef } from 'react';
import { IMessage } from '@/types/message';
import { IconCheckmarkSent } from '../utils/icons/IconCheckmarkSent';
import { Loader } from '../utils/Loader/Loader';
import { IconCheckmarkRead } from '../utils/icons/IconCheckmarkRead';

export interface IMessageProps extends IMessage {
  owner?: boolean;
  elementRef?: RefObject<HTMLLIElement>;
  onInSight?: () => void;
  isUnread?: boolean;
}

export function Message({ text, createdAt, owner = false, elementRef, onInSight, isUnread, isNotSent }: IMessageProps) {
  const elapsedTime = getElapsedTime(createdAt);
  const elementRef_ = useRef<HTMLLIElement>(null);


  if (!elementRef) elementRef = elementRef_;

  useEffect(() => {
    if (onInSight && elementRef?.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.disconnect();
            onInSight();
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.4,
      });

      observer.observe(elementRef.current);

      return () => observer.disconnect();
    }
  }, [onInSight, elementRef?.current]);



  return (
    <li
      className={classnames(styles.wrapper, {
        [styles.owner]: owner,
        [styles.isRead]: !isUnread,
        [styles.isSent]: !isNotSent
      })}
      ref={elementRef}>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.metadata}>
        <span className={styles.elapsedTime}>{elapsedTime}</span>
        {owner &&
          <div className={styles.status}>
            {!isUnread ?
              <IconCheckmarkRead className={styles.checkmark_isRead} /> :
              !isNotSent ?
                <IconCheckmarkSent className={styles.checkmark_isSent} /> :
                <Loader className={styles.loader} size={10} dark />}
          </div>}
      </div>
      <Tail className={styles.tail} />
    </li>
  );
}