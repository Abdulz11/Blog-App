"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginInModal(props: {
  message: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div className={styles.backdropLogin}>
      <div className={styles.modalContainer}>
        <span
          style={{
            color: "black",
            fontSize: "23px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          className={styles.cancelBtn}
          onClick={() => {
            props.setModal(false);
          }}
        >
          x
        </span>
        <div className={styles.modal}>
          <p className={styles.message}>{props.message}?</p>
          <div className={styles.buttons}>
            <button
              className={styles.login}
              onClick={() => {
                signIn("google", { redirectTo: callbackUrl as string });
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
