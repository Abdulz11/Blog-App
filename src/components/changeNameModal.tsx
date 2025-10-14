"use client";
import { changeName } from "@/lib/actions/changeName";
import styles from "./Modal/modal.module.css";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
} from "react";

export default function ChangeNameModal(props: {
  setModal: Dispatch<SetStateAction<boolean>>;
  userEmail?: string;
  username?: string;
  author?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      email: props.userEmail,
      author: `${inputRef?.current?.value}`
        ? `${inputRef?.current?.value}`
        : " ",
    };
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      form.append(key, value as string)
    );
    await changeName(form);
    props.setModal(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <form action={styles.handleConfirm}>
          <div className={styles.modal}>
            <input
              type='text'
              name='author'
              ref={inputRef}
              defaultValue={props.author}
              className={styles.nameInput}
              autoComplete='off'
            />
            <input type='hidden' value={props?.userEmail} name='email' />
            <div className={styles.buttons}>
              <button className={styles.yes} onClick={(e) => handleConfirm(e)}>
                Change
              </button>
              <button
                className={styles.no}
                onClick={(e) => {
                  e.preventDefault();
                  props.setModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
