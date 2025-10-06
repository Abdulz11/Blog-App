import Image from "next/image";
import styles from "./commentsCount.module.css";

export default function CommentsCount(props: {
  numberOfComments: number | undefined;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.commentImageContainer}>
          <Image src='/chat.png' alt='chat' fill />
        </div>
        <p>{props.numberOfComments}</p>
      </div>
    </div>
  );
}
