import { classnames } from '@/utils/classnames';
import styles from './ErrorMessage.module.scss';

interface IErrorMessageProps {
  className?: string;
  message: string;
  block?: boolean;
}

export function ErrorMessage({ className, message, block = false }: IErrorMessageProps) {

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