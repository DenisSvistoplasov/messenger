import { Header } from '@/components/Header/Header';
import styles from '../styles/settings.module.scss';
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectUser } from "@/store/userSlice";
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { EditableField } from '@/components/EditableField/EditableField';
import { Loader } from '@/components/utils/Loader/Loader';
import { UserSettingsForm } from '@/components/UserSettingsForm/UserSettingsForm';
import { useRouter } from 'next/router';
import { Paths } from '@/constants/paths';



export default function Settings() {
  const { userData, isLoading, error } = useAppSelector(selectUser);
  const { push } = useRouter();
  
  const toMessenger = () => push(Paths.messenger);

  return (
    <div className={styles.wrapper}>
      <Header />
      {
        isLoading ?
          <Loader dark /> :
          <div className={styles.inner}>
            <UserSettingsForm userData={userData} className={styles.form} />
            <button className={styles.back} onClick={toMessenger}>Сообщения</button>
          </div>
      }
    </div >
  );
}

