import Image from "next/image";
import styles from "../app/profile/profile.module.css";

export default function ChangeName() {
  return (
    <form className={styles.changeNameForm}>
      <button className={styles.changeNameBtn}>
        <Image src='/pen.png' alt='write' fill />
      </button>
    </form>
  );
}
