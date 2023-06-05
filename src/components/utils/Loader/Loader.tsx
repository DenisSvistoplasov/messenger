import { classnames } from '@/utils/classnames';
import styles from './Loader.module.scss';

export function Loader({ className = '', size = 100, dark = false, center = false }) {
  const classes = classnames(
    styles.loader,
    className,
    {
      [styles.dark]: dark,
      [styles.center]: center
    });
  return <div className={classes} style={{fontSize:size}}></div>;
}