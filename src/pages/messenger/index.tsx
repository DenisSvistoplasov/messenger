import { Sidebar } from '@/components/Sidebar/Sidebar';
import styles from '../../styles/messenger.module.scss';
import { Header } from '@/components/Header/Header';
import { InfoMessage } from '@/components/InfoMessage/InfoMessage';

export default function Messenger() {

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Sidebar className={styles.sidebar} />
        <InfoMessage message={<>Выберете собеседника, чтобы&nbsp;начать&nbsp;общение</>} block/>
      </main>
    </div>
  );
}