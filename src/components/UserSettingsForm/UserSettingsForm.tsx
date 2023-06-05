import { useAppSelector } from '@/hooks/reduxHooks';
import { selectUser } from '@/store/userSlice';
import { useState, useRef, useEffect, SyntheticEvent, ChangeEventHandler, FormEventHandler } from 'react';
import { EditableField } from '../EditableField/EditableField';
import styles from './UserSettingsForm.module.scss';
import { readImgFile } from '@/utils/readImgFile';
import { IUser } from '@/types/user';
import { classnames } from '@/utils/classnames';
import { userAPI } from '@/firestoreAPI/api';

const DEFAULT_USER_ICON = '/defaultUser.svg';
const PENCIL_ICON = '/pencil.svg';

interface IUserSettingsProps {
  className?: string;
  userData: IUser;
}

export function UserSettingsForm({ className, userData }: IUserSettingsProps) {
  const [userImage, setUserImage] = useState(userData.icon);
  const [userName, setUserName] = useState(userData.displayedName || userData.login);
  const [nameValidationError, setNameValidationError] = useState('');
  const [isFetching, setIsFetching] = useState(false);


  const onImageChange: ChangeEventHandler<HTMLInputElement> = e => {
    const imgFile = e.target.files?.[0];
    if (imgFile) readImgFile(imgFile).then(setUserImage);
  };

  const onNameChange: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value.trim();
    setUserName(value);

    if (value.length < 4) {
      setNameValidationError('Имя должно содержать хотя бы 4 символа');
    }
    else {
      setNameValidationError('');
    }
  };

  const onNameBlur = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.trim();
    if (value.length === 0) {
      setUserName(userData.displayedName || userData.login);
      setNameValidationError('');
    }
  };



  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    if (!nameValidationError) {
      const newData: Partial<IUser> = {};
      if (userData.displayedName != userName) newData.displayedName = userName;
      if (userData.icon != userImage) newData.icon = userImage;
      if (Object.keys(newData).length > 0) {
        setIsFetching(true);
        userAPI.updateUserData(userData.id, newData).then(() => setIsFetching(false));
      }
    }
  };

  return (
    <form className={classnames(styles.form, className)} onSubmit={onSubmit}>
      <div className={styles.iconBlock}>
        <img className={styles.icon} src={userImage || DEFAULT_USER_ICON} alt="user icon" />
        <label className={styles.iconInputLabel}>
          <input className={styles.iconInput} type="file" accept='image/*' capture='user' onChange={onImageChange} disabled={isFetching} />
          <div className={styles.pencilWrapper}>
            <img className={styles.pencilIcon} src={PENCIL_ICON} alt="pencil" />
          </div>
        </label>
      </div>
      <div className={styles.textContent}>
        <div className={styles.login}><span className={styles.loginTitle}>Логин: </span><span className={styles.loginValue}>{userData.login}</span></div>
        <div className={styles.nameBlock}>
          <span className={styles.nameTitle}>Никнейм: </span>
          <input
            className={styles.nameInput}
            type="text"
            value={userName}
            onChange={onNameChange}
            onBlur={onNameBlur}
            disabled={isFetching} />
          {nameValidationError && <span className={styles.validationError}>{nameValidationError}</span>}
        </div>
      </div>
      <button className={styles.saveBtn} disabled={isFetching}>Сохранить</button>
    </form>
  );
}