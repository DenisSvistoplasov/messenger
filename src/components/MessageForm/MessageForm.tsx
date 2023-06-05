import SimpleBar from 'simplebar-react';
import { Tail } from '../utils/Tail';
import styles from './MessageForm.module.scss';
import 'simplebar-react/dist/simplebar.min.css';
import { ChangeEvent, FormEvent, KeyboardEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { IconPaperPlane } from '../utils/icons/IconPaperPlane';
import { classnames } from '@/utils/classnames';

const minH = 17;

interface IMessageFormProps {
  className?: string;
  onSubmit: (text: string) => void;
}
export function MessageForm({ className, onSubmit }: IMessageFormProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(adjustTextareaHeight, [text]);

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function onSubmit_(e?: FormEvent) {
    e?.preventDefault();
    if (text) {
      onSubmit(text);
      setText('');
    }
  }

  function adjustTextareaHeight() {
    const textareaEl = textareaRef.current;
    if (textareaEl && textareaEl.scrollHeight >= minH) {
      textareaEl.style.height = 'auto';
      textareaEl.style.height = textareaEl.scrollHeight + 'px';
    }
  }

  function onCtrlEnter(e: KeyboardEvent) {
    if (e.code === 'Enter' && e.ctrlKey) onSubmit_();
  }

  return (
    <form className={classnames(styles.form, className)} onSubmit={onSubmit_}>
      <div className={styles.textareaWrapper}>
        <SimpleBar style={{ maxHeight: 100, width: '100%' }}>
          <textarea
            className={styles.textarea}
            rows={1}
            onChange={onChange}
            onKeyDown={onCtrlEnter}
            value={text}
            autoFocus
            placeholder='Message'
            ref={textareaRef}
          ></textarea>
        </SimpleBar>

        <Tail className={styles.tail} />
        <button className={styles.btn}><IconPaperPlane /></button>
      </div>
    </form>
  );
}


function setCaretPosition(element: HTMLElement, position: number) {
  console.log('setCaretPosition: ');
  const setpos = document.createRange();
  const set = window.getSelection();

  if (!set) return;
  console.log('setCaretPosition: !!!!');

  setpos.setStart(element.childNodes[0], position);

  // Collapse range within its boundary points
  // Returns boolean
  setpos.collapse(true);

  // Remove all ranges set
  set.removeAllRanges();

  // Add range with respect to range object.
  set.addRange(setpos);

  // Set cursor on focus
  element.focus();
}