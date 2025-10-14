"use client";
import Image from "next/image";
import styles from "../app/profile/profile.module.css";
import { useState } from "react";
import ChangeNameModal from "./changeNameModal";

export default function ChangeName(props: {
  userEmail: string | undefined;
  author: string | undefined;
  username: string | undefined;
}) {
  const [modal, setModal] = useState(false);
  return (
    <div className={styles.changeNameForm}>
      <button className={styles.changeNameBtn} onClick={() => setModal(true)}>
        <Image src='/pen.png' alt='write' fill />
      </button>
      {modal && (
        <ChangeNameModal
          setModal={setModal}
          userEmail={props.userEmail}
          author={props.author}
          username={props.username}
        />
      )}
    </div>
  );
}
