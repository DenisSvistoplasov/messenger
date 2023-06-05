import { Sidebar } from '@/components/Sidebar/Sidebar';
import styles from '../../styles/messenger.module.scss';
import { Chat } from '@/components/Chat/Chat';
import { IMessage } from '@/types/message';
import { useEffect, useState } from 'react';
import { createId } from '@/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { Header } from '@/components/Header/Header';
import { auth } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectAuth } from '@/store/authSlice';
import { GetStaticProps } from 'next';
import { InfoMessage } from '@/components/InfoMessage/InfoMessage';


const userId = 'id1';
const dialogId = 'someId';


export default function Messenger() {

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Sidebar className={styles.sidebar} />
        <InfoMessage message='Выберете собеседника, чтобы начать общение' block/>
      </main>
    </div>
  );
}