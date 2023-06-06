import styles from './Dialogs.module.scss';
import { classnames } from '@/utils/classnames';
import { useAppSelector } from '@/hooks/reduxHooks';
import { DialogLink } from '../DialogLink/DialogLink';
import { useRouter } from 'next/router';
import { selectDialogs } from '@/store/dialogsSlice';
import { MetaConditionalRender } from '../utils/MetaConditionalRender';
import SimpleBar from 'simplebar-react';

interface IDialogsProps {
  className?: string;
}

export function Dialogs({ className }: IDialogsProps) {
  const { query } = useRouter();
  const currentDialogId = query.dialogId;
  const { dialogs, error, isLoading } = useAppSelector(selectDialogs);

  return (
    <div className={classnames(styles.wrapper, className)}>
      <SimpleBar style={{maxHeight:'100%'}}>
        <MetaConditionalRender
          isLoading={isLoading}
          error={error}
          isEmpty={dialogs.length === 0}
          emptyMessage='Нет начатых диалогов'
        >
          <ul className={styles.list}>
            {dialogs.map(dialog => (
              <li key={dialog.dialogId}>
                <DialogLink
                  {...dialog}
                  interlocutorData={dialog.userData}
                  isActive={currentDialogId === dialog.dialogId}
                />
              </li>
            ))}
          </ul>
        </MetaConditionalRender>
      </SimpleBar>
    </div>
  );
}