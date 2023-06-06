import { classnames } from '@/utils/classnames';
import styles from './InfoMessage.module.scss';
import { ReactNode } from 'react';

interface IInfoMessageProps {
  className?: string;
  message: string | ReactNode;
  block?: boolean;
}

export function InfoMessage({ className, message, block = false }: IInfoMessageProps) {

  if (block) {
    return (
      <div className={classnames(styles.block, className)}>
        <span className={styles.span}>{message}</span>
      </div>
    );
  }
  return (
    <span className={classnames(styles.span, className)}>{message}</span>
  );
}