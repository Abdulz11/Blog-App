"use client";
import styles from "./modal.module.css";
import { Dispatch, SetStateAction } from "react";

export default function ConfirmationModal(props: {
  id: string;
  handleDelete: (id?: string | undefined) => Promise<void>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const handleConfirm = async () => {
    await props.handleDelete(props.id);
    props.setOpenModal(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <p className={styles.message}>Are you sure you want to delete ?</p>
          <div className={styles.buttons}>
            <button className={styles.yes} onClick={handleConfirm}>
              Yes
            </button>
            <button
              className={styles.no}
              onClick={() => props.setOpenModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
