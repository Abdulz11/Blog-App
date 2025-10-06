import { Dispatch, SetStateAction } from "react";
import styles from "../app/profile/profile.module.css";

export default function ProfileNavigation(props: {
  myPost: boolean | null;
  setMyPost: Dispatch<SetStateAction<boolean | null>>;
}) {
  return (
    <div className={styles.profileNavContainer}>
      <button
        onClick={() => props.setMyPost(true)}
        className={
          props.myPost
            ? `${styles.profileNavBtn} ${styles.selectedButton}`
            : `${styles.profileNavBtn}`
        }
      >
        Your posts
      </button>
      <button
        onClick={() => props.setMyPost(false)}
        className={
          !props.myPost
            ? `${styles.profileNavBtn} ${styles.selectedButton}`
            : `${styles.profileNavBtn}`
        }
      >
        Liked posts
      </button>
    </div>
  );
}
