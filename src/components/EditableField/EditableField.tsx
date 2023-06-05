import { ChangeEventHandler, MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from './EditableField.module.scss';

interface IEditableFieldProps {
  className?: string;
  initialValue?: string;
  valueRef: MutableRefObject<string>;
}

export function EditableField({ className, initialValue = '', valueRef }: IEditableFieldProps) {
  console.log('initialValue: ', initialValue);
  const [isEdited, setIsEdited] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const startEdit = () => setIsEdited(true);
  const onChange: ChangeEventHandler<HTMLInputElement> = e => setValue(e.target.value || ' ');
  const finishEdit = () => setIsEdited(false);

  return (
    <div className={styles.wrapper}>
      {isEdited ?
        <input className={styles.input} onChange={onChange} onBlur={finishEdit} autoFocus value={value} /> :
        <div className={styles.display} onClick={startEdit}>{value}</div>
      }
    </div>
  );
}