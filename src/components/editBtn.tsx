"use client";
import Image from "next/image";
import styles from "../app/profile/profile.module.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function EditBtn(props: { id: string }) {
  const router = useRouter();
  function handleRedirect(id: string) {
    router.push(`/write?edit=true&id=${id}`);
  }

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation;
          handleRedirect(props.id);
        }}
        className={styles.editbtn}
      >
        <div>
          <Image src='/pen (1).png' alt='delete' fill />
        </div>
      </div>
    </>
  );
}
