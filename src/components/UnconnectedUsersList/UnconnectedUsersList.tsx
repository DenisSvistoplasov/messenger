import styles from './UnconnectedUsersList.module.scss';
import { classnames } from '@/utils/classnames';
import { User } from '../User/User';
import { useAppSelector } from '@/hooks/reduxHooks';
import Link from 'next/link';
import { selectUnconnectedUsers } from '@/store/unconnectedUsersSlice';
import { Paths } from '@/constants/paths';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { MetaConditionalRender } from '../utils/MetaConditionalRender';

interface IUnconnectedUsersListProps {
  className?: string;
}

export function UnconnectedUsersList({ className }: IUnconnectedUsersListProps) {
  const { error, isLoading, users } = useAppSelector(selectUnconnectedUsers);



  return (
    <div className={classnames(styles.wrapper, className)}>
      <SimpleBar style={{ maxHeight: '100%' }}>
        <MetaConditionalRender
          isLoading={isLoading}
          error={error}
          isEmpty={users.length === 0}
          emptyMessage='Нет других пользователей'
        >
          <ul className={styles.list}>
            {users.map(user => (
              <li key={user.id}>
                <Link href={Paths.newConversation + '/' + user.id} className={styles.link}>
                  <User userData={user} />
                </Link>
              </li>
            ))}
          </ul>
        </MetaConditionalRender>
      </SimpleBar>
    </div>
  );
}