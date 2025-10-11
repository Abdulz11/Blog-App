"use client";
import Image from "next/image";
import styles from "../app/profile/profile.module.css";
import React, { Dispatch, SetStateAction } from "react";

export default function DeleteBtn(props: {
  id: string;
  setIdPost: Dispatch<SetStateAction<string>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const handleDeleteModal = async (e: any) => {
    props.setIdPost(props.id);
    props.setOpenModal(true);
  };
  return (
    <div onClick={handleDeleteModal} className={styles.deletebtn}>
      <div>
        <Image src='/delete.png' alt='delete' fill />
      </div>
    </div>
  );
}
